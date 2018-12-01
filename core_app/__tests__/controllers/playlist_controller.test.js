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

describe('GET /playlist:id', () => {
    test('check if view returned if id given', async done => {
        await request(server).get('/playlist/1')
            .expect(status.OK)
        done()
    })
    test('check if 400 if id invalid', async done => {
        await request(server).get('/playlist/safd')
            .expect(status.BAD_REQUEST)
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

describe('PUT /playlist/:id', () => {
    test('check if 202 when everything supplied', async done => {
        await request(server).put('/playlist/1')
            .field('name', 'cool playlist')
            .attach('file', '__tests__/Screen Shot 2017-12-25 at 18.29.47.png')
            .expect(status.ACCEPTED)
        done()
    })
    test('check if 400 when nothing supplied', async done => {
        await request(server).put('/playlist/1')
            .field('name', '')
            .expect(status.BAD_REQUEST)
        done()
    })
    test('check if 500 returned when service throws', async done => {
        await request(server).put('/playlist/1')
            .field('name', 'throw')
            .attach('file', '__tests__/Screen Shot 2017-12-25 at 18.29.47.png')
            .expect(status.INTERNAL_SERVER_ERROR)
        done()
    })
})
