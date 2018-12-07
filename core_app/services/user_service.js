'use strict'

const db = require('../persistance/db')

module.exports.getUserByUuid = async uuid => db.users.findOne({where: {uuid: uuid}})

module.exports.store = async(user) => {
    try {
        if (!db.users.findOne({where: {uuid: user.uuid}}))
            db.users.create(user)
    } catch (e) {
        throw e
    }
}
