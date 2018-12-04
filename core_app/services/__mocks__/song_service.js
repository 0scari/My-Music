'use strict'

const ss = jest.genMockFromModule('../song_service')

ss.store = jest.fn(s => {
    if (s.title === 'throw')
        throw 'X'
    return true
})

ss.allSongsForUser = jest.fn()

module.exports = ss
