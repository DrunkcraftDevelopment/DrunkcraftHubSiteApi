(function() {
    "use strict"
    var app = require('../server')
    var models = require('../models')
    var express = require('express')
    var router = express.Router()
    var jwtService = require('../services/jwtService')
    var numberPattern = /^\d+$/
    var bodyParser = require('body-parser')
    var urlencodedParser = bodyParser.urlencoded({ extended: false })

    router.use(function checkPermission(req, res, next) {
        console.log(jwtService.verify(req))
        next()
    })

    router.get('/', function(req, res) {
        models.News.findAll().then(function(news) {
            res.json(news); 
        })
    })

    router.get('/:id?', function(req, res) {
        var id = req.params.id
        if (numberPattern.test(id)) {
            models.News.findById(id).then(function(newsItem) {
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

    router.post('/post', urlencodedParser, function(req, res) {
        var title = req.body.title
        var author = req.body.author
        var bodyText = req.body.bodyText

        var newsObject = { 
            'news_title': title,
            'news_text': bodyText,
            'created_by': author
        }

        models.News.create(newsObject).then(function(news) {
            res.json(news)
        })
    })

    app.use('/news', router)

    module.exports = router
})()
