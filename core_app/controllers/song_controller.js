'use strict'

const express = require('express')
const router = express.Router()
const status = require('http-status-codes')
const multiparty = require('multiparty')
const songService = require('../services/song_service')
const validate = require('validate-fields')()
const sha256 = require('sha256')
const SongSchema = require('../validation_schemas/SongSchema')
const mongoService = require('../services/mongo_service')

router.post('/song', async(req, res) => {
    new multiparty.Form({maxFieldSize: 20000, maxFields: 10, autoFiles: true})
        .parse(req, async(err, fields, files) => {
            const song = {}
            Object.keys(fields).forEach((fName) => {
                song[fName] = fields[fName][0]
            })
            song.fileName = sha256(files.song[0].originalFilename)
            if (!validate(SongSchema, song, {strict: true}))
                res.status(status.BAD_REQUEST).send(validate.lastError)
            try {
                await songService.store(song)
                await mongoService.store(files.song[0].path, song.fileName)
                res.status(status.CREATED).send()
            } catch(err) {
                res.status(status.INTERNAL_SERVER_ERROR).send()
            }
        })
})

router.get('/songs', async(req, res) => {
    const songs = await songService.allSongsForUser(1)
    res.render('songs_body', {songs: songs})
})

router.get('/login', async(req, res) => {
    res.render('blank', {layout: 'login.hbs'})
})

module.exports = router

