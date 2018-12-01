'use strict'

jest.mock('../../persistance/db')

const db = require('../../persistance/db')
const ps = require('../../services/playlist_service')

describe('Playlist service test suit', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('check if playlistService store executes till end', async done => {
        jest.spyOn(db.playlists, 'findOne')
        jest.spyOn(db.playlists, 'upsert')

        try {
            await ps.store(1, 2 ,3)
        } catch (e) {}
        expect(db.playlists.findOne).toHaveBeenCalledTimes(1)
        expect(db.playlists.upsert).toHaveBeenCalledTimes(1)

        expect(db.playlists.upsert.mock.calls[0][0].id).toBe(1)
        expect(db.playlists.upsert.mock.calls[0][0].name).toBe(2)
        expect(db.playlists.upsert.mock.calls[0][0].imageData).toBe(3)

        done()
    })

    test('check if throws when told to, lol', async done => {
        jest.spyOn(db.playlists, 'findOne').mockImplementation(() => true)
        try {
            await ps.store(2, 2 ,3)
        } catch (e) {
            done()
        }
    })

})
