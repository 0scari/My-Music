'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Playlist', [{
          name: 'Trial Playlist',
      }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Playlist', null, {})
}
