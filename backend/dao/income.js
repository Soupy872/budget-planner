import mongodb, { ObjectId } from "mongodb";

let incomes;

export default class IncomesDAO {
    static async injectDB(conn) {
        if (incomes) return;
        try {
            incomes = await conn.db(process.env.BDGT_NS).collection("incomes")
        } catch (e) {
            console.error(`Unable to establish a collection handle in incomesDAO`);
        }
    }

    static async getIncomes(
        userId,
        days,
    ) {
        const timeframe = new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000));
        console.log(timeframe)
        let pipeline = [
            {
              '$match': {
                'userId': new ObjectId(userId), 
                'date': {
                  '$gte': new Date(timeframe)
                }
              }
            }
          ];
        
        const cursor = await incomes.aggregate(pipeline);
        const results = await cursor.toArray();
        
        return results;
    }

    static async createIncome(
        userId,
        name,
        amount,
        category,
        date,
        reoccuring
    ) {
        try {
            const newIncome = {
                userId: mongodb.ObjectId(userId),
                name,
                amount,
                category,
                date: new Date(date),
                reoccuring
            }

            incomes.insertOne(newIncome);

            return newIncome;
        } catch(e) {
            console.log(e)
        }
    }

    static async updateIncome(
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
            const updatedIncome = incomes.findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateExpDoc }, { upsert: true });
            return updatedIncome;
        } catch(e) {
            console.log(e);
        }
    }

    static async deleteIncome(id) {
        try {
            const deletedIncome = await incomes.deleteOne({ _id: ObjectId(id) });
            return deletedIncome;
        } catch(e) {
            console.log(e);
        }
    }

    static async deleteAllUserIncomes(userId) {
        try {
            const deletedIncomes = await incomes.deleteMany({ userId: ObjectId(userId) });
            return deletedIncomes;
        } catch(e) {
            console.log(e);
        }
    }
}