'use strict'

const db = jest.genMockFromModule('../db')

db.getSongs = jest.fn()

db.playlists = {
    destroy: (param) => param.where.id === 1,
    findOne: jest.fn(),
    findById: jest.fn(() => ({getSongs: db.getSongs})),
    upsert: (pll) => {
        if (pll.id === 1)
            return true
        else
            throw new Error()
    }
}

db.songs = {
    upsert: jest.fn(),
    findOne: jest.fn()

}

db.users.findById = () => ({getPlaylists: () => []})

module.exports = db
