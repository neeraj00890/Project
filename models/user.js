const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const userRoles = ['Developer', "Tester"];
const user = new Schema(
    {
        firstName : {
            type: String,
            required: true
        },
        lastName : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true
        },
        image : {
            type: String,
            required: true
        },
        role : {
            type: String,
            required: true,
            enum: userRoles
        }

    }
)

module.exports =  mongoose.model("User", user);