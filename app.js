require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const route = require("./routes/user");
const blogroute = require("./routes/blog");
const mongoose = require("mongoose");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const { checkForAuthenthicationCookie } = require("./middlewares/auth");
const Blog = require("./models/blog");



mongoose.connect(process.env.MONGO_URL).then((r)=>{
    console.log("MONGODB CONNECTED");
}).catch((err)=>{
    console.log("ERROR IN MONGODB");
});


app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(checkForAuthenthicationCookie("token"))
app.use("/user",route);
app.use("/blog",blogroute);




app.get("/",async (req,res)=>{
     const Blogs = await Blog.find({});

    res.render("home",{
        user:req.user,
        blogs:Blogs
    });});

app.listen(PORT ,()=>{
    console.log(`SERVER STARTED AT PORT ${PORT}`);})
