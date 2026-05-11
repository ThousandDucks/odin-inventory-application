const express = require("express");
const router = express.Router();
const db = require("../db/queries");

router.route("/").get(async (req, res) => {
  try {
    const products = await db.getAllProducts();
    const categories = await db.getAllCategories();

    res.render("index", {
      productCount: products.length,
      categoryCount: categories.length,
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;