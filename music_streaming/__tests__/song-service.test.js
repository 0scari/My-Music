'use strict'

/* eslint-disable indent */

// jest.mock('gridfs-stream')
jest.mock('fs')
const songService = require('../services/song-service')
const fs = require('fs')


describe('SongService test suit', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('check if storeFile() calls streamToMongo()', async done => {
        jest.spyOn(songService, 'streamToMongo').mockImplementation(controls => controls.resolve())
        try {
            await songService.storeFile('x', 'y')
        } catch (e) {
        }
        expect(songService.streamToMongo).toHaveBeenCalledTimes(1)
        done()
    })

    test('check if streamToMongo() calls fs.unlink', async done => {
        const mockedStream = require('stream').Writable()
        songService.streamToMongo({
            reject: (err) => {},
            resolve: () => {}},
            mockedStream)
        mockedStream.end(() => {
            expect(fs.unlink).toHaveBeenCalledTimes(1)
            done()
        })
    })
})
