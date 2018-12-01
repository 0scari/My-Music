'use strict'

const db = jest.genMockFromModule('../db')

db.playlists = {
    findOne: () => true,
    findById: () => true,
    upsert: (pll) => {
        if (pll.id === 1)
            return true
        else
            throw new Error()
    }
}

module.exports = db
