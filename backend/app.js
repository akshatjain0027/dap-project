const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("This is ROOT PAGE");
});

app.get("/home", (req, res) => {
  res.send("This is HOME PAGE");
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
