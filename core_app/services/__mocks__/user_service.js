'use strict'

const us = jest.genMockFromModule('../user_service')

us.store = jest.fn()

us.getUserByUuid = jest.fn(() => ({get: () => true}))

module.exports = us
