const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.route("/").get(productController.getProduct);
router.route("/new").get(productController.createProduct);

router.post("/", productController.createProductPost);

router.get("/:id", productController.getProductById);

router.get("/:id/edit", productController.editProductGet);
router.post("/:id/edit", productController.editProductPost);

router.post("/:id/delete", productController.deleteProduct);

router.get("/:id/confirm-delete", productController.confirmDeleteGet);


module.exports = router;