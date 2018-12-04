'use strict'

/* eslint-disable indent */

// jest.mock('gridfs-stream')
jest.mock('fs')
jest.genMockFromModule('gridfs-stream')
jest.mock('gridfs-stream')

let gfs = require('gridfs-stream')

const songService = require('../services/song-service')
const stream = require('stream')


describe('SongService test suit', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('test if finish event is called', async done => {
        // NINJA level test !
        const readable = stream.Readable()
        readable._read = jest.fn()
        readable.pipe = jest.fn((writable) => {
            writable.on = jest.fn((eventName, resolve) => {
                if (eventName === 'finish'){
                    done()
                    resolve()
                }
            })
            return writable
        })
        await songService.storeFile(readable)
    })

    test('test if error event is called', async done => {
        // NINJA level test !
        const readable = stream.Readable()
        readable._read = jest.fn()
        readable.pipe = jest.fn((writable) => {
            writable.on = jest.fn((eventName, reject) => {
                if (eventName === 'error'){
                    done()
                    reject()
                } else
                    return writable
            })
            return writable
        })
        await songService.storeFile(readable)
    })

    test('check if .openReadStream() gets to streaming finidh', async done => {
        const mockedStream = stream.Writable()
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
