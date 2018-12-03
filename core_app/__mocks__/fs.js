'use strict'

// const fs = jest.genMockFromModule('fs');

module.exports.readFileSync = () => true
module.exports.writeFileSync = () => true
module.exports.createReadStream = jest.fn()

// module.exports = fs
