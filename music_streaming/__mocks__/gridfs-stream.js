'use strict'

const mockedStream = require('stream').Readable()
mockedStream._read = jest.fn()

const writable = require('stream').Writable()
writable._write = jest.fn()

const Grid = () => ({
     createWriteStream: () => writable,
     createReadStream: () => mockedStream
 })

module.exports
module.exports = Grid

