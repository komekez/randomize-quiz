const _ = require('lodash')
const userResponseModel = require('../models/user_response.models')
const userModel = require('../models/users.models')
const questionModel = require('../models/questions.models')
const analyticsModel = require('../models/analytics.model')
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


async function insertUserAnalytics(params) {
    try { 
        const paramsBody = params.body
        const analyticsData = {
            'start_time' : new Date(paramsBody['analytics']['start_time']),
            'user_agent' : params.rawHeaders[15],
            'user_device' : params.rawHeaders[17],
            'referrer' : params.rawHeaders[27]
        }
        const insertUserAna = await analyticsModel.create(analyticsData)
        if(insertUserAna._id) {
            return insertUserAna._id
        } 
        return 0
    } catch(error) {
        //Can Perform Logging here
        return 0
    }
}


async function updateUserAnalytics(params) {
    try { 

        const updateUserAna = await analyticsModel.updateOne({_id : params.analytics_id }, {
            'user_id' : params['analytics']['user_id'],
            'end_time' : new Date(params['analytics']['end_time']),
        })
        if(updateUserAna) {
            return true
        } 
        return false
    } catch(error) {
        //Can Perform Logging here
        return false
    }
}


module.exports = {
    userResponseCSV,
    insertUserAnalytics,
    updateUserAnalytics
}