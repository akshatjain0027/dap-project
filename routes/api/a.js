const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load  model
const User = require('../../models/user');
const Question = require('../../models/question');
const Answer = require('../../models/answer');
const Comment = require('../../models/comment');


/**
 * GET ALL THE ANSWERS IN DB
 */
router.get("/", async (req, res) => {
    const answer = await Answer.find();
    if (!answer) return res.status(400).json({ noansfound: "No ans found" });
  
    res.json(answer);
  });


/**
 * POST answer OF Given question id
 */
router.post("/:id", passport.authenticate('jwt', { session: false }),async (req, res) => {
  try {
    const answer = new Answer({
      ...req.body,
      questionId: req.params.id,
      author: req.user._id,
    });
    const ans=await answer.save();
    
    const question = await Question.findById(req.params.id);
    question.answerId.unshift(answer._id);
    await question.save();
    
    const user=await User.findById(req.user.id)
      user.answerGiven.unshift(ans.id);
    await user.save();

    res.status(201).send(await question.populate('answerId').execPopulate());
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * PUT UPDATE/edit answer
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
    const data = {
      title:req.body.title,
      answer:req.body.answer,
      image:req.body.image
    }
      
      const answer=await Answer.findByIdAndUpdate(req.params.id,{$set: data},{new:true})
      
      res.status(200).send(answer);
    } catch (e) {
     
      res.status(400).send(e);
    }
  }
);

/**
 * DELETE delete Answer
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id)
        const question=await Question.findById(answer.questionId);
        
        const removeIndex = question.answerId.map(item => item.toString()).indexOf(req.params.id);      
        question.answerId.splice(removeIndex, 1);
      

        await Comment.deleteMany({_id:{$in:answer.commentId}})

          await question.save()

          await answer.remove()    
      res.status(200).send({success:true});
    } catch (e) {
     console.log(e)
      res.status(400).send(e);
    }
  }
);


// @route   POST api/a/upvote/:id
// @desc    Upvote answer
// @access  Private

router.post(
  "/upvote/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Answer.findById(req.params.id)
        .then(async answer => {
          if (
            answer.upVote.filter(upvote => upvote.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(404)
              .json({ alreadyupvoted: "User already upvoted this ans" });
          }

          //add user id to likes array
          answer.upVote.unshift({ user: req.user.id });

          const ans = await (await answer.save()).populate('author').execPopulate()
          res.status(201).json(ans);
        })
        .catch(err => res.status(404).json({ ansnofound: "No ans found" }));
    });
  }
);

// @route   POST api/a/unupvote/:id
// @desc    un upvote
// @access  Private

router.post(
  "/unupvote/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Answer.findById(req.params.id)
        .then(async answer => {
          if (
            answer.upVote.filter(upvote => upvote.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(404)
              .json({ notupvoted: "You have not yet upvoted" });
          }
          //Get remove index
          const removeIndex = answer.upVote
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out of array
          answer.upVote.splice(removeIndex, 1);

          //save
          const ans = await (await answer.save()).populate('author').execPopulate()
          res.status(201).json(ans);
        })
        .catch(err => res.status(404).json({ ansnofound: "No ans found" }));
    });
  }
);

module.exports = router;
