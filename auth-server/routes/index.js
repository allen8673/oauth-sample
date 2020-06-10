const router = require('express').Router();
const oauthServer = require('../oauth/server.js')


router.use('/oauth', require('./auth'))
router.use('/me', oauthServer.authenticate(), require('./user'))

module.exports = router