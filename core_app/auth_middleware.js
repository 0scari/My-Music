'use strict'

const userService = require('./services/user_service')

module.exports = async(req, res, next) => {
    if(req.path === '/enter' && req.method === 'POST') {
        next()
        return
    }
    if(!req.cookies.uuid){
        res.render('blank', {layout: 'login.hbs'})
        return
    }
    const user = await userService.getUserByUuid(req.cookies.uuid)
    if (user) {
        req.user = user
        next()
    } else
        res.render('blank', {layout: 'login.hbs'})
}
