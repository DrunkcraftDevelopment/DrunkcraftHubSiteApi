(function() {
    "use strict"
    var express = require('express')
    var bodyParser = require('body-parser')
    var jwt = require('jsonwebtoken')
    var models = require('./models')
    var config = require(__dirname + '/../config/config.json')
    var app = module.exports = express()

    //This is required to allow for same origin navigation
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //has to be after module.exports call and app set
    require('./routes/index')
    require('./routes/news')
    require('./routes/user')

    app.set('models', models)

    app.set('superSecret', config.secret)

    var port = process.env.PORT || 8085

    if (config.secret === 'changeMeSecret') {
        console.log('Server stopped. Secret must be changed from the default value in the config.json')
    } else { 
        models.sequelize.sync().then(function () {
            var server = app.listen(port, function() {
                console.log('Server started on port: ' + port)    
            })
        })
    }
})()
