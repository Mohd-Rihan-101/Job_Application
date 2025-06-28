const express = require("express");
const app = express();
require("./db");
const bodyParser = require('body-parser');
app.use(bodyParser.json())

const jobRouter = require("./routes/jobRouter");
app.use("/job", jobRouter);

app.get("/", (req, res) => {
  console.log("Welcome to our Website");
});

app.listen(6000, () => {
  console.log("Server listening on PORT 6000");
});
