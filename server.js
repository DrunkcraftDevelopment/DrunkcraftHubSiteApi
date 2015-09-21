var express = require('express')
var bodyParser = require('body-parser')
var models = require('./models')
var app = module.exports = express()

//has to be after module.exports call and app set
require('./routes')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('models', models)

var port = process.env.PORT || 8085

models.sequelize.sync().then(function () {
    var server = app.listen(port, function() {
        console.log('Server started on port: ' + port)    
    })
})
