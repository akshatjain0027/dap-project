const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnswerSchema = new Schema(
  {
    answer: {
      type: String,
    },
    title: {
      type: String,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    upVoteCount: {
      type: Number,
    },
    questionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
