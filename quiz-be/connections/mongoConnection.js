const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;

async function mongoConnect() {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex:true
    })
    .then(() => {
        console.log("Mongo Connection SuccessFul");
    })
    .catch((err) => {
        console.log("Mongo Connections Unsuccessful", err);
    });
}

module.exports = {
    mongoConnect
};