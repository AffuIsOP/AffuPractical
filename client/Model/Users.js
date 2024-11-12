const mongoose = require("mongoose");

const userSchema = mongoose.Schema(

    {
        UserName:{
            type: String,
            required:[true, "User Name is required"]
        },
        UserEmail:{
            type: String,
            required:[true, "User Email is required"]
        },
        UserPass:{
            type: String,
            required:[true, "User Password is required"]
        },
    }

)

const UsersCollection = mongoose.model("Users", userSchema)

module.exports = {UsersCollection};
