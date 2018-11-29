'use strict'

const fs = jest.genMockFromModule('fs');

const mockedStream = require('stream').Readable();
mockedStream._read = function(size) { /* do nothing */ };

fs.createReadStream = () => mockedStream

fs.unlink = jest.fn()

module.exports = fs
