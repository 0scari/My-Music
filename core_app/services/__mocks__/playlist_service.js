'use strict'

const ps = jest.genMockFromModule('../playlist_service')
ps.store = async(playlistId, name, imgData) => {
    if (name === 'throw')
        throw new Error()
    else
    return {get: (id) => id}
}

ps.find = id => {
    if (id === '1')
        return {dataValues: {imageData: 1}}
    else
        return false
}
module.exports = ps
