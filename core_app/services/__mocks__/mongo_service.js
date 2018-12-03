'use strict'

const ms = jest.genMockFromModule('../mongo_service')

ms.store = jest.fn()

module.exports = ms
