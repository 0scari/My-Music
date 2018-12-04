'use strict'

const db = require('../persistance/db')

module.exports.store = async song => {
    try {
        await db.songs.upsert(song)
        return db.songs.findOne({order: [['updatedAt', 'DESC']]}) // get the latest updated/created record
    } catch (e) {
        throw e
    }
}

module.exports.allSongsForPlaylist = async id => {
    try {
        const playlist = await db.playlists.findById(id)
        return playlist.getSongs()
    } catch (e) {
        throw e
    }
}

module.exports.allSongsForUser = async id => {
    let songs = []
    const user = await db.users.findById(id)
    const playlists = await user.getPlaylists()
    for (const playlist of playlists) {
        songs = [...songs, await playlist.getSongs()]
    }
    return [].concat(...songs).map(e => e.dataValues)
}
