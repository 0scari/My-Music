'use strict'

const Sequelize = require('sequelize')
const sequelize = new Sequelize('database_development', 'root', 'passw', {
    host: 'sqlDB',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
})

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

db.users = require('./models/user')(sequelize, Sequelize)
db.playlists = require('./models/playlist')(sequelize, Sequelize)

db.users.hasMany(db.playlists)
db.playlists.belongsTo(db.users)

module.exports = db;
