import express from "express";
import cors from "cors";
import connection from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/categories', async (req, res) => {
    const categories = await connection.query('select * from categories');
    res.send(categories.rows);
});

app.post('/categories', (req, res) => {
    const { name } = req.body;

    connection.query(
        'INSERT INTO categories (name) VALUES ($1);', [name]
    );

    res.send('ok').status(201);
});

app.listen(4000, () => {
    console.log("Servidor rodando.")}
);