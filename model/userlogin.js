//userlogin.js
const mongoose=require("mongoose")

let sc=mongoose.Schema;
const userloginschema = new sc({
    empid:String,
    password:String
    
});

var userloginmodel =mongoose.model("userlogins",userloginschema)
module.exports =userloginmodel;