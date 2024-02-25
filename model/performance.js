// In your Mongoose model file, e.g., Performance.js

const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    date: { type: Date, default: Date.now },
    performanceScore: { type: Number, required: true },
    // Other performance-related fields
});

var performancemodel =mongoose.model("performance",performanceSchema)
module.exports =performancemodel;