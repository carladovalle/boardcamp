import connection from "../Database/database.js";
import { gamesSchema } from "../Schemas/gamesValidation.js";

async function getGames (req, res) {
    const games = await connection.query('SELECT * FROM games;');
    res.send(games.rows);
}; 

async function createGames (req, res) {

    const validation = gamesSchema.validate(req.body, {
        abortEarly: false,
    });

    if (validation.error) {
        const errorList = validation.error.details
          .map((err) => err.message)
          .join('\n');
        return res.status(400).send(errorList);
    }

    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {

        /*const hasGame = await connection.query('SELECT * FROM games WHERE name = $1;', [name]);
        if (hasGame) {
            return res.status(409).send("O jogo já existe.")
        }*/

        await connection.query(
            'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', 
                [name, image, stockTotal, categoryId, pricePerDay]
        );

        res.sendStatus(201);
        
    } catch (error) {
        return res.send(error.message);
    }
    
};

export { getGames, createGames };