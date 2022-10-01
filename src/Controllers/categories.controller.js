import connection from "../Database/database.js";
import { categoriesSchema } from "../Schemas/categoriesValidation.js";

async function getCategories (req, res) {
    const categories = await connection.query('SELECT * FROM categories;');
    res.send(categories.rows);
};

async function createCategories (req, res) {

    const validation = categoriesSchema.validate(req.body, {
        abortEarly: false,
    });

    if (validation.error) {
        const errorList = validation.error.details
          .map((err) => err.message)
          .join('\n');
        return res.status(400).send(errorList);
    }

    const { name } = req.body;

    try {

        const hasCategory = await connection.query('SELECT * FROM categories WHERE name = $1;', [name]);
        if (hasCategory) {
            return res.status(409).send("A categoria já existe.")
        }

        await connection.query(
            'INSERT INTO categories (name) VALUES ($1);', [name]
        );

        res.sendStatus(201);
        
    } catch (error) {
        return res.send(error.message);
    }

};

export { getCategories, createCategories };