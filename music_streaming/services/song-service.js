'use strict'

const gridfsstream = require('gridfs-stream')
const mongoose = require('mongoose')
const fs = require('fs')


// module.exports.stream = res => {
//     mongoose.connect(process.env.MONGO_CONN_STR)
//     const conn = mongoose.connection
//     gridfsstream.mongo = mongoose.mongo
//     conn.once('open', () => {
//         const gfs = gridfsstream(conn.db)
//         const readstream = gfs.createReadStream({
//             filename: 'Blue Browne.mp3'
//         })
//         readstream.pipe(res)
//             .on('close', x => {
//                 res.end();
//             })
//     })
// }

module.exports.storeFile = (filePath, fileName) =>
    new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGO_CONN_STR)
        const conn = mongoose.connection
        gridfsstream.mongo = mongoose.mongo
        // TODO make sure filename is unique
        conn.once('open', () => {
            const gfs = gridfsstream(conn.db)
            const writeStream = gfs.createWriteStream({
                filename: fileName
            })
            this.streamToMongo(
                {reject: reject, resolve: resolve},
                writeStream,
                filePath)
        })
    })

module.exports.sFile = async(filePath, fileName) => {
    //
}

module.exports.streamToMongo = (promiseContols, writeStream, filePath) => {
    fs.createReadStream(filePath)
        .pipe(writeStream)
        .on('finish', () => {
            fs.unlink(filePath, (err) => {
                if (err)
                    promiseContols.reject(err)
                else
                    promiseContols.resolve()
            })
        })
        .on('error', (err) => {
            promiseContols.reject(err)
        })
}
