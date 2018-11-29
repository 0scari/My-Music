'use strict'

/* eslint-disable indent */

const mp3Service = require('../services/mp3-service')

describe('add', () => {

    //beforeEach( () => mp3Service.add('bread', 1))
    // afterEach( () => mp3Service.clear())

    test('check if mp3 service ', done => {
        expect.assertions(2)
        mp3Service.add('bread', 1)
        const items = mp3Service.getAll()
        expect(items.length).toBe(1)
        expect(items[0].qty).toBe(1)
        done()
    })



})

