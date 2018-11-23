'use strict'

const express = require('express')
const router = express.Router()
const status = require('http-status-codes')

router.get('/', async(req, res) => res.render())

module.exports = router
