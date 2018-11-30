'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('User', [{
          firstName: 'John',
          lastName: 'Doe',
          email: 'demo@demo.com',
      }], {}),

  down: (queryInterface, Sequelize) =>
      queryInterface.bulkDelete('User', null, {})
}
