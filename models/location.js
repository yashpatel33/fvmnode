const mongoose = require("mongoose");
const { timeStamp } = require('console'); 

const locationSchema = new mongoose.Schema({
    unit_number: {type: Number , required:true},
    street_name: {type: String , required:true},
    city: { type: String, require: true},
    province: {type: String, required:false},
    zip_code:  {type: String, required:true},
    country: {type: String, required:true},  
},{ timestamps: true });

const location = mongoose.model("location", locationSchema);
module.exports = location;
