const mongoose = require("mongoose");
const { timeStamp } = require('console'); 

const favoriteSchema = new mongoose.Schema({
    user_id: {type: String , required:true},
    product_id: {type: String , required:true},
},{ timestamps: true });

const favorite = mongoose.model("favorite", favoriteSchema);
module.exports = favorite;
