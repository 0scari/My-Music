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
app.set('views', path.join(__dirname, '../website/views'));
app.set('view engine', 'hbs');

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

const authMiddleware = require('./auth_middleware')
app.use(authMiddleware)
app.get('/', async(req, res) => {
    res.render('home_body')
})

app.use('/', require('./controllers/playlist_controller'))
app.use('/', require('./controllers/song_controller'))
app.use('/', require('./controllers/auth_controller'))

module.exports = app
