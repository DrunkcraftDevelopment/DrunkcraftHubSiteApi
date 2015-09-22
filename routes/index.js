var express = require('express')
var app = require('../server')

var models = require('../models')

var router = express.Router()
router.get('/', function(req, res) {
    res.json({message:'The api server is running!'})
})

app.use('/api', router)

//This is required to allow for same origin navigation
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = router
