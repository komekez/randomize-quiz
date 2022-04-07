const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    surveyname : {type : String},
    questiontext : {type : String},
    scaletype : {type : String},
    varname : {type : String},
    option1 : {type : String},
    option2 : {type : String},
    option3 : {type : String},
    option4 : {type : String},
    option5 : {type : String},
    option6 : {type : String},
    option7 : {type : String},
});

// Compile model from schema
module.exports = mongoose.model('questions', questionSchema );