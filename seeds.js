const mongoose = require("mongoose");
const Product = require("./models/product");
const path = require("path");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("connection open");
  })
  .catch((e) => {
    console.log("error is:", e);
  });

const p = new Product({
  name: "Ruby Grapefruit",
  price: 1.99,
  category: "fruit",
});

p.save()
  .then((p) => console.log(p))
  .catch((e) => console.log(e));
