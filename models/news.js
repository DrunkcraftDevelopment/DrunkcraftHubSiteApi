'use strict'
module.exports = function(sequelize, DataTypes) {
  var News = sequelize.define('News', {
    news_title: DataTypes.STRING,
    news_text: DataTypes.STRING,
    news_author: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  })

  return News
}
