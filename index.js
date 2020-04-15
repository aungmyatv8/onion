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

const admin = require("./routes/admin");
const customer = require("./routes/customer");

// const customer =

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/start", async (req, res) => {
  try {
    const userId = req.body["messenger user id"];

    if (userId == "2894754003949265") {
      res.json({
        redirect_to_blocks: ["admin"],
      });
    } else {
      res.json({
        redirect_to_blocks: ["customer"],
      });
    }
  } catch (e) {}
});

app.use("/admin", admin);
app.use("/customer", customer);

app.listen(port, () => {
  console.log(`server is listening`);
});
