(function() {
    "use strict"
    var app = require('../server')
    var models = require('../models')
    var express = require('express')
    var router = express.Router()
    var numberPattern = /^\d+$/

    router.get('/', function(req, res) {
        models.News.findAll().then(function(news) {
            res.json(news); 
        })
    })
    router.get('/:id?', function(req, res) {
        var id = req.params.id
        if (numberPattern.test(id)) {
            models.News.findById(req.params.id).then(function(newsItem) {
                res.json(newsItem)
            })
        } else {
            res.json({})
        }
    })
    router.get('/author/:author?', function(req, res) {
        models.News.findAll({ 'where': {'created_by': req.params.author} }).then(function(news) {
            res.json(news)
        })
    })

    app.use('/news', router)

    module.exports = router
})()
