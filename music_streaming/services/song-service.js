'use strict'

const gridfsstream = require('gridfs-stream')
const mongoose = require('mongoose')
const fs = require('fs')

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

module.exports.openReadStream = (res, songId) =>
    new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGO_CONN_STR)
        const conn = mongoose.connection
        // gridfsstream.mongo =
        conn.once('open', () => {
            const gfs = gridfsstream(conn.db, mongoose.mongo)
            const readStream = gfs.createReadStream({
                filename: songId
            })
            readStream.pipe(res)
                .on('finish', () => resolve())
                .on('error', (err) => reject(err))
        })
    })
