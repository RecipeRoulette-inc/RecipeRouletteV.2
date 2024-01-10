require("dotenv").config();
const { Pool } = require("pg");

// const pgURL = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;

const pgURL = process.env.PGURL;

const pool = new Pool({
    connectionString: pgURL,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

module.exports = {
    query: async (text, params, callback) => {
        try {
            const result = await pool.query(text, params);
            return result;
        } catch (error) {
            // Customize error messages here
            console.error('Error executing query:', error.message);
            throw error;
        }
    }
};