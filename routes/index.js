const express = require('express')

const app = express()

app.use( '/auth', require('./authenticate') )
app.use( '/users', require('./user') )
app.use( '/categories', require('./category') )

module.exports = app