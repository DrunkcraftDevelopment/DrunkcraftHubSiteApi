(function() {
    "use strict"
    var app = require('../server')
    var models = require('../models')
    var express = require('express')
    var router = express.Router()
    var bodyParser = require('body-parser')
    var jwt = require('jsonwebtoken')
    var urlencodedParser = bodyParser.urlencoded({ extended: false })

    router.post('/login', urlencodedParser, function(req, res) {
        try {
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
                    var token = jwt.sign(user, app.get('superSecret'))
                    res.json(token)
                } else {
                    res.json({'error': 'Invalid Login'})
                }
            })

        } catch(e) {
            res.json({})
        }
    })

    app.use('/user', router)
    module.exports = router
})()
