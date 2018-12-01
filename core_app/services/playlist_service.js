'use strict'
const db = require('../persistance/db')

module.exports.store = async (playlistId, name, imgData) => {
    const playlist = {}
    if (playlistId) playlist.id = playlistId
    if (name) playlist.name = name
    if (imgData) playlist.imageData = imgData
    try {
        await db.playlists.upsert(playlist)
        return await db.playlists.findOne({order: [['updatedAt', 'DESC']]}) // get the latest updated/created record
    } catch (e) {
        throw e
    }
}

module.exports.find = async id => await db.playlists.findById(id)
