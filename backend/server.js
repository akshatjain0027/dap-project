const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const user = require("./routes/api/user");
const q = require("./routes/api/q"); //Question
const a = require("./routes/api/a"); //Answer
const notify  = require("./routes/api/notify");  //Telegram

//cors
const cors = require("cors");

const app = express();

//Cors Middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(error));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//Use Routes
app.use("/api/user", user);
app.use("/api/q", q);
app.use("/api/a", a);
app.use("/api/notify", notify);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});