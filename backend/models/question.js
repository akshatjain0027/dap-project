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
  },
  {
    timestamps: true,
  }
);
const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
