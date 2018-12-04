'use strict'

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')

const app = express()

// TODO allow CORS *

const hbs = require('express-handlebars')
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'home',
    layoutsDir: __dirname + '/../website/views/layouts/',
    partialsDir: __dirname + '/../website/views/partials/'
}))
app.set('views', path.join(__dirname, '../website/views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
	src: path.join(__dirname, '../website/public'),
	dest: path.join(__dirname, '../website/public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}))
app.use(express.static(path.join(__dirname, '../website/public')))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})
app.use('/', require('./routes'))

module.exports = app
