const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Product = require('./models/product')

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("connection open");
  })
  .catch((e) => {
    console.log("error is:", e);
  });

app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");

app.get("/index", (req, res) => {
  res.render("index");
});

app.listen("3000", (req, res) => {
  console.log("listening on port 3000");
});
