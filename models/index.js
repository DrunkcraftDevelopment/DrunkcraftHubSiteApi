var config = require('config')
var dbConfig = config.get('dev.dbConfig')
    
var Sequelize = require('sequelize')
var sequelize = new Sequelize
    (
        dbConfig.database,
        dbConfig.user,
        dbConfig.password
    )

var models = [
    'news'
]

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model)
})

module.exports.sequelize = sequelize
/*var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 100,
    host: '192.168.0.88',
    user: 'drunkcraftApi',
    password: 'drunkcraftApi',
    database: 'devDrunkApi'
})

pool.getConnection(function(err, connection) {
    connection.query('select * from news', function(err, rows) {
        if (err) {
            throw err
        } else {
            console.log(rows)
        }
    })

    connection.release()
})*/
