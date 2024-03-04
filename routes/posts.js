const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pintrest");

let postSchema = mongoose.Schema({
    postText:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:  "User"
    },
    creratedAt:{
        type:Date,
        default:Date.now
    },
    likes:{
        type:Array,
        default:[]
    },
})

module.exports = mongoose.model("Post",postSchema);