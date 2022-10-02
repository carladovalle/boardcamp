import connection from "../Database/database.js";
import { customersSchema } from "../Schemas/customersValidation.js";

async function getCustomers (req, res) {
    const customers = await connection.query('SELECT * FROM customers;');
    res.send(customers.rows);
}; 

async function viewCustomers (req, res) {
    const { id } = req.params;
    const customers = await connection.query('SELECT * FROM customers WHERE id = $1;',
    [id]);
    res.send(customers.rows);
}; 

async function createCustomers (req, res) {

    const validation = customersSchema.validate(req.body, {
        abortEarly: false,
    });

    if (validation.error) {
        const errorList = validation.error.details
          .map((err) => err.message)
          .join('\n');
        return res.status(400).send(errorList);
    }

    const { name, phone, cpf, birthday } = req.body;

    try {

        await connection.query(
            'INSERT INTO customers (name, "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4);', 
                [name, phone, cpf, birthday]
        );
    
        res.sendStatus(201);

    } catch (error) {
        return res.send(error.message);
    }

};

async function updateCustomers (req, res) {

    const validation = customersSchema.validate(req.body, {
        abortEarly: false,
    });

    if (validation.error) {
        const errorList = validation.error.details
          .map((err) => err.message)
          .join('\n');
        return res.status(400).send(errorList);
    }

    const { name, phone, cpf, birthday } = req.body;

    const { id } = req.params;

    try {

        await connection.query(
            `UPDATE customers SET ("name", "phone", "cpf", "birthday") = ('${name}', '${phone}', '${cpf}', '${birthday}') WHERE id = $1;`, [id]
        );
    
        res.sendStatus(200);

    } catch (error) {
        return res.send(error.message);
    }

};

export { getCustomers, viewCustomers, createCustomers, updateCustomers };