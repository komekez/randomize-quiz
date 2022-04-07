const express = require('express'); 
const apis = express.Router();
const questionServices = require('../services/questions.service')


apis.get('/get-questions', async function (req, res) {
    const data = await questionServices.fetchRandomQuestion()
    res.send({
        status : 200,
        data : data,
        message : "OK"
    });
})
module.exports = apis;