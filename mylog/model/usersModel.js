let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let usersRules = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    nick_name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    enabled_flag:{
        type:String,
        default:"Y"
    }
});

let usersModel = mongoose.model("users",usersRules);
module.exports = usersModel;