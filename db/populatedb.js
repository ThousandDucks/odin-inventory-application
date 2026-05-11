const { Client } = require("pg");
require("dotenv").config();

const dropTables = `DROP TABLE IF EXISTS inventory;
                    DROP TABLE IF EXISTS categories;`;

const createCategoriesTable = `CREATE TABLE IF NOT EXISTS categories ( 
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    category VARCHAR(50) UNIQUE, 
    image TEXT DEFAULT '/images/cross.svg')
    `;

const createCategories = `INSERT INTO categories (category, image) 
    VALUES 
    ('Drinks', '/images/cola.svg'),
    ('Bakery', '/images/bread.svg'), 
    ('Dairy', '/images/milk.svg'), 
    ('Snacks', '/images/lollipop.svg'), 
    ('Vegetable and Fruits', '/images/apple.svg'),
    ('Uncategorised', '/images/cross.svg');
    `;

const createSQLTable = `CREATE TABLE IF NOT EXISTS inventory ( 
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    name VARCHAR(50) UNIQUE, 
    category_id INTEGER, 
    quantity INTEGER, 
    price DECIMAL(5, 2), 
    brand VARCHAR(50), 
    src TEXT DEFAULT '/images/cross.svg', 
    description VARCHAR(200) 
    );
    `;

const createSQLData = `INSERT INTO inventory (
    name,
    category_id,
    quantity,
    price,
    brand,
    src,
    description) 
    VALUES
    ('Apple', 5, 10, 1.50, 'Granny Smith', '/images/apple.svg', 'Fresh, crisp apple with a sweet flavour, perfect for snacking or baking.'),
    ('Carrot', 5, 20, 0.80, 'Nature''s Promise', '/images/carrot.svg', 'Fresh, crunchy carrot with a naturally sweet flavour.'),
    ('Strawberry', 5, 15, 1.20, 'Nature''s Promise', '/images/stawberry.svg', 'Sweet and juicy strawberry with a fresh, vibrant flavour.'),
    ('Orange juice', 1, 30, 1.20, 'Citrus Valley', '/images/orange-juice.svg', 'Freshly squeezed orange juice made from ripe, juicy oranges. Naturally sweet and refreshing, perfect for breakfast or a healthy boost.'),
    ('Cola', 1, 50, 1.00, 'FizzyPeak Beverages', '/images/cola.svg', 'A bold and refreshing cola with a smooth caramel sweetness and a crisp, fizzy finish.'),
    ('Cheese', 3, 20, 3.00, 'Dairy Co.', '/images/cheese.svg', 'A rich and creamy range of artisan cheeses made from locally sourced milk.'),
    ('Ice cream', 3, 30, 1.20, 'Frostberry Creamery', '/images/ice-cream.svg', 'A smooth and indulgent range of premium ice cream made with rich cream and natural flavours.'),
    ('Candy cane', 4, 10, 0.50, 'Peppermint Hollow Confections', '/images/candy-cane.svg', 'Classic candy canes crafted with a crisp peppermint flavour and a satisfying crunch.'),
    ('Lollipop', 4, 20, 0.30, 'SweetLoop Confectionery', '/images/lollipop.svg', 'A colourful range of sweet, fruity lollipops bursting with bold flavours.'),
    ('Bread', 2, 100, 1.10, 'Golden Crust Bakery Co.', '/images/bread.svg', 'Freshly baked bread with a soft, fluffy interior and a golden, crispy crust.'),
    ('Milk', 3, 10, 1.20, 'Dairy Co.', '/images/milk.svg', 'Fresh semi-skimmed milk with a smooth, creamy taste.');
    `;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
    });
  await client.connect();
  console.log("Connected to database.")

  await client.query(dropTables);
  await client.query(createCategoriesTable);
  await client.query(createSQLTable);
  console.log("Tables created.")

  await client.query(createCategories);
  await client.query(createSQLData);
  console.log("Data created.")

  await client.end();
  console.log("Done.");
}

main();