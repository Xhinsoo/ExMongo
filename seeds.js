const mongoose = require("mongoose");
const Product = require("./models/product");
const path = require("path");
//this file is not connected to webapp, no server and express. This is a file i will run on its own, anytime i want new data on DB. This is common habit during development.

//require module and mongoose


//connect to mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("connection open");
  })
  .catch((e) => {
    console.log("error is:", e);
  });

// const p = new Product({
//   name: "Ruby Grapefruit",
//   price: 1.99,
//   category: "fruit",
// });

// p.save()
//   .then((p) => console.log(p))
//   .catch((e) => console.log(e));

const seedProducts = [
  {
    name: "Ruby Grapefruit",
    price: 1.99,
    category: "fruit",
  },
  {
    name: "Melon",
    price: 2.99,
    category: "fruit",
  },
  { name: "Celery", price: 1.5, category: "vegetable" },
  {
    name: "Organic mini",
    price: 3.99,
    category: "vegetable",
  },
];

//mongoose validates all data before inserting to product, if one fail, nothing will be inserted.
Product.insertMany(seedProducts) //passing array to insertMany() method returns a query obj thenable object, so we can chain then
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
