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

    const rental = req.body;

    try {

        await connection.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, null, $5, null);`, [rental.customerId, rental.gameId, today, rental.daysRented, rental.originalPrice]
        );

        res.sendStatus(201);
        
    } catch (error) {
        return res.send(error.message);
    }
    
};

export { getRentals, createRentals };