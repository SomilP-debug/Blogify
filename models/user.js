const mongoose = require("mongoose");
const crypto = require("crypto");
const { createtokenforuser } = require("../services/auth");

const userSchema = new mongoose.Schema({
    fullname : {
        type:String,
        required:true,
    },
    email :{
        type: String,
        unique:true,
        
    },
    salt:{
        type:String,
    },
    password :{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER",
    },
    profileimageURL:{
        type:String,
        default:"/images/avatar.png"
    }
},{timestamps:true});



userSchema.pre("save",function(next){
      const user = this;
      if(!user.isModified("password")){
         return(next());
      }
      const salt = crypto.randomBytes(16).toString("hex");
      const hashedpassword = crypto.createHmac("sha256",salt).update(user.password).digest("hex");
      this.salt = salt;
      this.password = hashedpassword;
      next();
});
userSchema.static("matchpasswordandgettoken", async function (email,password){
       const user = await this.findOne({email});
       if(!user){
        throw new Error("NO SUCH USER EXIST");
        }
     const salt = user.salt;
     const hp = crypto.createHmac("sha256",salt).update(password).digest("hex");
     if(hp !== user.password){
       throw new Error("INVALID PASSWORD OR EMAILID");
     }
     const token = createtokenforuser(user);
     return(token);
     
});
const User = mongoose.model('user',userSchema);
module.exports = User;
