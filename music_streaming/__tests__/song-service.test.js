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
        mockedStream.end(() => { // end streaming to trigger finish event
            expect(fs.unlink).toHaveBeenCalledTimes(1)
            done()
        })
    })

    test('check if .openReadStream() gets to streaming finidh', async done => {
        const mockedStream = require('stream').Writable()
        try {
            const promise = songService.openReadStream(mockedStream, "")
            mockedStream.end(async() => { // end streaming to trigger finish event
                await promise
                done()
            })
        } catch (e) {
            throw new Error('Streaming failed:\n > ' + e)
        }
    })
})
