const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool(
    {
        user: process.env.DB_USER, // e.g. 'my-user'
        password: process.env.DB_PASS, // e.g. 'my-user-password'
        database: process.env.DB_NAME, // e.g. 'my-database'
        host: process.env.DB_HOST, // e.g. '127.0.0.1'
        port: process.env.DB_PORT, // e.g. '5432'
    },
)
//console.log(pool) 
module.exports = pool;