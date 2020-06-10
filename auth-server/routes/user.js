const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(res.locals.oauth.token.user);
})

module.exports = router
