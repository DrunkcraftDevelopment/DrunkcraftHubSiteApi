(function() {
    "use strict"
    var app = require('../server')
    var jwt = require('jsonwebtoken')

    var SUPER_SECRET = 'superSecret'
    var TOKEN_CONFIG = 'tokenConfig'
    var AUTHORIZATION_HEADER = 'Authorization'

    var jwtService = {}

    jwtService.sign = function(info) {
        return jwt.sign(info, app.get(SUPER_SECRET), app.get(TOKEN_CONFIG))
    }

    jwtService.verify = function (req) {
        var token = req.get(AUTHORIZATION_HEADER)
        if (typeof token !== 'undefined') {
            return jwt.verify(token, app.get(SUPER_SECRET))
        }

        return null
    }

    module.exports = jwtService
})()
