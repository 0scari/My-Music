'use strict'

jest.mock('../../persistance/db')
const us = require('../../services/user_service')
const db = require('../../persistance/db')

describe('User Service test', () => {
    test('getUserByUuid executes correctly', async done => {
        us.getUserByUuid('123')
        expect(db.users.findOne).toHaveBeenCalledTimes(1)
        expect(db.users.findOne).toHaveBeenCalledWith({where: {uuid: '123'}})
        done()
    })

    test('store executes correctly', async done => {
        const userData = {
            uuid: '2345867362108488',
            first_name: 'userData.first_name',
            last_name: 'userData.last_name',
            email: 'userData.email'
        }
        db.users.findOne = jest.fn()
        us.store(userData)

        expect(db.users.findOne).toHaveBeenCalledTimes(1)
        expect(db.users.findOne).toHaveBeenCalledWith({where: {uuid: '2345867362108488'}})

        expect(db.users.create).toHaveBeenCalledTimes(1)
        expect(db.users.create).toHaveBeenCalledWith(userData)

        done()
    })
})
