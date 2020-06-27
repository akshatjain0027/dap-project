const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load  model
const User = require('../../models/user');
const Question = require('../../models/question');
const Answer = require('../../models/answer');
const Comment = require('../../models/comment');


/**
 * GET ALL THE Comments IN DB
 */
router.get("/", async (req, res) => {
    const comment = await Comment.find();
    if (!comment) return res.status(400).json({ nocommentfound: "No comment found" });
  
    res.json(comment);
  });


  /**
 * POST Comment  OF A Ans id
 */
router.post("/:id", passport.authenticate('jwt', { session: false }),async (req, res) => {
    try {
      const comment = new Comment({
        content:req.body.content,
        answerId: req.params.id,
        author: req.user._id,
      });
      await comment.save();
      const answer = await Answer.findById(req.params.id);
      answer.commentId.unshift(comment._id);
      await answer.save();
  
      res.status(201).send(await answer.populate('commentId').execPopulate());
    } catch (e) {
      res.status(400).send(e);
    }
  });



module.exports = router;