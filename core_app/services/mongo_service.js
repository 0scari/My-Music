'use strict'

const request = require('request')
const fs = require('fs')

module.exports.store = (filePath, fileName) =>
     request.post({
        url: process.env.MONGO_ADDRESS,
        formData: {
            custom_file: {
                value: fs.createReadStream(filePath),
                options: {
                    filename: fileName
                }
            }
        }
    }, (err) => {if (err) throw err})


