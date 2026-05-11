const db = require("../db/queries");
require("dotenv").config();

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    // console.log(categories)
    res.render("categories", { categories });
}

async function deleteCategory(req, res) {
    const id = req.params.id;
    const { password } = req.body;

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    try {
        if (password !== ADMIN_PASSWORD) {
            return res.status(403).render("confirm-delete", {
                id,
                error: "Incorrect password",
                type: "category",
                deleteUrl: `/categories/${id}/delete`,
                cancelUrl: `/categories`
            });
        }
        await db.deleteCategory(id);
        res.redirect("/categories");
    } catch (err) {
        console.error("Delete error:", err);
        res.status(400).render("confirm-delete", {
            id,
            error: "Cannot delete category",
            type: "category",
            deleteUrl: `/categories/${id}/delete`,
            cancelUrl: `/categories`
        });
    }
}

async function createCategoryGet(req, res) {
    res.render("category-create");
}

async function createCategoryPost(req, res) {
    const { category, image } = req.body;

    await db.createCategory({
        category,
        image: image || "/images/cross.svg"
    });

    res.redirect("/categories");
}

async function confirmDeleteGet(req, res) {
    const id = req.params.id;

    res.render("confirm-delete", {
        id,
        type: "category",
        error: null,
        deleteUrl: `/categories/${id}/delete`,
        cancelUrl: `/categories`
    });
}

module.exports = { 
    getAllCategories,
    deleteCategory,
    createCategoryGet,
    createCategoryPost,
    confirmDeleteGet
}