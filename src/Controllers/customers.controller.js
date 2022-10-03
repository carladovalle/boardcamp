import connection from "../Database/database.js";
import { customersSchema } from "../Schemas/customersValidation.js";

async function getCustomers (req, res) {

    const {cpf} = req.query;

    if (cpf) {

        try {

            const customers = await connection.query(`SELECT * FROM customers WHERE "cpf" LIKE $1`,[cpf + '%']);
    
            return res.send(customers.rows);
    
        } catch (error) {
            return res.send(error.message);
        }

    }

    try {

        const customers = await connection.query(`SELECT * FROM customers`);

        res.send(customers.rows);

    } catch (error) {
        return res.send(error.message);
    }

}; 

async function viewCustomers (req, res) {

    const { id } = req.params;

    if (id) {

        try {

            const customers = await connection.query(
                'SELECT * FROM customers WHERE id = $1;',
            [id]);

            if (customers.rows[0].length !== 0) {
                return res.send(customers.rows[0])
            }
    
            return res.sendStatus(404);
    
        } catch (error) {
            return res.send(error.message);
        }

    } else {
        return res.status(404).status('ID nulo');
    }

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

        const hasCPF = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);
        if (hasCPF.rows[0]) {
            return res.status(409).send("O cpf já está sendo usado.")
        }

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

        const hasCPF = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [cpf]);
        if (hasCPF.rows[0]) {
            return res.status(409).send("O cpf já está sendo usado.")
        }

        await connection.query(
            `UPDATE customers SET ("name", "phone", "cpf", "birthday") = ('${name}', '${phone}', '${cpf}', '${birthday}') WHERE id = $1;`, [id]
        );
    
        res.sendStatus(200);

    } catch (error) {
        return res.send(error.message);
    }

};

export { getCustomers, viewCustomers, createCustomers, updateCustomers };