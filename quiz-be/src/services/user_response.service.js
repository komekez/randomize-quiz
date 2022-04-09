const userResponseModel = require('../models/user_response.models')

async function insertUserResponse(params) {
    try { 
        let userResponse = []
        let userResponseParams = params['user_response']
        for (const question_id in userResponseParams['initialResponse']) {
            userResponse.push ({
                'question_id' : question_id,
                'option' : userResponseParams['initialResponse'][question_id],
                'user_id' : userResponseParams['user_id'],
                'created_at' : new Date()
            })
        }
        const insertUserResponse = await userResponseModel.create(userResponse)
        if(insertUserResponse[0]._id) {
            return true
        } 
        return false
    } catch(error) {
        //Can Perform Logging here
        return false
    }
}


module.exports = {
    insertUserResponse
}