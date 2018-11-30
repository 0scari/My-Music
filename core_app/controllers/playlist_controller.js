'use strict'

const express = require('express')
const router = express.Router()
const status = require('http-status-codes')
const db = require('../persistance/db')

router.get('/playlist/:id', async(req, res) => {
    let user
    let proj
    let proj2

    await db.users.create({firstName: 'admin', lastName: 'X', email: 'me@internet.org'})
        .then( userA => {user = userA})

    await db.playlists.create({name: 'QWERTY', userId: user.get('id')})
        .then( project => {proj = project})

    await db.playlists.create({name: 'AKAKA', userId: user.get('id')})
        .then( project => {proj = project})

    db.users.findById(user.get('id')).then(async user => {
        const pl = await user.getPlaylists()
        console.log(pl)
    })
})

router.post('/playlist/:id', async(req, res) => {
    res.render('playlist_body')
})

router.put('/playlist/:id', async(req, res) => {
    res.render('playlist_body')
})

router.delete('/playlist/:id', async(req, res) => {
    res.render('playlist_body')
})

module.exports = router
