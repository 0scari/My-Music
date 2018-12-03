'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      album: {
        type: Sequelize.STRING
      },
      key: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fileName: {
          type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      playlistId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'Playlists', // name of Target model
              key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Songs')
}
