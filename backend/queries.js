const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

// move config details to .env
const pool = new Pool({
    user: process.env.POOL_USER,
    host: process.env.POOL_HOST,
    database: process.env.POOL_DB,
    password: process.env.POOL_PASSWORD,
    port: process.env.PORT
})