const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.route("/").get(categoryController.getAllCategories);

router.get("/new", categoryController.createCategoryGet);
router.post("/new", categoryController.createCategoryPost);

router.post("/:id/delete", categoryController.deleteCategory);
router.get("/:id/confirm-delete", categoryController.confirmDeleteGet);


module.exports = router;