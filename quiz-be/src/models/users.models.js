const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId
const usersSchema = new Schema({
    name : {type : String},
    email : {type : String},
    // created_at : {type : Date},
});

// Compile model from schema
module.exports = mongoose.model('users', usersSchema );