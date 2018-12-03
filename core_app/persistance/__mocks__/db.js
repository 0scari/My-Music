'use strict'

const db = jest.genMockFromModule('../db')

db.playlists = {
    destroy: (param) => param.where.id === 1,
    findOne: () => true,
    findById: () => true,
    upsert: (pll) => {
        if (pll.id === 1)
            return true
        else
            throw new Error()
    }
}

db.users.findById = () => ({getPlaylists: () => true})

module.exports = db
