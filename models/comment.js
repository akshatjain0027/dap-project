const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    content:{
        type:String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes:[
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }
        }
      ],
      dislikes:[
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          }
        }
      ],
    answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
    
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
