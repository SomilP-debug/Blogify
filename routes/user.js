const express = require("express");
const route = express.Router();
const User = require("../models/user");
const crypto = require("crypto");

route.get("/signin",(req,res)=>{
    res.render("signin");
});

route.get("/signup",(req,res)=>{
    res.render("signup");
});

route.post("/signup",async (req,res)=>{
    const {fullname,email,password} = req.body;
    await User.create({
        fullname,
        email,
        password,
    });
    return(res.redirect("/"));
});

route.post("/signin",async(req,res)=>{
    const {email,password} = req.body;
    try{
    const token = await User.matchpasswordandgettoken(email,password);
    console.log(token);
    res.cookie("token",token).redirect("/");
   
    }
    catch(error){
        res.render("signin",{
            error:error.message
        });
    }
    
});

route.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})

module.exports = route;