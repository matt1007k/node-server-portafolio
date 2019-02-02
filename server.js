const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const config = require('./config/config')

const app = express()

// Middleware
//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Routes
app.use(require('./routes/index'))

mongoose.connect(config.dbmongo, { useNewUrlParser: true })    
    .then(() => {
        app.listen(config.port, () => {
            console.log('Connect to database');
            console.log('Listening server http://localhost:'+ config.port);
        })
    })     
    .catch(error => {
        console.log('Error db: ', error);
    
    })

