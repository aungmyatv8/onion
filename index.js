const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// const customer =

app.use(express.json());

app.post("/start", async (req, res) => {
  try {
    console.log("this start", req.body["messenger user id"]);
    console.log(req.body);
  } catch (e) {}
});

app.listen(port, () => {
  console.log(`server is listening`);
});
