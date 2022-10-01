import express from "express";
import cors from "cors";
import connection from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/categories', async (req, res) => {
    const categories = await connection.query('SELECT * FROM categories;');
    res.send(categories.rows);
});

app.post('/categories', async (req, res) => {
    const { name } = req.body;

    await connection.query(
        'INSERT INTO categories (name) VALUES ($1);', [name]
    );

    res.sendStatus(201);
});

app.get('/games', async (req, res) => {
    const games = await connection.query('SELECT * FROM games;');
    res.send(games.rows);
}); 

app.post('/games', async (req, res) => {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    await connection.query(
        'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', 
            [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(201);
});

app.get('/customers', async (req, res) => {
    const customers = await connection.query('SELECT * FROM customers;');
    res.send(customers.rows);
}); 

app.get('/customers/:id', async (req, res) => {
    const { id } = req.params;
    const customers = await connection.query('SELECT * FROM customers WHERE id = $1;',
    [id]);
    res.send(customers.rows);
}); 

app.post('/customers', async (req, res) => {
    const { name, phone, cpf, birthday } = req.body;

    await connection.query(
        'INSERT INTO customers (name, "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4);', 
            [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
});

app.listen(4000, () => {
    console.log("Servidor rodando.")}
);