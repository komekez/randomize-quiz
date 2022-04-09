const _ = require('lodash')
const userResponseModel = require('../models/user_response.models')
const userModel = require('../models/users.models')
const questionModel = require('../models/questions.models')
const CsvParser = require("json2csv").Parser;

async function userResponseCSV() {
    try { 
        const userResponse = await userResponseModel.find({});

        //To get the user Details and format it
        const userIds = _.map(userResponse, 'user_id')
        const userData = await userModel.find({_id : {$in : userIds}}, {name : 1})
        let userDetails = {}
        userData.forEach(users => {
            userDetails[users._id] = users.name
        });

        //To get the question Details and format it
        const questionids = _.map(userResponse, 'question_id')
        const questionData = await questionModel.find({_id : {$in : questionids}}, {questiontext : 1})
        let questionDetails = {}
        questionData.forEach(question => {
            questionDetails[question._id] = question.questiontext
        });

        //Formatting the CSV Data
        let csvData = []
        userResponse.forEach(responses => {
            csvData.push({
                'userName' : userDetails[responses['user_id']],
                'question' : questionDetails[responses['question_id']],
                'option_selected' : responses['option'],
                'formFilledOn' : responses['created_at']
            })
        })

        return csvData
    } catch(error) {
        console.log(error)
        return []
    }
}


module.exports = {
    userResponseCSV,
}