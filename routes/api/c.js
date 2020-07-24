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
 * GET COMMENTS of particular answer id
 */
router.get(
  "/:id",
  passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const comments = await Comment.find({ answerId: req.params.id })
        .populate("author")
        .sort();
      res.status(201).send(comments);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);


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

/**
 * PUT UPDATE/edit Comments
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
    const data = {
      content:req.body.content
    }
      
      const comment=await Comment.findByIdAndUpdate(req.params.id,{$set: data},{new:true})
      
      res.status(200).send(comment);
    } catch (e) {
     
      res.status(400).send(e);
    }
  }
);


/**
 * DELETE delete Comment
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const answer=await Answer.findById(comment.answerId);
        
        const removeIndex = answer.commentId.map(item => item.toString()).indexOf(req.params.id);      
        answer.commentId.splice(removeIndex, 1);
      
          await answer.save()
          await comment.remove()    
      res.status(200).send({success:true});
    } catch (e) {
     console.log(e)
      res.status(400).send(e);
    }
  }
);
module.exports = router;