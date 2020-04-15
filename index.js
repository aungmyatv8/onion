const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://soe:soe123@cluster0-4dbbs.mongodb.net/onions", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  });

// const customer =

app.use(express.json());

app.post("/start", async (req, res) => {
  try {
    const userId = req.body["messenger user id"];
    console.log(userId);
    if (userId == "2894754003949265") {
      console.log("this done");
      res.json({
        redirect_to_blocks: ["Get Start"],
      });
    } else {
    }
  } catch (e) {}
});

app.listen(port, () => {
  console.log(`server is listening`);
});
