'use strict'

const express = require('express')
const router = express.Router()
const status = require('http-status-codes')
const db = require('../persistance/db')
const multiparty = require('multiparty')
const fs = require('fs')
const playlistService = require('../services/playlist_service')


router.get('/playlists', async(req, res) => {
    res.render('playlists_body')
})

router.get('/playlist/:id', async(req, res) => {
    const playlist = playlistService.find(req.params.id)
    if (playlist)
        res.render('playlist_body', {playlist: playlist.dataValues, hasImage: !!playlist.dataValues.imageData})
    else
        res.status(status.BAD_REQUEST).send()
})

router.post('/playlist', async(req, res) => {
    try {
        if (req.body.name) {
            const playlist = await playlistService.store(null, req.body.name)
            res.status(status.CREATED).send({id: playlist.get('id')})
        }
        res.status(status.BAD_REQUEST).send()
    } catch (e) {
        res.status(status.INTERNAL_SERVER_ERROR).send('Huston got a problem!')
    }
})

router.put('/playlist/:id', async(req, res) => {
    new multiparty.Form({maxFieldSize: 15000, maxFields: 2, autoFiles: true})
        .parse(req, async (err, fields, files) => {
            if (!fields['name'][0] && !Object.keys(files).length)
                res.status(status.BAD_REQUEST).send('No changes were given for playlist')
            try {
                let imgData = null
                if (files.file[0].originalFilename) {
                    imgData = fs.readFileSync(files.file[0].path)
                    fs.writeFileSync(process.env.IMG_STORG_PATTERN + req.params.id + '.png', imgData)
                }
                await playlistService.store(req.params.id, fields['name'][0], imgData)
                res.status(status.ACCEPTED).send()
            } catch (e) {
                res.status(status.INTERNAL_SERVER_ERROR).send()
            }
        })
})

module.exports = router

