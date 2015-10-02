(function() {
    "use strict"
    var app = require('../server')
    var models = require('../models')
    var express = require('express')
    var router = express.Router()

    router.get('/login', function(req, res) {
        models.User.findAll().then(function(news) {
            res.json(news); 
        })
    })

    app.use('/user', router)
    module.exports = router
})()
