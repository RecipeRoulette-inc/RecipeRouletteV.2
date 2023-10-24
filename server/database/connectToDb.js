require("dotenv").config();
const { Pool } = require("pg");

// const pgURL = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;

const pgURL = process.env.PGURL;

const pool = new Pool({
    connectionString: pgURL,
});

module.exports = {
    query: (text, params, callback) => {
        // console.log('executed query', text);
        return pool.query(text, params, callback);
    }
}