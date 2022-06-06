import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ExpensesDAO from "./expense.js";
import IncomesDAO from "./income.js";

let users;

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) return;
        try {
            users = await conn.db(process.env.BDGT_NS).collection("users")
        } catch (e) {
            console.error(`Unable to establish a collection handle in usersDAO`);
        }
    }

    static async registerUser(
        email, 
        username, 
        password
    ) {
        try {
            const encryptedPassword = await bcrypt.hash(password, 10);

            const existingUser = await users.findOne({ email: email });

            if (existingUser) {
                return;
            }

            const newUser = {
                _id: new ObjectId(),
                email: email,
                username: username,
                password: encryptedPassword
            }

            const token = jwt.sign({ user_id: newUser._id, email },
                process.env.REFRESH_TOKEN_KEY,
                {
                    expiresIn: '5m',
                }
            );
            const accessToken = jwt.sign(
                { user_id: existingUser._id, email },
                process.env.ACCESS_TOKEN_KEY,
                {
                    expiresIn: '1m',
                }
            );

            newUser.refreshToken = [token];
            
            await users.insertOne(newUser);

            return { newUser, refreshToken: token, accessToken };
        } catch (e) {
            console.log(e);
        }
    }

    static async loginUser(
        email,
        password
    ) {
        try {
            const existingUser = await users.findOne({ email: email });

            if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
                const token = jwt.sign(
                    { user_id: existingUser._id, email },
                    process.env.REFRESH_TOKEN_KEY,
                    {
                        expiresIn: '10m',
                    }
                );
                const accessToken = jwt.sign(
                    { user_id: existingUser._id, email },
                    process.env.ACCESS_TOKEN_KEY,
                    {
                        expiresIn: '1m',
                    }
                );

                const existingTokens = existingUser.refreshToken ? existingUser.refreshToken : [];

                await users.findOneAndUpdate(
                    { _id: ObjectId(existingUser._id) }, 
                    { $set: { refreshToken: [token, ...existingTokens] } }, 
                    { upsert: true }
                );
                return { existingUser, refreshToken: token, accessToken };
            }
            return null;
        } catch (e) {
            console.log(e);
        }
    }

    static async logoutUser() {

    }

    static async assignNewRefreshToken (refresh) {
        const existingUser = await users.findOne({ refreshToken: refresh })

        if (!existingUser) {
            // delete all tokens for this user
            const decoded = jwt.verify(refresh, process.env.REFRESH_TOKEN_KEY);
            await users.findOneAndUpdate(
                { _id: ObjectId(decoded._id) }, 
                { $set: { refreshToken: [] } }, 
                { upsert: true }
            );
            return;
        }

        const existingTokens = existingUser.refreshToken.filter(tkn => tkn !== refresh);
        try {
            // verify token
            const decoded = jwt.verify(refresh, process.env.REFRESH_TOKEN_KEY)

            if (existingUser._id.toString() !== decoded.user_id) return;

            const newRefresh = jwt.sign(
                { user_id: existingUser._id, email: existingUser.email },
                process.env.REFRESH_TOKEN_KEY,
                {
                    expiresIn: '10m'
                }
            );

            const accessToken = jwt.sign(
                { user_id: existingUser._id, email: existingUser.email },
                process.env.ACCESS_TOKEN_KEY,
                {
                    expiresIn: '1m'
                }
            );
            
            await users.findOneAndUpdate(
                { _id: ObjectId(existingUser._id) }, 
                { $set: { refreshToken: [newRefresh, ...existingTokens] } }, 
                { upsert: true }
            )
            return { accessToken, refreshToken: newRefresh };

        } catch (err) {
            // refreshToken expired
            await users.findOneAndUpdate(
                { _id: ObjectId(existingUser._id) }, 
                { $set: { refreshToken: [...existingTokens] } }, 
                { upsert: true }
            );
            return;
        }    
    }

    static async getUsers (user) {
        try {
            if (user) {
                const { username, email, _id } = await users.findOne({ _id: ObjectId(user) });

                return { username, email, _id };
            }
            const cursor =  await users.find({});

            const results = await cursor.toArray();
            return results;
        } catch(e) {
            console.log(e);
        }
    }

    static async updateUser (
        id,
        username,
        password
    ) {
        try {
            const encryptedPassword = await bcrypt.hash(password, 10);

            const updatedUserDoc = {
                username,
                password: encryptedPassword
            }

            const updatedUser = await users.findOneAndUpdate({ _id: ObjectId(id) }, { $set: updatedUserDoc }, { upsert: true });
            return updatedUser;
        } catch(e) {
            console.log(e);
        }
    }

    static async deleteUser (
        id, 
        password
    ) {
        try {
            const existingUser = await users.findOne({ _id: ObjectId(id) });

            if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
                const deletedExpenses = await ExpensesDAO.deleteAllUserExpenses(id);
                const deletedIncomes = await IncomesDAO.deleteAllUserIncomes(id);
                const deletedUser = await users.deleteOne({ _id: ObjectId(id) });
                return { deletedUser, deletedIncomes, deletedExpenses };
            }
            return null;
        } catch(e) {
            console.log(e);
        }
    }
}