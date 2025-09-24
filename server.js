const express=require("express");
const connectToDB = require("./config/db");
const UserRouter = require("./routes/authRoutes");
require("dotenv").config();



const app=express();


app.use(express.json())



connectToDB()

app.use("/users",UserRouter)

app.get("/test", (req,res)=>{
    res.send("yes this")
} )




app.use((req,res)=>{
    res.status(404).json({msg:"File not Found"})
})


// console.log(process.env.NAME)

app.listen(process.env.PORT,()=>{
    console.log("server is On")
})
