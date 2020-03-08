const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post("/user", async(req, res) => {

    console.log(req.body);
var x = await User.create(req.body);
console.log(x);
res.send("Done yehh");

});

router.get("/user", async(req, res) => {

    console.log(req.body);
var x = await User.read();
console.log(x[0]);
res.send(x[0]);

});

module.exports = router;

