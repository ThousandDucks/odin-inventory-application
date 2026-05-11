const pool = require("./pool");

async function getAllProducts() {
    const { rows } = await pool.query("SELECT * FROM inventory");
    return rows;
}

async function getAllCategories() {
    const { rows } = await pool.query(
        `SELECT
            categories.id,
            categories.category,
            categories.image,
            count(inventory.id)::int as product_count
        FROM categories
        LEFT JOIN inventory
        ON categories.id = inventory.category_id
        GROUP BY categories.id
        ORDER BY categories.category;
        `);
    return rows;
}

async function getProductById(id) {
    const { rows } = await pool.query(
        `SELECT 
            inventory.*,
            categories.category,
            categories.image AS category_image
        FROM inventory
        JOIN categories ON inventory.category_id = categories.id
        WHERE inventory.id = $1`,
        [id]
    );

    return rows[0];
}

async function getFilteredProducts(filters) {
    let query = "SELECT * FROM inventory";
    const values = [];

    // Category filter
    if (filters.category) {
        const categories = Array.isArray(filters.category)
            ? filters.category
            : [filters.category];

        query += " WHERE category_id = ANY($1)";
        values.push(categories);
    }

    // Price and Stock sorting
    if (filters.sort === "price_asc") {
        query += " ORDER BY price ASC";
    }

    else if (filters.sort === "price_desc") {
        query += " ORDER BY price DESC";
    }

    else if (filters.sort === "stock_asc") {
        query += " ORDER BY quantity ASC";
    }

    else if (filters.sort === "stock_desc") {
        query += " ORDER BY quantity DESC";
    }

    const { rows } = await pool.query(query, values);
    return rows;
}

async function createProduct(product) {
    const { name, price, quantity, brand, description, category, src } = product;

    await pool.query(
        `INSERT INTO inventory
        (name, price, quantity, brand, description, category_id, src )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)`,
        [name, price, quantity, brand, description, category, src ]
    );
}

async function deleteProduct(id) {
    await pool.query(
        `DELETE FROM inventory WHERE id = $1`,
        [id]
    );
}

async function updateProduct(id, product) {
    const { name, price, quantity, brand, description, category } = product;

    await pool.query(
        `UPDATE inventory
            SET name = $1,
                price = $2,
                quantity = $3,
                brand = $4,
                description = $5,
                category_id = $6
            WHERE id = $7`,
        [name, price, quantity, brand, description, category, id]
    );
}

async function deleteCategory(id) {
    const count = await getProductCountByCategory(id);

    if (count > 0) {
    throw new Error("Cannot delete category with products");
    }

    await pool.query(
        "DELETE FROM categories WHERE id = $1",
        [id]
    );
}

async function getProductCountByCategory(id) {
    const { rows } = await pool.query(
        "SELECT COUNT(*)::int FROM inventory WHERE category_id = $1",
        [id]
    );

    return rows[0].count;
}

async function createCategory({ category, image }) {
    await pool.query(
        `INSERT INTO categories (category, image)
            VALUES ($1, $2)`,
        [category, image]
    );
}

module.exports = {
    getAllProducts,
    getAllCategories,
    getProductById,
    getFilteredProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    createCategory,
    deleteCategory
};