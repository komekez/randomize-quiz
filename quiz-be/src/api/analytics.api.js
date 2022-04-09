const express = require('express'); 
const apis = express.Router();
const analyticsServices = require('../services/analytics.service')
const CsvParser = require("json2csv").Parser;


apis.get('/user-response/csv', async function (req, res) {
    const data = await analyticsServices.userResponseCSV()
    const csvFields = ["User Name", "Question", "Option Selected", "Form Filled On"];
    const csvParser = new CsvParser({ csvFields });
    const csvParsedData = csvParser.parse(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=analytics.csv");

    res.status(200).end(csvParsedData);
})

module.exports = apis;