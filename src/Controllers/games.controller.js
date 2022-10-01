import connection from "../Database/database.js";

async function getGames (req, res) {
    const games = await connection.query('SELECT * FROM games;');
    res.send(games.rows);
}; 

async function createGames (req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    await connection.query(
        'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', 
            [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(201);
};

export { getGames, createGames };