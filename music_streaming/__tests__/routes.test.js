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

describe('POST /song-upload', () => {

    test('check if 202 returned when sending file', async done => {
        //expect.assertions(2)
        await request(server).post('/song-upload')
            .attach('song', '__tests__/Screen Shot 2017-12-25 at 18.29.47.png')
            .expect(status.ACCEPTED)
        done()
    })

    // test('check if 400 returned when artist parameter not present', async done => {
    //     //expect.assertions(2)
    //     await request(server).post('/song-upload')
    //         .field('title', 'ph')
    //         .field('aaa', 'dfsa')
    //         .field('album', 'ph')
    //         .attach('song', '__tests__/Screen Shot 2017-12-25 at 18.29.47.png')
    //         .expect(status.BAD_REQUEST)
    //     done()
    // })
})

describe('GET /music_streaming/:id', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })
    test('check if 200 returned when requesting a stream', async done => {
        const ss = require('../services/song-service')
        const param = 'song1'
        await request(server).get('/' + param)
            .expect(status.OK)
        expect(ss.openReadStream).toHaveBeenCalledTimes(1)
        // The 2nd argument of the first call to the function was song1
        expect(ss.openReadStream.mock.calls[0][1]).toBe(param)
        done()
    })
})
