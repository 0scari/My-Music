'use strict'

const ss = jest.genMockFromModule('../song-service');

ss.storeFile = (filePath, fileName) =>
null

ss.sFile = async(filePath, fileName) => {
    //
}

module.exports = ss
