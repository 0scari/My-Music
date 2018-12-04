'use strict'

const gridfsstream = require('gridfs-stream')
const mongoose = require('mongoose')
const fs = require('fs')

module.exports.storeFile = (part) =>
    new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGO_CONN_STR)
        const conn = mongoose.connection
        gridfsstream.mongo = mongoose.mongo
        conn.once('open', () => {
            const gfs = gridfsstream(conn.db)
            const writeStream = gfs.createWriteStream({
                filename: part.filename
            })
            part.pipe(writeStream)
                .on('finish', () => resolve())
                .on('error', (err) => reject(err))
        })
    })

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
