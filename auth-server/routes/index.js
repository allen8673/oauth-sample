const router = require('express').Router();

router.use('/oauth', require('./auth'))

module.exports = router