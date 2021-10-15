const mongoose = require('mongoose');

const emailsSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            require: true,
            maxlength:32,
        },
        email:{
            type: String,
            trim: true,
            require: true,
        },
        phone:{
            type: String,
            trim: true,
            maxlength: 20,
            default: ""
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Email", emailsSchema);
