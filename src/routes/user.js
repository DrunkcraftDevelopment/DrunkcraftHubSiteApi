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
            
            var tokenOptions = {
                'expiresIn': 60,
                'algorithm': 'HS256'
            }

            models.User.findOne(whereCondition).then(function(user) {
                if (user !== null) {
                    var token = jwt.sign(user.getRoles(), app.get('superSecret'), tokenOptions)
                    res.json(token)
                } else {
                    res.json({'error': 'Invalid Login'})
                }
            })

        } catch(e) {
            res.json({})
        }
    })

    router.post('/adjustRoles', urlencodedParser, function(req, res) {
        try {
            var roleIds = req.body.roleIds
            var userId = req.body.userId

            models.Role.findAll({'where': { 'id': rolesIds}}).then(function(roles) {
               models.User.findOne({'where': {'id': userId}}).then(function(user) {
                    user.setRoles(roles)
                    res.json(user.getRoles())
               })
            })
        } catch (e) {
            res.json({'error': e})
        }
    })

    app.use('/user', router)
    module.exports = router
})()
