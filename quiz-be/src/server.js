const express = require('express')
const app = express()
const mongoConnection = require('../connections/mongoConnection');
require('dotenv').config();

// Creating Mongo Connections
mongoConnection.mongoConnect();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Quiz Backend is listening at http://localhost:${port}`)
})