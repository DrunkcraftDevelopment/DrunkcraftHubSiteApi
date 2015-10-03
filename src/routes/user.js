(function() {
    "use strict"
    var app = require('../server')
    var models = require('../models')
    var express = require('express')
    var router = express.Router()
    var bodyParser = require('body-parser')
    var urlencodedParser = bodyParser.urlencoded({ extended: false })

    router.post('/login', urlencodedParser, function(req, res) {
        //TODO: check if exist
        var username = req.body.username
        var password = req.body.password

        var whereCondition = {
            'where': {
                'username': username,
                'password': password
            }
        }

        models.User.findOne(whereCondition).then(function(user) {
            if (user !== null) {
                console.log('User ' + user.username + ' found!')
            } else {
                console.log('No User found!')
            }
        })
    })

    app.use('/user', router)
    module.exports = router
})()
