const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnswerSchema = new Schema(
  {
    title: {
      type: String,
    },
    answer: {
      type: String,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    upVote: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    downVote: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    questionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
    commentId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    image:{
      type:String
    },
    bookmarkUsersId:[
      {type: mongoose.Schema.Types.ObjectId,
        ref: "User"

      }
    ]
  },
  {
    timestamps: true,
  }
);
const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
