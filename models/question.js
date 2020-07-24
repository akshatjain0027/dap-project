const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var QuestionSchema = new Schema(
  {
    question: {
      type: String,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    answerId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Answer",
      },
    ],
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
const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
