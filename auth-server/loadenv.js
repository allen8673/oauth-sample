(function () {
    var dotenv = require('dotenv')
    var dotenvExpand = require('dotenv-expand')
    var myEnv = dotenv.config()
    dotenvExpand(myEnv)
})()
