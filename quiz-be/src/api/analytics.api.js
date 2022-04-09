const express = require('express'); 
const apis = express.Router();
const analyticsServices = require('../services/analytics.service')


apis.get('/user-response/csv', async function (req, res) {
    const data = await analyticsServices.userResponseCSV()
    // res.send({
    //     status : 200,
    //     data : data,
    //     message : "OK"
    // });
})
module.exports = apis;