(function() {
    'use strict';
    module.exports = {
      up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('User', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          username: {
            allowNull: false,
            type: Sequelize.STRING
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING
          },
          lastLogin: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          },
          createdBy: {
            allowNull: false,
            type: Sequelize.STRING
          },
          updatedBy: {
            type: Sequelize.STRING
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          }
        })
      },
      down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('User');
      }
    }
})()
