(function() {
    "use strict"
    module.exports = function(sequelize, DataTypes) {
      var Role = sequelize.define('Role', {
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_by: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_by: DataTypes.STRING,
        updated_at: DataTypes.DATE
      }, {
        classMethods: {
          associate: function(models) {
            Role.belongsToMany(models.User, {through: 'UserRole'})
          }
        }
      })

      return Role
    }
})()
