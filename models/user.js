const mongoose = require("mongoose");
const { timeStamp } = require('console'); 

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true }, 
  gender: { type: String}, 
  dob: { type: Date, required: true }, 
  is_seller: { type: Boolean, required: true }, 
  email: { type: String, required: true }, 
  password: { type: String, required: true } }, 
  { timestamps: true }); 
  
const user = mongoose.model('user', userSchema); 
module.exports = user
