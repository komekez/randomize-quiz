const express = require('express'); 
const apis = express.Router();
const userService = require('../services/users.service')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

apis.post('/insert', async function (req, res, next) {
    const data = await userService.insertUser(req.query)
    res.send({
        status : 200,
        data : {
            inserted : data
        },
        message : "OK"
    });
})
module.exports = apis;