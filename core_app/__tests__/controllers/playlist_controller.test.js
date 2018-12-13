'use strict'

const request = require('supertest')
const server = require('../../bin/www')
const status = require('http-status-codes')

jest.mock('../../services/playlist_service')
jest.mock('../../services/song_service')
jest.mock('../../services/user_service')

beforeAll( async() => console.log('Jest starting!'))

// close the server after each test
afterAll(() => {
    server.close()
    console.log('server closed!')
})

describe('GET /playlists', () => {
    test('test if returns 200 when requested', async done => {
        await request(server).get('/playlists')
            .set('Cookie', ['uuid=2345867362108488']).expect(status.OK)
        done()
    })
})

describe('GET /playlist:id', () => {
    test('check if view returned if id given', async done => {
        await request(server).get('/playlist/1')
            .set('Cookie', ['uuid=2345867362108488']).expect(status.OK)
        done()
    })
    test('check if 400 if id invalid', async done => {
        await request(server).get('/playlist/safd')
            .set('Cookie', ['uuid=2345867362108488']).expect(status.BAD_REQUEST)
        done()
    })
})

describe('POST /playlist', () => {
    test('check if 201 returned when request is OK', async done => {
        const resp = await request(server).post('/playlist')
            .send({name: 'playlist1'})
            .set('Cookie', ['uuid=2345867362108488']).expect(status.CREATED)
        expect(resp.body.id).toBe('id')
        done()
    })

    test('check if 400 when no name', async done => {
        await request(server).post('/playlist')
            .set('Cookie', ['uuid=2345867362108488']).expect(status.BAD_REQUEST)
        done()
    })

    test('check if 500 returned when service throws', async done => {
        await request(server).post('/playlist')
            .send({name: 'throw'})
            .set('Cookie', ['uuid=2345867362108488']).expect(status.INTERNAL_SERVER_ERROR)
        done()
    })
})

describe('PUT /playlist/:id', () => {
    test('check if 202 when everything supplied', async done => {
        await request(server).put('/playlist/1')
            .field('name', 'cool playlist')
            .attach('file', '__tests__/Screen Shot 2017-12-25 at 18.29.47.png')
            .set('Cookie', ['uuid=2345867362108488']).expect(status.ACCEPTED)
        done()
    })
    test('check if 400 when nothing supplied', async done => {
        await request(server).put('/playlist/1')
            .field('name', '')
            .set('Cookie', ['uuid=2345867362108488']).expect(status.BAD_REQUEST)
        done()
    })
    test('check if 500 returned when service throws', async done => {
        await request(server).put('/playlist/1')
            .field('name', 'throw')
            .attach('file', '__tests__/Screen Shot 2017-12-25 at 18.29.47.png')
            .set('Cookie', ['uuid=2345867362108488']).expect(status.INTERNAL_SERVER_ERROR)
        done()
    })
})

describe('DELETE /playlist/:id', () => {
    test('check if 200 when id input valid', async done => {
        await request(server).delete('/playlist/1')
            .set('Cookie', ['uuid=2345867362108488']).expect(status.OK)
        done()
    })
    test('check if 200 when id input valid', async done => {
        await request(server).delete('/playlist/aas')
            .set('Cookie', ['uuid=2345867362108488']).expect(status.NOT_FOUND)
        done()
    })
})
