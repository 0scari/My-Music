'use strict'

const express = require('express')
const router = express.Router()
const status = require('http-status-codes')
const songService = require('./services/song-service')
const multiparty = require('multiparty')
const validate = require('validate-fields')()
const SongSchema = require('./validation_schemas/SongSchema')
const sha256 = require('sha256')

// TODO validate extension
router.post('/song-upload', async(req, res) => {
    const form = new multiparty.Form({maxFieldSize: 20000, maxFields: 10, autoFiles: true})
    form.parse(req, async(err, fields, files) => {
        const song = {}
        Object.keys(fields).forEach((fName) => {
            song[fName] = fields[fName][0]
        })
        song.fileName = sha256(files.song[0].originalFilename)
        if (!validate(SongSchema, song, {strict: true}))
            res.status(status.BAD_REQUEST).send(validate.lastError)
        const filePath = files.song[0].path
        try {
            await songService.storeFile(filePath, song.fileName)
            res.status(status.ACCEPTED).send()
        } catch(err) {
            res.status(status.BAD_REQUEST).send(err)
        }
    })
})

router.get('/', async(req, res) => {
    res.render('home')
})

router.delete('/:id', async(req, res) => {
    req.params.id
    songService.stream(res)
    // const form = new multiparty.Form();
    // form.on('part', (part) => {
    //     part.pipe(fs.createWriteStream(`./${part.filename}`))
    //         .on('close', () => {
    //             res.end('OK')
    //         } )
    // })
    // form.parse(req);
})

module.exports = router
