import ExpensesDAO from "../dao/expense.js";

export default class ExpensesCTRL {
    static async apiGetExpenses (req, res, next) {
        try {
            const userId = req.params.id;
            const { days = 30 } = req.body;

            if (!userId) {
                return res.status(401).send("Missing UserId.");
            }
            const response = await ExpensesDAO.getExpenses(userId, days);
            res.json({ expenses: response });
        } catch(e) {
            console.log(e);
        }
    }

    static async apiCreateExpense (req, res, next) {
        try {
            const userId = req.params.id;
            const { name, amount, category, date, reoccuring } = req.body;

            if (!(userId && name && amount && category && date && reoccuring !== null)) {
                return res.status(401).send("Missing Input Fields.")
            }

            const response = await ExpensesDAO.createExpense(userId, name, amount, category, date, reoccuring)

            if (response) {
                return res.json({ newExpense: response });
            }
            return res.json({ status: 'failure' });
        } catch(e) {
            console.log(e);
        }
    }

    static async apiUpdateExpense (req, res, next) {
        try {
            const id = req.params.expenseId
            const { name, amount, category, date, reoccuring } = req.body;

            const response = await ExpensesDAO.updateExpense(id, name, amount, category, date, reoccuring)

            if (response) {
                console.log(response);
                return res.json({ updatedExpense: response });
            }
            return res.json({ status: 'failure' });
        } catch(e) {
            console.log(e);
        }
    }

    static async apiDeleteExpense (req, res, next) {
        try {
            const id = req.params.expenseId;

            const response = await ExpensesDAO.deleteExpense(id);
            res.json({ deletedExpense: response })
        } catch(e) {
            console.log(e);
        }
    }
}