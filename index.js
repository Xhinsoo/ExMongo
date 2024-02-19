const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public"))); //serving static files

app.use(express.urlencoded({ extended: true })); //any form data that comes in from a form or post req, parse it
app.use(methodOverride("_method"));
//taking absolute path to the index.js file and adding public
app.use(express.static(path.join(__dirname, "public")));

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


const category = ["fruit", "vegetable", "dairy", "meat"]


//async cb() for a route, where we await mongoose operations i.e product.Remove , product.find() and waiting for something to come back from mongoose we will do it all the time.
app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category }); //finding all items takes time so we make it async handler for this route and await it.
    res.render("products/index", { products });
  } else {
    const products = await Product.find({}); //finding all items takes time so we make it async handler for this route and await it.
    res.render("products/index", { products });
  }
});

//creating new form for creating new product
app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body); //creating new document
  await newProduct.save(); //saving to MongoDB
  res.redirect("products");
});

//showing details of one comment
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/details", { product });
});

//render edit page and submit patch req
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id); //query DB and find product
  res.render("products/edit", { product , category});
});

//editing, replacing entire object. Therefore, put request instead of patch.
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  if (!price) {
    res.send("enter price");
  } else {
    console.log(price);
    //by default, findByIdAndUpdate will ignore validation, so need to set it to true as 3rd arguments
    //by default, it gives us old result, so need to set "new:true" to get old result
    const product = await Product.findByIdAndUpdate(id, req.body, {
      //passing entire object with req.body
      runValidators: true,
      new: true,
    });
    res.redirect(`/products/${product._id}`);
  }

});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  // console.log(req.body)
  const product = await Product.findByIdAndDelete(id, req.body);
  res.redirect("/products/");
});

app.listen("3000", (req, res) => {
  console.log("listening on port 3000");
});
