var express = require('express')
var app = require('../server')

var models = require('../models')

var router = express.Router()
router.get('/', function(req, res) {
    res.json({message:'The api server is running!'})
})

app.use('/api', router)

module.exports = router
