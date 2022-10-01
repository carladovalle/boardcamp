import connection from "../Database/database.js";

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
    const { name, phone, cpf, birthday } = req.body;

    await connection.query(
        'INSERT INTO customers (name, "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4);', 
            [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
};

async function updateCustomers (req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    await connection.query(
        `UPDATE customers SET ("name", "phone", "cpf", "birthday") = ('${name}', '${phone}', '${cpf}', '${birthday}') WHERE id = $1;`, [id]
    );

    res.sendStatus(200);
};

export { getCustomers, viewCustomers, createCustomers, updateCustomers };