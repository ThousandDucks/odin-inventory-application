const db = require("../db/queries");
require("dotenv").config();

async function getProduct(req, res) {
  const products = await db.getFilteredProducts(req.query);
  const categories = await db.getAllCategories();
  
  res.render("products", {
    products,
    categories,
    filters: req.query
  });
}

async function getProductById(req, res) {
    const id = req.params.id;
    const product = await db.getProductById(id);
    res.render("product-item", { product });
}

async function createProduct(req, res) {
  const categories = await db.getAllCategories();
  res.render("product-create", { categories });
}

async function createProductPost(req, res) {
  try {
    const { name, price, quantity, brand, description, category, src } = req.body;

    await db.createProduct({
      name,
      price,
      quantity,
      brand,
      description,
      category,
      src: src || "/images/cross.svg"
    });

    res.redirect("/products");

  } catch (err) {
    console.error("Error creating product:", err);

    // if error is duplicate key in db
    if (err.code === "23505") {
      const categories = await db.getAllCategories();

      return res.status(400).render("product-create", {
        categories,
        error: "Product name already exists"
      });
    }

    res.status(500).send(err.message);
  }
}


async function editProductGet(req, res) {
  const id = req.params.id;

  const product = await db.getProductById(id);
  const categories = await db.getAllCategories();

  res.render("product-edit", {
    product,
    categories
  });
}

async function editProductPost(req, res) {
  const id = req.params.id;

  const { name, price, quantity, brand, description, category } = req.body;
  console.log(id)
  await db.updateProduct(id, {
    name,
    price,
    quantity,
    brand,
    description,
    category
  });

  res.redirect(`/products/${id}`);
}

async function confirmDeleteGet(req, res) {
  const id = req.params.id;

  res.render("confirm-delete", {
    id,
    type: "product",
    error: null,
    deleteUrl: `/products/${id}/delete`,
    cancelUrl: `/products/${id}`
  });
}

async function deleteProduct(req, res) {
  const id = req.params.id;
  const { password } = req.body;

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  try {
    if (password !== ADMIN_PASSWORD) {
      return res.status(403).render("confirm-delete", {
        id,
        error: "Incorrect password",
        type: "product",
        deleteUrl: `/products/${id}/delete`,
        cancelUrl: `/products/${id}`
      });
    }

    await db.deleteProduct(id);

    res.redirect("/products");

  } catch (err) {
    console.error(err);

    res.status(400).render("confirm-delete", {
      id,
      error: "Cannot delete product",
      type: "product",
      deleteUrl: `/products/${id}/delete`,
      cancelUrl: `/products/${id}`
    });
  }
}

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    createProductPost,
    editProductGet,
    editProductPost,
    confirmDeleteGet,
    deleteProduct
}
