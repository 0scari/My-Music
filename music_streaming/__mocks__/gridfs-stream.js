'use strict'

const mockedStream = require('stream').Readable()
mockedStream._read = function(size) { /* do nothing */ };


const Grid = function(db, mongo) {
 return {
     createWriteStream: () => {},
     createReadStream: () => mockedStream
 }
}

module.exports = Grid

