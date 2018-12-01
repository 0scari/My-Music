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
    // let user
    // let proj
    // let proj2
    //
    // await db.users.create({firstName: 'admin', lastName: 'X', email: 'me@internet.org'})
    //     .then( userA => {user = userA})
    //
    // await db.playlists.create({name: 'QWERTY', userId: user.get('id')})
    //     .then( project => {proj = project})
    //
    // await db.playlists.create({name: 'AKAKA', userId: user.get('id')})
    //     .then( project => {proj = project})
    //
    // db.users.findById(user.get('id')).then(async user => {
    //     const pl = await user.getPlaylists()
    //     console.log(pl)
    // })

    db.playlists.findById(req.params.id).then(
        playlist => res.render('playlist_body', {name: playlist.name})

    )
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
    res.render('playlist_body')
})

router.delete('/playlist/:id', async(req, res) => {
    res.render('playlist_body')
})

module.exports = router
