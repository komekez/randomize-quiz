const userResponseModel = require('../models/user_response.models')

async function insertUserResponse(params) {
    try { 
        const insertUserResponse = await userResponseModel.create(params)

        if(insertUserResponse._id) {
            return true
        }
        return false
    } catch(error) {
        console.log(error)
    }
}


module.exports = {
    insertUserResponse
}