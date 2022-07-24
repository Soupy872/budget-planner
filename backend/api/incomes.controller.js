import IncomesDAO from "../dao/income.js";

export default class IncomesCTRL {
    static async apiGetIncomes (req, res, next) {
        try {
            const userId = req.user.user_id;
            const { days = 30 } = req.headers['body'];

            if (!userId) {
                return res.status(401).send("Missing UserId.");
            }
            const response = await IncomesDAO.getIncomes(userId, days);
            console.log(response)
            res.json({ incomes: response});
        } catch(e) {
            console.log(e);
        }
    }

    static async apiCreateIncome (req, res, next) {
        try {
            const userId = req.user.user_id;
            const { name, amount, category, date, reoccuring } = req.body;

            if (!(userId && name && amount && category && date && reoccuring !== null)) {
                return res.status(401).send("Missing Input Fields.")
            }

            const response = await IncomesDAO.createIncome(userId, name, amount, category, date, reoccuring)

            if (response) {
                return res.json({ newIncome: response });
            }
            return res.json({ status: 'failure' });
        } catch(e) {
            console.log(e);
        }
    }

    static async apiUpdateIncome (req, res, next) {
        try {
            const id = req.params.incomeId
            const { name, amount, category, date, reoccuring } = req.body;

            const response = await IncomesDAO.updateIncome(id, name, amount, category, date, reoccuring)

            if (response) {
                console.log(response);
                return res.json({ updatedIncome: response });
            }
            return res.json({ status: 'failure' });
        } catch(e) {
            console.log(e);
        }
    }

    static async apiDeleteIncome (req, res, next) {
        try {
            const id = req.params.incomeId;

            const response = await IncomesDAO.deleteIncome(id);
            res.json({ deletedIncome: response })
        } catch(e) {
            console.log(e);
        }
    }
} 