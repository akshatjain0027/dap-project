const express = require("express");
const app = express();
require('./db/config');
const port = process.env.PORT || 3000;

const userRoutes = require('./routes/user');

app.use(express.json());

app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("This is ROOT PAGE");
});


app.get("/json", (req, res) => {
    res.send({
        "name":"pk",
        "age":"45"
    });
  })

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
