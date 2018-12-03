'use strict'

const express = require('express')
const router = express.Router()
const status = require('http-status-codes')
const songService = require('./services/song-service')
const multiparty = require('multiparty')

// TODO validate extension
router.post('/song-upload', async(req, res) => {
    const form = new multiparty.Form()
    form.on('part', async part => {
            try {
                await songService.storeFile(part)
                res.status(status.ACCEPTED).send()
            } catch(err) {
                res.status(status.BAD_REQUEST).send(err)
            }
    })
    form.parse(req)
})

router.get('/:id', async(req, res) => {
    try {
        await songService.openReadStream(res, req.params.id)
        res.end()
    } catch (e) {
        res.status(status.BAD_REQUEST).send(e)
    }

})

module.exports = router
