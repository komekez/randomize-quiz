const express = require('express'); 
const apis = express.Router();
const analyticsServices = require('../services/analytics.service')
const CsvParser = require("json2csv").Parser;
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();


apis.get('/user-response/csv', async function (req, res) {
    const data = await analyticsServices.userResponseCSV()
    const csvFields = ["User Name", "Question", "Option Selected", "Form Filled On"];
    const csvParser = new CsvParser({ csvFields });
    const csvParsedData = csvParser.parse(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=analytics.csv");

    res.status(200).end(csvParsedData);
})


apis.post('/insert', jsonParser, async function (req, res, next) {
    
    const data = await analyticsServices.insertUserAnalytics(req)
    res.send({
        status : 200,
        data : {
            inserted : data ? true : false,
            analytic_id : data
        },
        message : "OK"
    });
})


apis.post('/update', jsonParser, async function (req, res, next) {
    
    const data = await analyticsServices.updateUserAnalytics(req.body)
    res.send({
        status : 200,
        data : {
            inserted : data ? true : false,
            analytic_id : data
        },
        message : "OK"
    });
})

module.exports = apis;