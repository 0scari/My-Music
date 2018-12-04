'use strict'

const express = require('express')
const router = express.Router()
const status = require('http-status-codes')
const validate = require('validate-fields')()
const UserSchema = require('../validation_schemas/UserSchema')
const userService = require('../services/user_service')


router.post('/enter', async(req, res) => {
    if (!validate(UserSchema, req.body, {strict: true})) {
        res.status(status.BAD_REQUEST).send(validate.lastError)
        return
    }
    await userService.store(req.body)
    res.cookie('uuid', req.body.uuid)
    res.redirect('/')
})

module.exports = router

