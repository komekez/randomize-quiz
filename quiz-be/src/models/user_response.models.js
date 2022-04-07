const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId
const userResponseSchema = new Schema({
    question_id : {type : ObjectId},
    user_id : {type : ObjectId},
    option : {type : String},
    created_at : {type : Date},
});

// Compile model from schema
module.exports = mongoose.model('user_response', userResponseSchema );