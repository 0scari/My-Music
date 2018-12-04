'use strict'

const ss = jest.genMockFromModule('../song-service');

ss.storeFile = (filePath, fileName) =>
null

ss.openReadStream = jest.fn()

module.exports = ss
