const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../../validators/register");
const validateLoginInput = require("../../validators/login");

//Load User model
const User = require("../../models/user");

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => {
	res.json({
		msg: "users works",
	});
});

// @route   POST api/users/register
// @desc    Register User
// @access  Public
// try catch incomplete
router.post("/register", async (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then(async (user) => {
		if (user) {
			errors.email = "Email already exists";
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar: req.body.avatar,
				password: req.body.password,
			});
			const hash = await bcrypt.hash(newUser.password, 10);
			newUser.password = hash;
			const user = await newUser.save();

			const payload = {
				id: user.id,
				name: user.name,
				avatar: user.avatar,
			}; //Create JWT payload

			//Sign Token
			const token = await jwt.sign(payload, keys.secretOrKey, {
				expiresIn: 43200,
			});
			res.json({
				success: true,
				token: "Bearer " + token,
			});
		}
	});
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	console.log(req.body);
	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	//find user by email
	User.findOne({ email: email }).then((user) => {
		if (!user) {
			errors.email = "User not found";
			return res.status(404).json(errors);
		}
		//Check Password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				//User match
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar,
				}; //Create JWT payload

				//Sign Token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 43200 },
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token,
						});
					}
				);
			} else {
				errors.password = "Password Incorrect";
				return res.status(400).json(errors);
			}
		});
	});
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
		});
	}
);

// @route   GET api/user/q
// @desc    Return questions asked by user
// @access  Private
router.get(
	"/q",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {

		const user=await User.findById(req.user.id);
		const questions=await user.questionAsked.populate('question').sort();
		res.json(questions);
	}
);

// @route   GET api/user/a
// @desc    Return answer given by user
// @access  Private
router.get(
	"/a",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {

		const user=await User.findById(req.user.id);
		const answers=await user.answerGiven.populate('answer').sort();
		res.json(answers);
	}
);


// @route   POST api/user/bookmark/:id
// @desc
// @access  Private
router.post(
	"/bookmark/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const type = req.body.type;
		const user = await User.findById(req.user.id);

		if (type === "question") {
			const quesId = req.params.id;
			if (
				user.bookmarked.question.filter(
					(question) => question.toString() === quesId
				).length > 0
			) {
				return res.status(404).json({
					alreadybookmard:
						"User already bookmarked this ques , Please Be attentive !!!",
				});
			}

			user.bookmarked.question.unshift(quesId);
		}
		if (type === "answer") {
			const ansId = req.params.id;
			if (
				user.bookmarked.answer.filter(
					(answer) => answer.toString() === ansId
				).length > 0
			) {
				return res.status(404).json({
					alreadybookmard:
						"User already bookmarked this ans , Please Be attentive !!!",
				});
			}

			user.bookmarked.answer.unshift(ansId);
		}
		console.log(type);
		const user2 = await user.save();
		res.status(201).json(user2);
	}
);

// @route   POST api/user/unbookmark/:id
// @desc
// @access  Private
router.post(
	"/unbookmark/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {

		const user = await User.findById(req.user.id);
		const type = req.body.type;

		if (type === "question") {
			const quesId = req.params.id;

			if (
				user.bookmarked.question.filter(
					(question) => question.toString() === quesId
				).length === 0
			) {
				return res.status(404).json({
					alreadybookmard: "Not  bookmarked Yet  , Please Be attentive !!!",
				});
			}
			const removeIndex = user.bookmarked.question
				.map((item) => item.toString())
				.indexOf(req.user.id);

			//Splice out of array
			user.bookmarked.question.splice(removeIndex, 1);
		}

		if (type === "answer") {
			const ansId = req.params.id;

			if (
				user.bookmarked.answer.filter(
					(answer) => answer.toString() === ansId
				).length === 0
			) {
				return res.status(404).json({
					alreadybookmard: "Not  bookmarked Yet  , Please Be attentive !!!",
				});
			}
			const removeIndex = user.bookmarked.answer
				.map((item) => item.toString())
				.indexOf(req.user.id);

			//Splice out of array
			user.bookmarked.answer.splice(removeIndex, 1);
		}

		console.log(type);
		const user2 = await user.save();
		res.status(201).json(user2);
	}
);

module.exports = router;
