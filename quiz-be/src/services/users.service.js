const userModel = require('../models/users.models')

async function insertUser(params) {
    try { 
        const insertUser = await userModel.create(params)

        if(insertUser._id) {
            return true
        }
        return false
    } catch(error) {
        console.log(error)
    }
}


module.exports = {
    insertUser
}