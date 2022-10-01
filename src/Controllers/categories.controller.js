import connection from "../Database/database.js";

async function getCategories (req, res) {
    const categories = await connection.query('SELECT * FROM categories;');
    res.send(categories.rows);
};

async function createCategories (req, res) {
    const { name } = req.body;

    await connection.query(
        'INSERT INTO categories (name) VALUES ($1);', [name]
    );

    res.sendStatus(201);
};

export { getCategories, createCategories };