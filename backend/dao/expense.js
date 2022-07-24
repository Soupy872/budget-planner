import mongodb, { ObjectId } from "mongodb";

let expenses;

export default class ExpensesDAO {
    static async injectDB(conn) {
        if (expenses) return;
        try {
            expenses = await conn.db(process.env.BDGT_NS).collection("transactions")
        } catch (e) {
            console.error(`Unable to establish a collection handle in expensesDAO`);
        }
    }

    static async getExpenses(
        userId,
        days,
    ) {
        const timeframe = new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000));
        console.log(timeframe)
        let pipeline = [
            {
              '$match': {
                'userId': new ObjectId(userId),
                'transactionType': 'expense', 
                'date': {
                  '$gte': new Date(timeframe)
                }
              }
            }
          ];
        
        const cursor = await expenses.aggregate(pipeline);
        const results = await cursor.toArray();
        
        return results;
    }

    static async createExpense(
        userId,
        name,
        amount,
        category,
        date,
        reoccuring
    ) {
        try {
            const newExpense = {
                userId: mongodb.ObjectId(userId),
                name,
                transactionType: 'expense',
                amount,
                category,
                date: new Date(date),
                reoccuring
            }

            expenses.insertOne(newExpense);

            return newExpense;
        } catch(e) {
            console.log(e)
        }
    }

    static async updateExpense(
        id,
        name,
        amount,
        category,
        date,
        reoccuring) {
        try {
            const updateExpDoc = {
                name,
                amount,
                category,
                date: new Date(date),
                reoccuring
            }
            const updatedExpense = expenses.findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateExpDoc }, { upsert: true });
            return updatedExpense;
        } catch(e) {
            console.log(e);
        }
    }

    static async deleteExpense(id) {
        try {
            const deletedExpense = await expenses.deleteOne({ _id: ObjectId(id) });
            return deletedExpense;
        } catch(e) {
            console.log(e);
        }
    }

    static async deleteAllUserExpenses(userId) {
        try {
            const deletedExpenses = await expenses.deleteMany({ userId: ObjectId(userId) });
            return deletedExpenses;
        } catch(e) {
            console.log(e);
        }
    }
}
