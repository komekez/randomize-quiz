const express = require('express'); 
const apis = express.Router();
const questionServices = require('../services/questions.service')



apis.get('/get-questions', async function (req, res) {
    res.send(await questionServices.fetchRandomQuestion());
  })


module.exports = apis;