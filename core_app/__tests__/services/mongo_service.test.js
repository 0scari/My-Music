'use strict'

jest.mock('fs')
const fs = require('fs')
const ms = require('../../services/mongo_service')


process.env.MONGO_ADDRESS = 'http://127.0.0.1'

describe('Mongo Service tests', () => {
    test('check if 400 when no album', async done => {
        const param = 'param'
        try {
            ms.store(param, 'abc')
        } catch (e) {
            expect(fs.createReadStream.mock.calls[0][0]).toBe(param)
            done()
        }
    })

})
