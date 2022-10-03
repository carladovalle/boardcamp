import connection from "../Database/database.js";
import { gamesSchema } from "../Schemas/gamesValidation.js";

async function getGames (req, res) {

    try {

        const games = await connection.query(
            `SELECT games.*, 
            categories."name" as "categoryName" 
            FROM games 
            JOIN categories ON games."categoryId" = categories."id"`
        );

        res.send(games.rows);

    } catch (error) {
        return res.send(error.message);
    }

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

        const hasGame = await connection.query('SELECT * FROM games WHERE name = $1;', [name]);
        if (hasGame.rows[0]) {
            return res.status(409).send("O jogo já existe.")
        }

        const categoryExist = await connection.query('SELECT * FROM categories WHERE name = $1;', [name]);
        if (categoryExist.rows.length !== 1) {
            return res.status(409).send("A categoria não existe.")
        }

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