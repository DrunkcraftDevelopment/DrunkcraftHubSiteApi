(function() {
    "use strict"
    var app = require('../server')
    var models = require('../models')
    var jwtService = require('../services/jwtService')
    var express = require('express')
    var router = express.Router()
    var bodyParser = require('body-parser')
    var urlencodedParser = bodyParser.urlencoded({ extended: false })

    function getRoleNameArray(roles) {
       var roleNames = []
       if (typeof roles !== 'undefined') {
           roles.forEach(function(roleItem) {
                if(typeof roleItem !== 'undefined') {
                    roleNames.push(roleItem.role)
                }
           })
       }
       return roleNames
    }


    router.post('/login', urlencodedParser, function(req, res) {
        try {
            var username = req.body.username
            var password = req.body.password

            var userWhereCondition = {
                'where': {
                    'username': username,
                    'password': password
                }
            }
            
            models.User.findOne(userWhereCondition).then(function(user) {
                if (user !== null) {
                    user.getRoles().then(function(roles) {
                        res.json(jwtService.sign(getRoleNameArray(roles)))
                    })
                } else {
                    res.json({'error': 'Invalid Login'})
                }
            })

        } catch(e) {
            console.log(e)
            res.json({'error': e})
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
