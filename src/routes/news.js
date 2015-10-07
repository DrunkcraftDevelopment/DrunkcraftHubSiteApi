(function() {
    "use strict"
    var app = require('../server')
    var models = require('../models')
    var express = require('express')
    var jwt = require('jsonwebtoken')
    var router = express.Router()
    var numberPattern = /^\d+$/
    var bodyParser = require('body-parser')
    var urlencodedParser = bodyParser.urlencoded({ extended: false })

    router.use(function checkPermission(req, res, next) {
        var token = req.get('Authorization')
        console.log(token)
        if (typeof token !== 'undefined') {
            console.log(jwt.verify(token, app.get('superSecret')))
        }
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
            console.log(news)
        })
    })

    app.use('/news', router)

    module.exports = router
})()
