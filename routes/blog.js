const {Router} = require("express");
const route = Router();
const multer = require("multer");
const path = require("path");
const blog = require("../models/blog")
const Comment = require("../models/comment")

route.get("/add-new",(req,res)=>{
    res.render("addblog",{
        user:req.user
    })
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null,path.resolve("./public/uploads"));
  },

  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null, filename);
  }
});

const upload = multer({ storage: storage })

route.post("/add-new" , upload.single("coverimage"),async (req,res)=>{

   const Bloghere =  await blog.create({
        title:req.body.title,
        body:req.body.body,
        coverimageUrl: `/uploads/${req.file.filename}`,
        createdBy:req.user._id
    });
    console.log(Bloghere);
    
    res.redirect(`/blog/${Bloghere._id}`);
});
route.get("/:blogid",async (req,res)=>{
    const blogh = await blog.findById(req.params.blogid).populate("createdBy");
    const comments = await Comment.find({blogId:req.params.blogid}).populate("userId");
    console.log(comments[0]);
    res.render("blog",{
        user:req.user,
        blog:blogh,
        Comments:comments
    });

});
route.post("/comment/:blogid",async (req,res)=>{
  await Comment.create({
    content:req.body.content,
    userId:req.user._id,
    blogId:req.params.blogid

  });
  return(res.redirect(`/blog/${req.params.blogid}`));
})
module.exports = route;