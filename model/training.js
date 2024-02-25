const mongoose=require("mongoose")

let sc=mongoose.Schema;
const trainschema = new sc({
    idd:String,
    ename:String,
    age:Number,
    completed:String,
    remarks:String
});

var trainmodel =mongoose.model("training",trainschema)
module.exports =trainmodel;