//employeeprofile.js
const mongoose=require("mongoose")

let sc=mongoose.Schema;
const employeeprofileschema = new sc({
    employeeid:String,
    fullName: String,
  email: String,
  phone: String,
  address: String,
  department: String,
  position: String,
  manager: String,
    
});

var employeeprofilemodel=mongoose.model("employeeprofile",employeeprofileschema)
module.exports =employeeprofilemodel;