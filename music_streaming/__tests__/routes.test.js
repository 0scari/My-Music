'use strict'

const request = require('supertest')
const server = require('../bin/www')
const status = require('http-status-codes')

jest.mock('../services/song-service')

beforeAll( async() => console.log('Jest starting!'))

// close the server after each test
afterAll(() => {
    server.close()
    console.log('server closed!')
})

describe('POST /music_streaming/song-upload', () => {

    test('check if 202 returned when sending file', async done => {
        await request(server).post('/music-streaming/song-upload')
            .field('title', 'ph')
            .field('artist', 'ph')
            .field('album', 'ph')
            .attach('song', '__tests__/Screen Shot 2017-12-25 at 18.29.47.png')
            .expect(status.ACCEPTED)
        done()
    })

    test('check if 400 returned when artist parameter not present', async done => {
        //expect.assertions(2)
        await request(server).post('/music-streaming/song-upload')
            .field('title', 'ph')
            .field('aaa', 'dfsa')
            .field('album', 'ph')
            .attach('song', '__tests__/Screen Shot 2017-12-25 at 18.29.47.png')
            .expect(status.BAD_REQUEST)
        done()
    })

    // test('check allows response header', async done => {
    //     //expect.assertions(1)
    //     const response = await request(server).get('/items')
    //     expect(response.header['allow']).toBe('GET, POST')
    //     done()
    // })
    //
    // test('get empty list', async done => {
    //     //expect.assertions(3)
    //     const response = await request(server).get('/items')
    //     expect(response.status).toEqual(status.OK)
    //     const data = JSON.parse(response.text)
    //     expect(data.status).toBe('success')
    //     expect(data.message.list.length).toBe(0)
    //     done()
    // })
    //
    // test('check for NOT_FOUND status if database down', async done => {
    //     const response = await request(server).get('/items')
    //         .set('error', 'foo')
    //     expect(response.status).toEqual(status.NOT_FOUND)
    //     const data = JSON.parse(response.text)
    //     expect(data.message).toBe('foo')
    //     done()
    // })
})

describe('GET /music_streaming/:id', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })
    test('check if 200 returned when requesting a stream', async done => {
        const ss = require('../services/song-service')
        const param = 'song1'
        // jest.spyOn(ss, 'openReadStream')
        await request(server).get('/music-streaming/' + param)
            .expect(status.OK)
        expect(ss.openReadStream).toHaveBeenCalledTimes(1)
        // The 2nd argument of the first call to the function was song1
        expect(ss.openReadStream.mock.calls[0][1]).toBe(param)
        done()
    })
})
