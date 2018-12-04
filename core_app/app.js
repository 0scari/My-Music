'use strict'

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')
const Sequelize = require('sequelize');

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

app.use('/', require('./controllers/playlist_controller'))
app.use('/', require('./controllers/song_controller'))

app.get('/', async(req, res) => {
    res.render('home_body')
})

// catch 404 and forward to error handler
// app.use((req, res, next) => {
// 	next(createError(404))
// })

// error handler
// app.use((err, req, res, next) => {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message
// 	res.locals.error = req.app.get('env') === 'development' ? err : {}
//
// 	// render the error page
// 	res.status(err.status || 500)
// 	res.render('error')
// })


module.exports = app
