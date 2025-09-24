const express=require("express");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const UserModel = require("../model/User");
const saltRounds = 9;
require("dotenv").config();



let UserRouter=express.Router();


UserRouter.post("/signup", async (req, res) => {

    console.log("hi")

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
});



/// email and password
UserRouter.post("/login", async (req, res) => {
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
    

          var token = jwt.sign({userId: user._id},process.env.SECRET-Key);
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
});





module.exports = UserRouter;