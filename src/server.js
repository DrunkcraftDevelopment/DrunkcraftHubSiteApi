(function() {
    "use strict"
    var express = require('express')
    var bodyParser = require('body-parser')
    var models = require('./models')
    var app = module.exports = express()

    //This is required to allow for same origin navigation
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    //has to be after module.exports call and app set
    require('./routes/index')
    require('./routes/news')
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.set('models', models)


    var port = process.env.PORT || 8085

    models.sequelize.sync().then(function () {
        var server = app.listen(port, function() {
            console.log('Server started on port: ' + port)    
        })
    })
})()
