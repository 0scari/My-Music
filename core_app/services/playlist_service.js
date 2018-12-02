'use strict'

const db = require('../persistance/db')

module.exports.store = async(playlist) => {
    try {
        await db.playlists.upsert(playlist)
        return db.playlists.findOne({order: [['updatedAt', 'DESC']]}) // get the latest updated/created record
    } catch (e) {
        throw e
    }
}

module.exports.find = async id => db.playlists.findById(id)

module.exports.getAllUserPlaylists = async(userId) => {
    const user = await db.users.findById(userId)
    return user.getPlaylists()
}

