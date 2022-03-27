const Pool = require('pg').Pool;
const dotenv = require('dotenv');
const { del } = require('express/lib/application');
dotenv.config();

// move config details to .env
const pool = new Pool({
    user: process.env.POOL_USER,
    host: process.env.POOL_HOST,
    database: process.env.POOL_DB,
    password: process.env.POOL_PASSWORD,
    port: process.env.PORT
})

const getAllIncomes = (req, res) => {
    const { userId } = req.params;

    pool.query('SELECT * FROM income WHERE userid = $1 ORDER BY id ASC', [userId], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    })
}

const getIncomeById = (req, res) => {
    const { userId, id } = req.params;

    pool.query("SELECT * FROM income WHERE id = $1, userid = $2", [id, userId], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    })
}

const createIncome = (req, res) => {
    const { userId } = req.params;
    const { amount, frequency } = req.body;

    pool.query('INSERT INTO income (userid, amount, frequency) VALUES ($1, $2, $3)', 
        [userId, amount, frequency], 
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(201).send(`Income added with ID: ${results.insertId}`);
    })
}

const updateIncome = (req, res) => {
    const { id } = req.params;
    const { amount, frequency } = req.body;

    pool.query(
        'UPDATE income SET amount = $1, frequency = $2 WHERE id = $3',
        [amount, frequency, id],
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(200).send(`Income modified with ID: ${id}`);
    })
}

const deleteIncome = (req, res) => {
    const { id } = req.params;

    pool.query('DELETE FROM income WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).send(`Income deleted with ID: ${id}`);
    })
}

module.exports = {
    getAllIncomes,
    getIncomeById,
    createIncome,
    updateIncome,
    deleteIncome
};