const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const route = require("./route/route");

let app = express();
app.use(express.json());
app.use(multer().any())


mongoose
  .connect(
    "mongodb+srv://shyamgupta:.T!8NRrzf6FyMYc@cluster0.dbdyccj.mongodb.net/travelApp"
  )
  .then(() => {
    console.log("MONGO db is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });


app.use("/", route);
app.listen(5000, (err) => {
  if (err) return console.log(err.message);
  console.log("Application running on PORT :5000");
});
