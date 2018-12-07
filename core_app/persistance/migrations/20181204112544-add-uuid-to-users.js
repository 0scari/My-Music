'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn(
        'Users', // name of Source model
        'uuid', // name of the key we're adding
        {
            type: Sequelize.STRING,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }
    ),

    down: (queryInterface, Sequelize) => queryInterface.removeColumn(
        'Users', // name of Source model
        'uuid' // key we want to remove
    )
}
