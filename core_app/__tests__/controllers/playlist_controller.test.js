'use strict'

const request = require('supertest')
const server = require('../../bin/www')
const status = require('http-status-codes')

jest.mock('../../services/playlist_service')

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
describe('POST /playlist', () => {
    test('check if 201 returned when request is OK', async done => {
        const resp = await request(server).post('/playlist')
            .send({name: 'playlist1'})
            .expect(status.CREATED)
        expect(resp.body.id).toBe('id')
        done()
    })

    test('check if 400 when no name', async done => {
        await request(server).post('/playlist')
            .expect(status.BAD_REQUEST)
        done()
    })

    test('check if 500 returned when service throws', async done => {
        await request(server).post('/playlist')
            .send({name: 'throw'})
            .expect(status.INTERNAL_SERVER_ERROR)
        done()
    })
})
