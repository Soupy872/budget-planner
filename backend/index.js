const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const pool = require('./db')
const Users = require('./routes/users');
const Income = require('./routes/income');
const Expense = require('./routes/expense');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(async (req, res, next) => {
    //await pool.query(`DROP TABLE users;`)
    await pool.query(
        `CREATE TABLE IF NOT EXISTS users (
            ID SERIAL PRIMARY KEY,
            name VARCHAR(30),
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            picture VARCHAR(255)
        );`
    )
    await pool.query(
        `CREATE TABLE IF NOT EXISTS income (
            ID SERIAL PRIMARY KEY,
            userid INTEGER,
            amount BIGINT,
            frequency VARCHAR(30)
        );`
    )
    await pool.query(
        `CREATE TABLE IF NOT EXISTS expense (
            ID SERIAL PRIMARY KEY,
            userid INTEGER,
            amount BIGINT,
            frequency VARCHAR(30),
            categoryid INTEGER
        );`
    )
    next();
})

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/api/v1/user', Users.getUsers);
app.get('/api/v1/user/:id', Users.getUserById);
app.post('/api/v1/user', Users.createUser);
app.put('/api/v1/user/:id', Users.updateUser)
app.delete('/api/v1/user/:id', Users.deleteUser)

app.get('/api/v1/user/:id/income', Income.getIncomes)
app.get('/api/v1/user/:id/income/:incomeId', Income.getIncomeById);
app.post('/api/v1/user/:id/income', Income.createIncome);
app.put('/api/v1/user/:id/income/:incomeId', Income.updateIncome);
app.delete('/api/v1/user/:id/income/:incomeId', Income.deleteIncome);

app.get('/api/v1/user/:id/expense', Expense.getExpense);
app.get('/api/v1/user/:id/expense/:expenseId', Expense.getExpenseById);
app.post('/api/v1/user/:id/expense', Expense.createExpense);
app.put('/api/v1/user/:id/expense/:expenseId', Expense.updateExpense);
app.delete('/api/v1/user/:id/expense/:expenseId', Expense.deleteExpense);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
