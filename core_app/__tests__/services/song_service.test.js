'use strict'

jest.mock('../../persistance/db')
const ss = require('../../services/song_service')
const db = require('../../persistance/db')


process.env.MONGO_ADDRESS = 'http://127.0.0.1'

describe('Song Service tests', () => {
    test('test store() method', async done => {
        await ss.store('X')
        expect(db.songs.upsert.mock.calls[0][0]).toBe('X')
        expect(db.songs.findOne).toHaveBeenCalledTimes(1)
        done()
    })

    test('test allSongsForPlaylist() method', async done => {
        await ss.allSongsForPlaylist('X')
        expect(db.playlists.findById.mock.calls[0][0]).toBe('X')
        expect(db.getSongs).toHaveBeenCalledTimes(1)
        done()
    })

    test('test allSongsForUser() method', async done => {
        await ss.allSongsForUser('id')
        done()
    })
})
