const mongoose=require("mongoose")

let sc=mongoose.Schema;
const guestschema = new sc({
    idd:String,
    gname:String,
    gage:Number,
    gadress:String,
    gtatus:String,
    
});

var guestmodel=mongoose.model("employee",guestmodel)
module.exports =guestschema;