'use strict'

const express = require('express')
const router = express.Router()
const status = require('http-status-codes')

router.get('/', async(req, res) => {
    res.render('home_body')
})

router.get('/playlist/:id', async(req, res) => {
    res.render('playlist_body')
})

module.exports = router
