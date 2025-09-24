const express=require("express");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const UserModel = require("../model/User");
const { LOGIN, SININ, Reset } = require("../controllers/authController");
const saltRounds = 9;
require("dotenv").config();



let UserRouter=express.Router();


UserRouter.post("/signup", SININ);



/// email and password
UserRouter.post("/login", LOGIN);



UserRouter.post("/reset",Reset)



module.exports = UserRouter;