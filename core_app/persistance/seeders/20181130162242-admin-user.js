'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
          firstName: 'Admin',
          lastName: 'Admin',
          email: 'demo@demo.com',
          createdAt: '2018-11-30 22:12:38',
          updatedAt: '2018-11-30 22:12:38'

  }], {}),

  down: (queryInterface, Sequelize) =>
      queryInterface.bulkDelete('Users', null, {})
}
