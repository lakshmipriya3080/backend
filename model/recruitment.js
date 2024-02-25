const mongoose=require("mongoose")

let sc=mongoose.Schema;
const recruitschema = new sc({
    idd:String,
    jobposition:String,
    jobdetails:String,
    eligibility:String,
    Status:String,
    
});

var recruitmodel =mongoose.model("recruitment",recruitschema)
module.exports =recruitmodel;