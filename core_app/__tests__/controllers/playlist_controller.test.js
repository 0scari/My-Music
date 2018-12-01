'use strict'

const request = require('supertest')
const server = require('../../bin/www')
const status = require('http-status-codes')

// jest.mock('../services/song-service')

beforeAll( async() => console.log('Jest starting!'))

// close the server after each test
afterAll(() => {
    server.close()
    console.log('server closed!')
})

describe('GET /playlists', () => {
    test('check if endpoint works', async done => {
        await request(server).get('/playlists')
            .expect(status.OK)
        done()
    })
})
