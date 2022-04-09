const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
    user_id : {type : ObjectId},
    start_time : {type : Date},
    end_time : {type : Date},
    user_agent : {type : String},
    user_device : {type : String},
    referrer : {type : String}
});

// Compile model from schema
module.exports = mongoose.model('analytics', analyticsSchema );