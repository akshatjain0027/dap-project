const express = require('express');
const router = express.Router();


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
 * POST ANSWER OF A QUEST ID
 */
router.post("/:id", async (req, res) => {
    try {
      console.log(req.body);
      const answer = new Answer({
        ...req.body,
        questionId: req.params.id,
        //author: req.user._id,
      });
      console.log(await answer.save());
  
      const question = await Question.findById(req.params.id);
      question.answerId.unshift(answer._id);
      await question.save();
  
      res.status(201).send(answer);
    } catch (e) {
      res.status(400).send(e);
    }
  });


module.exports = router;