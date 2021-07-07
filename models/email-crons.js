const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const emailCron = new Schema({
    cronPeriod: {
        type: String,
        required: true
    },
    emailTemplate: {
        type: mongoose.Schema.ObjectId,
        ref : "emailTemplate"
    }
})

module.exports =   mongoose.model("emailCron", emailCron);
