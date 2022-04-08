const express = require('express')
const app = express()
const mongoConnection = require('../connections/mongoConnection');
const apis = require('./app')
const bodyParser = require('body-parser')
require('dotenv').config();

// Creating Mongo Connections
mongoConnection.mongoConnect();

const port = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.listen(port, () => {
    console.log(`Quiz Backend is listening at http://localhost:${port}`)
})

app.use('/api', apis);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));