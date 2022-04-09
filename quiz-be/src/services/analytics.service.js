const csvParser = require('json2csv')
const userResponseModel = require('../models/user_response.models')

async function userResponseCSV() {
    try { 
        const userResponse = await userResponseModel.find({});

        console.log(userResponse)
        // return res
    } catch(error) {
        console.log(error)
    }
}


module.exports = {
    userResponseCSV
}