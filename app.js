const express = require("express");
const app = express();
const path = require("node:path");

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});