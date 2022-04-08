const userModel = require('../models/users.models')

async function insertUser(params) {
    try { 
        let res = {
            inserted : false
        }
        const insertUser = await userModel.create(params)

        if(insertUser._id) {
            res = {
                inserted : true,
                user_id : insertUser._id
            }
        }
        return res
    } catch(error) {
        console.log(error)
    }
}


module.exports = {
    insertUser
}