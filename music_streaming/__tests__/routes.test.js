'use strict'

const request = require('supertest')
const server = require('../bin/www')
const status = require('http-status-codes')

const songServide = require('../services/song-service')

jest.mock('../services/song-service')

beforeAll( async() => console.log('Jest starting!'))

// close the server after each test
afterAll(() => {
    server.close()
    console.log('server closed!')
})

describe('POST /music_streaming/song-upload', () => {

    test('check if 202 returned when sending file', async done => {
        //expect.assertions(2)
        await request(server).post('/music_streaming/song-upload')
            .field('title', 'ph')
            .field('artist', 'ph')
            .field('album', 'ph')
            .attach('song', '/Users/oskarspozdnakovs/pozdnako-y3/Screen Shot 2017-12-25 at 18.29.47.png')
            .expect(status.ACCEPTED)
        done()
    })

    test('check if 400 returned when artist parameter not present', async done => {
        //expect.assertions(2)
        await request(server).post('/music_streaming/song-upload')
            .field('title', 'ph')
            .field('aaa', 'dfsa')
            .field('album', 'ph')
            .attach('song', '/Users/oskarspozdnakovs/pozdnako-y3/Screen Shot 2017-12-25 at 18.29.47.png')
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
