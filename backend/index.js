import express from "express";
import mongodb from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import auth from "./middleware/auth.js";
const app = express();
const port = 8080;

import UsersCTRL from "./api/users.controller.js";
import ExpensesCTRL from "./api/expenses.controller.js";
import UsersDAO from "./dao/users.js";
import ExpensesDAO from "./dao/expense.js";
import IncomesDAO from "./dao/income.js";
import IncomesCTRL from "./api/incomes.controller.js";
import { apiRefreshToken } from "./api/refresh.controller.js";

const MongoClient = mongodb.MongoClient;
dotenv.config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://resplendent-faun-794855.netlify.app");
    res.header("Access-Control-Allow-Headers", ["Content-Type", "Authorization"]);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.setHeader('Content-Type', 'application/json');
    next();
  });
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://resplendent-faun-794855.netlify.app"] }))

// app.use(function (req, res, next) {
//     const cookies = req.cookies;
//     console.log(cookies)
//     const token = `${cookies.headerPayload}.${cookies.signature}`;
//     console.log(token)
//     req.headers['Authorization'] = `Bearer ${token}`
//     next();
// }) 


MongoClient.connect(
    process.env.BDGT_DB_URI,
    {
        useNewUrlParser: true,
    }
    ).catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await UsersDAO.injectDB(client);
        await ExpensesDAO.injectDB(client);
        await IncomesDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })

app.post('/api/v1/register', UsersCTRL.apiUserRegister);
app.post('/api/v1/login', UsersCTRL.apiUserLogin);
//app.post('/api/v1/logout', UsersCTRL.apiUserLogout);
app.post('/api/v1/refreshtoken', apiRefreshToken);

app.get('/api/v1/user', auth, UsersCTRL.apiGetUsers);
app.put('/api/v1/user', auth, UsersCTRL.apiUpdateUser)
app.delete('/api/v1/user', auth, UsersCTRL.apiDeleteUser)

app.get('/api/v1/user/income', auth, IncomesCTRL.apiGetIncomes)
app.post('/api/v1/user/income', auth, IncomesCTRL.apiCreateIncome);
app.put('/api/v1/user/income/:incomeId', auth, IncomesCTRL.apiUpdateIncome);
app.delete('/api/v1/user/income/:incomeId', auth, IncomesCTRL.apiDeleteIncome);

app.get('/api/v1/user/expense', auth, ExpensesCTRL.apiGetExpenses);
app.post('/api/v1/user/expense', auth, ExpensesCTRL.apiCreateExpense);
app.put('/api/v1/user/expense/:expenseId', auth, ExpensesCTRL.apiUpdateExpense);
app.delete('/api/v1/user/expense/:expenseId', auth, ExpensesCTRL.apiDeleteExpense);