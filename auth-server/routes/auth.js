const path = require('path');
const express = require('express');
const oauthServer = require('../oauth/server.js')
const router = express.Router();
const DebugControl = require('../utilities/debug.js')
var model = require('../models');

router.all('*', (req, res, next)=>{
    console.log('oauth', req);
    next();
} )

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
});

router.post('/authorize',
    (req, res, next) => {
        DebugControl.log.flow('Initial User Authentication')
        const { username, password } = req.body;

        model.user.findOne({
            where: {
                username,
                password
            }
        }).then(user => {
            if (user) {
                req.body.user = user;
                return next();
            }

            const params = [ // Send params back down
                'client_id',
                'redirect_uri',
                'response_type',
                'grant_type',
                'state',
            ]
                .map(a => `${a}=${req.body[a]}`)
                .join('&')
            return res.redirect(`/oauth?${params}`)
        }).catch(function (err) {
            console.log("getClient - Err: ", err)
        });
    },
    (req, res, next) => {
        DebugControl.log.flow('Authorization')
        return next();
    },
    oauthServer.authorize({
        authenticateHandler: {
            handle: req => {
                DebugControl.log.functionName('Authenticate Handler')
                DebugControl.log.parameters(Object.keys(req.body).map(k => ({ name: k, value: req.body[k] })))
                return req.body.user
            }
        }
    }))

router.post('/token',
    (req, res, next) => {
        DebugControl.log.flow('Token')
        next()
    },
    oauthServer.token({
        requireClientAuthentication: { // whether client needs to provide client_secret
            // 'authorization_code': false,
        },
    }))  // Sends back token


module.exports = router