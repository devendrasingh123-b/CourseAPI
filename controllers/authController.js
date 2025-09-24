
const express=require("express");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const UserModel = require("../model/User");
const saltRounds = 9;
require("dotenv").config();


let SININ= async (req, res) => {

    // console.log("hi")

  try {
    const { username, email, password } = req.body;
   
    bcrypt.hash(password, saltRounds, async function (err, hash) {
    
      if (err) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
      
        console.log("raw->", password,"hashed-->",hash);
        await UserModel.create({ username, email, password: hash });
        res.status(201).json({ message: "Signup Sucessfull" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}


let LOGIN=async (req, res) => {
  try {

   const { email, password } = req.body;
   let user = await UserModel.findOne({ email });  
    
    if (!user) {
      
      res.status(404).json({ message: "User Not Found, Please Signup you" });
    } else {
     
      let hash = user.password; 
      bcrypt.compare(password, hash).then(function (result) {
       
        console.log(result);
        if (result == true) {
    

          var token = jwt.sign({userId: user._id},"shhhhh");
        //   var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


          console.log(token)
          res.status(200).json({ message: "Login Sucesss",token });
        } else {
          ///  password
          res.status(403).json({ message: "Wrong Password" });
        }
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}



let Reset=async (req, res) => {
  try {
    const { email, password, newpassword } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found, Please Signup" });
    }

    const isMatc = await bcrypt.compare(password, user.password);
    if (!isMatc) {
      return res.status(403).json({ message: "Wrong Current Password" });
    }

    const hashed = await bcrypt.hash(newpassword, saltRounds);

    // console.log(user)

    user.password = hashed;

    // console.log(user)
    
    await user.save();

    return res.status(200).json({ message: "Password Changed Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};





module.exports={LOGIN,SININ,Reset}