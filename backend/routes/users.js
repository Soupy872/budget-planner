const pool = require('../db');

const getUsers = async (req, res) => {
    await pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
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
// ON CONFLICT (email) DO UPDATE SET name = $1, email = $2, picture = $3
const createUser = async (req, res) => {
    const { name, email, picture } = req.body;
    
    try {
        pool.query('INSERT INTO users (id, name, email, picture) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET name = $2, email = $3, picture = $4', [userid, name, email.toLowerCase(), picture], (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results)
            res.status(201).send(`User added/updated with email: ${email.toLowerCase()}`);
        })
    } catch (e) {
        console.log(e);
    }
    
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2, picture = $3 WHERE id = $4',
        [name, email, picture, id],
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