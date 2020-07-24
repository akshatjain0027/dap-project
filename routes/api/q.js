const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load  model
const User = require("../../models/user");
const Question = require("../../models/question");
const Answer = require("../../models/answer");
const Comment = require('../../models/comment');
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

/**
 * PUT UPDATE/edit QUESTION
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
    const data = {
      question:req.body.question
    }
      
      const question=await Question.findByIdAndUpdate(req.params.id,{$set: data},{new:true})
      
      res.status(200).send(question);
    } catch (e) {
     
      res.status(400).send(e);
    }
  }
);

/**
 * Delete QUESTION
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
    //Check for user auth
    if (question.author.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ notauthorized: "User not authorized" });
    }

// const user=User.findById(req.user.id)
// user.questionAsked.splice(user.questionAsked.map(item => item.toString()).indexOf(req.params.id), 1);

//user.answerGiven
/// ___----------> already done below updateMany()
// const removeIndex = user.bookmark.question.map(item => item.toString()).indexOf(req.params.id);
// if(removeIndex!==-1){
//   user.bookmark.question.splice(removeIndex, 1);
// }

//user.bookmark.answer
    await User.updateMany({answerGiven:{$in:question.answerId}},{$pull:{answerGiven:question.answerId}})
    await User.updateOne({_id:req.user.id},{$pullAll:{questionAsked:[question._id]}})
    await User.updateMany({'bookmarked.question':{$in:question._id}},{$pull:{'bookmarked.question':question._id}})
    await User.updateMany({'bookmarked.answer':{$in:question.answerId}},{$pull:{'bookmarked.answer':question.answerId}})

    const answerIdArray=question.answerId;

    await question.populate('answerId').execPopulate()
    const a=question.answerId
    const newarr=[]
    a.forEach(  element => {
      
      newarr.push(element.commentId)
    });
    const commentIdArray=newarr.flat(1);    

    await Comment.deleteMany({_id:{$in:commentIdArray}})
    await Answer.deleteMany({_id:{$in:answerIdArray}})
    await Question.deleteOne({_id:req.params.id}) 
    
      res.json({success:true});
    } catch (e) {
      console.log(e)
      res.status(400).send(e);
    }
  }
);


module.exports = router;
