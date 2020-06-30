const express = require('express');
const router = express.Router();

router.all('*', (req, res, next)=>{
    console.log('user', req);
    next();
} )

router.get('/', (req, res) => {
    res.send(res.locals.oauth.token.user);
})

module.exports = router
