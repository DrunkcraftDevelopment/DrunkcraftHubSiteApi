'use strict'
module.exports = function(sequelize, DataTypes) {
  var News = sequelize.define('News', {
    news_title: DataTypes.STRING,
    news_text: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  })

  return News
}
