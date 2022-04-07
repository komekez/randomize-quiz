const express = require('express')
const app = express()
const mongoConnection = require('../connections/mongoConnection');
const apis = require('./app')
require('dotenv').config();

// Creating Mongo Connections
mongoConnection.mongoConnect();

const port = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(port, () => {
    console.log(`Quiz Backend is listening at http://localhost:${port}`)
})

app.use('/api', apis);