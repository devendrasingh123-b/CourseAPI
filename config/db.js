const mongoose = require("mongoose");


const connectToDB = async()=>{
    try{
        // process.env.MONGO_URI
        await mongoose.connect("mongodb://127.0.0.1:27017/auth01")
        console.log("Connected To DB")
    }catch(err){
        console.log("Failed To Connect DB")
    }
}

module.exports = connectToDB;