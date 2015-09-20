var mysql = require('mysql')

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
})
