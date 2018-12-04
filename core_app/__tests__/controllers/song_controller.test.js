'use strict'

const request = require('supertest')
const server = require('../../bin/www')
const status = require('http-status-codes')
const sha256 = require('sha256')

jest.mock('../../services/song_service')
const ss = require('../../services/song_service')
jest.mock('../../services/mongo_service')
const ms = require('../../services/mongo_service')

beforeAll( async() => console.log('Jest starting!'))

// close the server after each test
afterAll(() => {
    server.close()
    console.log('server closed!')
})

describe('POST /song', () => {
    const fileName = 'Screen Shot 2017-12-25 at 18.29.47.png'
    const song = {
        title: 'a',
        artist: 'b',
        album: 'c',
        playlistId: 3
    }
    test('check if 201 returned when request is OK', async done => {
        await request(server).post('/song')
            .field('title', song.title)
            .field('artist', song.artist)
            .field('album', song.album)
            .field('playlistId', song.playlistId)
            .attach('song', '__tests__/' + fileName)
            .expect(status.CREATED)
        expect(ss.store).toHaveBeenCalledTimes(1)
        expect(ms.store).toHaveBeenCalledTimes(1)

        expect(ss.store.mock.calls[0][0].title).toBe(song.title)
        expect(ss.store.mock.calls[0][0].artist).toBe(song.artist)
        expect(ss.store.mock.calls[0][0].album).toBe(song.album)
        expect(ss.store.mock.calls[0][0].fileName).toBe(sha256(fileName))
        expect(ss.store.mock.calls[0][0].playlistId).toBe(song.playlistId)

        expect(ms.store.mock.calls[0][1]).toBe(sha256(fileName))

        done()
    })

    test('check if 400 when no album', async done => {
        await request(server).post('/song')
            .field('title', 'song.title')
            .field('artist', 'song.artist')
            .field('playlistId', 3)
            .attach('song', '__tests__/' + fileName)
            .expect(status.BAD_REQUEST)
        done()
    })

    test('check if 400 when playlistId has wrong format', async done => {
        await request(server).post('/song')
            .field('title', 'song.title')
            .field('artist', 'song.artist')
            .field('album', 'song.artist')
            .field('playlistId', 'song.playlistId')
            .attach('song', '__tests__/' + fileName)
            .expect(status.BAD_REQUEST)
        done()
    })

    test('check if 500 returned when service throws', async done => {
        await request(server).post('/song')
            .field('title', 'throw')
            .field('artist', song.artist)
            .field('album', song.album)
            .field('playlistId', song.playlistId)
            .attach('song', '__tests__/' + fileName)
            .expect(status.INTERNAL_SERVER_ERROR)
        done()
    })
})

describe('GET /songs', () => {
    test('check if 200 endpoint is served', async done => {
        await request(server).get('/songs')
            .expect(status.OK)
        expect(ss.allSongsForUser).toHaveBeenCalled()
        done()
    })
})
