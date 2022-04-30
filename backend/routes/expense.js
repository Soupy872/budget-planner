let pool = require('../db');

const getAllExpenses = (req, res) => {
    const { userId } = req.params.id;

    pool.query('SELECT * FROM expense WHERE userid = $1 ORDER BY id ASC', [userId], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    })
}

const getExpenseById = (req, res) => {
    const userId = req.params.id;
    const id = req.params.expenseId;

    pool.query("SELECT * FROM expense WHERE id = $1, userid = $2", [id, userId], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).json(results.rows);
    })
}

const createExpense = (req, res) => {
    const userId = req.params.id;
    const { amount, frequency, categoryId } = req.body;

    pool.query('INSERT INTO expense (userid, amount, frequency, categoryid) VALUES ($1, $2, $3, $4)', 
        [userId, amount, frequency, categoryId], 
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(201).send(`Expense added with ID: ${results.insertId}`);
    })
}

const updateExpense = (req, res) => {
    const id = req.params.expenseId;
    const { amount, frequency, categoryId } = req.body;

    pool.query(
        'UPDATE expense SET amount = $1, frequency = $2, categoryid = $3 WHERE id = $4',
        [amount, frequency, categoryId, id],
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(200).send(`Expense modified with ID: ${id}`);
    })
}

const deleteExpense = (req, res) => {
    const id = req.params.expenseId;

    pool.query('DELETE FROM expense WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }

        res.status(200).send(`Expense deleted with ID: ${id}`);
    })
}

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};