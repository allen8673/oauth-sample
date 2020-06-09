const express = require('express');
const app = express();
const path = require('path');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const DebugControl = require('./utilities/debug.js')
var port = process.env.PORT || '3000';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "text/plain" }));
app.use(bodyParser.json());
// SETUP DEBUG CTRL
app.use(DebugControl.log.request())

app.use(express.static(path.join(__dirname, 'client/build')))

app.use(require('./routes'))

app.use('/', (req,res) => res.redirect('/oauth'))
// app.use(cookieParser())

module.exports = app;
