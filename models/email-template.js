const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const emailTemplate = new Schema({
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports =   mongoose.model("emailTemplate", emailTemplate);
