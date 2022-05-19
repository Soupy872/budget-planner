import UsersDAO from "../dao/users.js";

export default class UsersController {
    static async apiUserRegister (req, res, next) {
        try {
            const { email, username, password } = req.body;

            if (!(email && username && password)) {
                return res.status(401).send('Missing Input Fields.');
            }
            const response = await UsersDAO.registerUser(email, username, password);

            if (response) {
                const [header, payload, signature] = response.token.split('.');
                
                return res.cookie(`signature`,`${signature}`,{
                        maxAge: (1800000),
                        secure: true,
                        httpOnly: true,
                        sameSite: 'lax'
                    }).cookie(`headerPayload`,`${header}.${payload}`,{
                        maxAge: (1800000),
                        secure: true,
                        httpOnly: false,
                        sameSite: 'lax'
                    })
                    .json({ status: 'success', userId: response._id, email: response.email, username: response.username });
            }
            return res.status(400).json({ status: "failure" })
        } catch(e) {
            console.log(`api: ${e}`);
        }
    }

    static async apiUserLogin (req, res, next) {
        try {
            const { email, password } = req.body;

            if (!(email && password)) {
                return res.status(401).send('Missing Input Fields.');
            }
            const response = await UsersDAO.loginUser(email, password);
            if (response) {
                const [header, payload, signature] = response.token.split('.');
                
                return res.cookie(`signature`,`${signature}`,{
                        maxAge: (1800000),
                        secure: true,
                        httpOnly: true,
                        sameSite: 'lax'
                    }).cookie(`headerPayload`,`${header}.${payload}`,{
                        maxAge: (1800000),
                        secure: true,
                        httpOnly: false,
                        sameSite: 'lax'
                    })
                    .json({ status: 'success', userId: response._id, email: response.email, username: response.username });
            }
            return res.status(403).json({ status: 'Invalid Credentials' });
        } catch(e) {
            console.log(`api: ${e}`);
        }
    }

    static async apiGetUsers (req, res, next) {
        try {
            const user = req.user;
            console.log(user)

            const response = await UsersDAO.getUsers(user);
            res.json({ user: response });
        } catch(e) {
            console.log(e)
        }
    }

    static async apiUpdateUser (req, res, next) {
        try {
            const id = req.params.id;
            const { username, password } = req.body;

            if (!(username && password)) {
                return res.status(401).send('Missing Input Fields.');
            }

            const response = await UsersDAO.updateUser(id, username, password);
            res.json({ updatedUser: response })
        } catch(e) {
            console.log(e);
        }
    }

    static async apiDeleteUser (req, res, next) {
        try {
            const id = req.params.id;
            const { password } = req.body;

            if (!password) {
                return res.status(401).send("Missing Password");
            }
            const response = await UsersDAO.deleteUser(id, password);
            if (!response) {
                return res.send("Incorrect Password.")
            }
            return res.json({ deletedUserInfo: response });
        } catch(e) {
            console.log(e);
        }
    }
}