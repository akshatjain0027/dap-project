const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load  model
const User = require('../../models/user');
const Question = require('../../models/question');
const Answer = require('../../models/answer');


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
    await answer.save();
    
    const question = await Question.findById(req.params.id);
    question.answerId.unshift(answer._id);
    await question.save();
    

    res.status(201).send(await question.populate('answerId').execPopulate());
  } catch (e) {
    res.status(400).send(e);
  }
});


module.exports = router;