const express = require('express'); 
const apis = express.Router();
const userService = require('../services/users.service')
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

apis.post('/insert', jsonParser, async function (req, res ,next) {
    const data = await userService.insertUser(req.body)
    res.send({
        status : 200,
        data : data,
        message : "OK"
    });
})
module.exports = apis;