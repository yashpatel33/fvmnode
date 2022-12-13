const mongoose = require("mongoose");
const { timeStamp } = require('console'); 

const bidSchema = new mongoose.Schema({
    product_id : {type: String , required:true},
    user_id: {type: String , required:true},
    bid_date: {type: String , required:true},
    bid_amount: {type: Number, required:true},
    email: {type: String, required:true},
},{ timestamps: true });

const bid = mongoose.model("bid", bidSchema);
module.exports = bid;
