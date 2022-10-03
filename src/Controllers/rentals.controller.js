import connection from "../Database/database.js";
import dayjs from 'dayjs';

async function getRentals (req, res) {

    const arrObj = [];

    try {
        
        const rentals = await connection.query(
            `SELECT rentals.*,
            customers.name AS "customersName"
            games.*
            FROM rentals
            JOIN customers ON rentals."customerId" = customers."id"
            JOIN games ON rentals."gameId" = games."id";`
        );

        rentals.rows.forEach(el => {
            const obj = {
                id: el.id,
                customerId: el.customerId,
                gameId: el.gameId,
                rentDate: el.rentDate,
                daysRented: el.daysRented,
                returnDate: el.returnDate, 
                originalPrice: el.originalPrice,
                delayFee: el.delayFee,
                customer: {
                    id: el.customerId,
                    name: el.customersName
                    },
                game: {
                    id: el.gameId,
                    name: el.name,
                    categoryId: el.categoryId,
                    categoryName: el.cate
                    }
                }
                arrObj.push(obj);
            })

        res.send(arrObj);

    } catch (error) {
        return res.send(error.message);
    }

}; 

async function createRentals (req, res) {

    const today = dayjs().format('YYYY-MM-DD');

    const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee } = req.body;

    try {

        const game = await db.query(`
        SELECT * FROM games
        WHERE id = $1;
        `,[gameId]);

        const customers = await db.query(`
        SELECT * FROM customers
        WHERE id = $1;
        `,[customerId]);

        if (game.rows.length === 0 || customers.rows.length === 0){
            return res.sendStatus(400);
        }

        const price = game.rows[0].pricePerDay;

        if (daysRented < 0) {
            return res.sendStatus(400);
        }

        await connection.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, null, $5, null);`, [customerId, gameId, today, daysRented, (parseInt(price) * parseInt(rental.daysRented))]
        );

        res.sendStatus(201);
        
    } catch (error) {
        return res.send(error.message);
    }
    
};

async function deleteRentals (req, res) {

    const { id } = req.params;

    try {

        await db.query(`DELETE FROM rentals WHERE "id" = $1`, [id]);

        return res.sendStatus(200);

    } catch (error) {
        return res.send(error.message);
    }

}

export { getRentals, createRentals, deleteRentals };