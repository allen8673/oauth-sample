const express = require('express');
const router = express.Router();

router.all('*', (req, res, next)=>{
    console.log('token', req);
    next();
} )

router.get('/validate', (req, res) => {
    res.status(200).send(true);
})

module.exports = router
