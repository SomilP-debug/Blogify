const {Schema,model} = require("mongoose");

const commentSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
         type:Schema.Types.ObjectId,
         ref:"blog"
    },
    userId:{
         type:Schema.Types.ObjectId,
         ref:"user"
    }
});

const comment = model("comment",commentSchema);
module.exports = comment;