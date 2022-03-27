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

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    })
}

const getUserById = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    })
}

const createUser = (req, res) => {
    const { name, email } = req.body;

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(201).send(`User added with ID: ${result.insertId}`);
    })
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(200).send(`User modified with ID: ${id}`);
        }
    )
}

const deleteUser = (req, res) => {
    const { id } = req.params;

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).send(`User deleted with ID: ${id}`);
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};