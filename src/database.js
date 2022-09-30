import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

/*const connection = new Pool({
    user: 'postgres',
    password: '401148',
    host: 'localhost',
    port: 5432,
    database: 'boardcamp'
  }); */

export default connection;