(function() {
    var bcrypt = require('bcrypt')
    "use strict"
    module.exports = function(sequelize, DataTypes) {
      var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        created_by: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_by: DataTypes.STRING,
        updated_at: DataTypes.DATE
      }, {
        classMethods: {
          associate: function(models) {
            // associations can be defined here
          }
        },
        instanceMethods: {
            setPassword: function(password, done) {
                return bcrypt.genSalt(15, function(err, salt) {
                    return bcrypt.hash(password, salt, function(err, encrypted) {
                        this.password = encrypted
                        this.salt = salt
                        return done()
                    })
                })
            },
            verifyPassword: function(password, done) {
               return bcrypt.compare(password, this.password, function(err, result) {
                    return done(err, result)
               })
            }
        }
      })

      return User
    }
})()
