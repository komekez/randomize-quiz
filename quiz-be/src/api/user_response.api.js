const express = require('express'); 
const apis = express.Router();
const userResponseService = require('../services/user_response.service')
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

apis.post('/insert', jsonParser, async function (req, res, next) {
    const data = await userResponseService.insertUserResponse(req.body)
    res.send({
        status : 200,
        data : {
            inserted : data
        },
        message : "OK"
    });
})
module.exports = apis;