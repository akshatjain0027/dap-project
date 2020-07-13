const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load  model
const User = require("../../models/user");
const Question = require("../../models/question");
const Answer = require("../../models/answer");

/**
 * GET ALL Questions In DB
 */
router.get("/", async (req, res) => {
  const questions = await Question.find()
    .populate("author")
    .populate({ path: "answerId", options: { sort: { upVoteCount: -1 } } }).sort({createdAt:-1});

  if (!questions)
    return res.status(400).json({ nopostsfound: "No Questions found" });
  // await questions.
  // populate({
  //   path: 'answerId',
  //   // Get friends of friends - populate the 'friends' array for every friend
  //   populate: { path: 'author' }
  // }).execPopulate()

  console.log(questions);
  res.json(questions);
});

/**
 * GET question OF A  particular QUESTION ID
 */
router.get("/:id", async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question)
    return res.status(400).json({ noquesfound: "No Question found" });
  //TODO populate question
  /*await question.populate('author').execPopulate()
  await question.populate('answerId').execPopulate()
  await question.
  populate({
    path: 'answerId',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'author' }
  }).execPopulate()
  // //await question.populate('answerId').populate('author').execPopulate()
  // await question.populate({path:'answerId'},populate({path:'author'})).execPopulate() */
  await question
    .populate([{
      path: "answerId",
      populate: [{ path: "commentId", populate: "author" },{ path: "author"  }],
    },{
      path:"author"
    }])
    .execPopulate();
  res.json(question);
});

// /**

/**
 * POST NEW QUESTION
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const question = new Question({
        ...req.body,
        author: req.user._id,
      });
      await question.save();
      const user=await User.findById(req.user.id)
      user.questionAsked.unshift(question.id);
    await user.save();
      res.status(201).send(question);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

module.exports = router;
