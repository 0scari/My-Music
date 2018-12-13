'use strict'

const request = require('supertest')
const server = require('../../bin/www')
const status = require('http-status-codes')

jest.mock('../../services/user_service')
const us = require('../../services/user_service')

beforeAll( async() => console.log('Jest starting!'))

// close the server after each test
afterAll(() => {
    server.close()
    console.log('server closed!')
})

describe('POST /enter', () => {
    test('302 returned when request is valid', async done => {
        const userData = {
            uuid: '2345867362108488',
            first_name: 'userData.first_name',
            last_name: 'userData.last_name',
            email: 'userData.email'
        }
        await request(server).post('/enter')
            .send(userData)
            .expect(302)

        expect(us.store).toHaveBeenCalledTimes(1)
        us.store = jest.fn() // manual reset
        done()
    })

    test('400 returned when has a parameter missing', async done => {
        const userData = {
            uuid: '2345867362108488',
            first_name: 'userData.first_name',
            // last_name: 'userData.last_name',
            email: 'userData.email'
        }
        await request(server).post('/enter')
            .send(userData)
            .expect(400)

        expect(us.store).toHaveBeenCalledTimes(0)
        done()
    })
})

describe('get /logout', () => {
    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('200 returned when valid request to log out is received', async done => {
        await request(server).get('/logout')
            .set('Cookie', ['uuid=2345867362108488'])
            .expect(status.OK)

        expect(us.getUserByUuid).toHaveBeenCalledTimes(1)
        us.getUserByUuid = jest.fn() // manual rest
        done()
    })

    test('user service is not called when invalid request to log out is received', async done => {
        await request(server).get('/logout')
            // .set('Cookie', ['uuid=2345867362108488'])
            .expect(status.OK)

        expect(us.getUserByUuid).toHaveBeenCalledTimes(0)
        done()
    })
})
