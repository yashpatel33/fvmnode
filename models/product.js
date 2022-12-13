const mongoose = require("mongoose");
const { timeStamp } = require('console'); 

const productSchema = new mongoose.Schema({
    name : {type: String , required:true},
    short_description: {type: String , required:true},
    long_description: {type: String , required:true},
    images: [{type: String , required:true}],
    base_price: {type: Number , required:true},
    tag: [{ type: String, require: true}],
    category: {type: String, required:true},
    location_id:  {type: String, required:true},
    bid_end_date: {type: String, required:true},  
    current_highest_bid: {type: Number , required:true},
    buyer_id: {type: String, required:false},
    buyer_email: {type: String, required:false},
    seller_id: {type: String, required:true},
    bids: {type: Number, required:true},
    favorite_by: [{ type: String, require: false}],
},{ timestamps: true });

const product = mongoose.model("product", productSchema);
module.exports = product;