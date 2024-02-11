const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true })); //any form data that comes in from a form or post req, parse it
app.use(methodOverride("_method"));

const Product = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("connection open");
  })
  .catch((e) => {
    console.log("error is:", e);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//async cb() for a route, where we await mongoose operations i.e product.Remove , product.find() and waiting for something to come back from mongoose we will do it all the time.
app.get("/products", async (req, res) => {
  const products = await Product.find({}); //finding all items takes time so we make it async handler for this route and await it.
  res.render("products/index", { products });
});
//showing details of one product
app.get("/products/:id", async (req, res) => {
  const products = await Product.find({});
  const { id } = req.params;
  const findProduct = products.find((p) => p.id === id);
  res.render("products/details", { findProduct });
});

//render edit page and submit patch req
app.get("/products/:id/edit", async (req, res) => {
  const products = await Product.find({});
  const { id } = req.params;
  const findProduct = products.find((p) => p.id === id);
  res.render("products/edit", { findProduct });
});

//editing one comment
app.patch("/products/:id", async (req, res) => {
  const products = await Product.find({});
  const { id } = req.params;
  let findProduct = products.find((p) => p.id === id);
  const newName = req.body.name;
  findProduct.name = newName
  console.log(findProduct)
  res.render("products/details", {findProduct})
});

app.listen("3000", (req, res) => {
  console.log("listening on port 3000");
});
