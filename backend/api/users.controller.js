import UsersDAO from "../dao/users.js";

export default class UsersController {
    static async apiUserRegister (req, res, next) {
        try {
            const { email, username, password } = req.body;

            if (!(email && username && password)) {
                return res.json({ status: 401 });
            }
            const { newUser, refreshToken, accessToken } = await UsersDAO.registerUser(email, username, password);

            if (newUser) {
                res.cookie('refresh',`${refreshToken}`,{
                    maxAge: 1000 * 60 * 10,
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none'
                });

                return res.json({ status: 200, userId: newUser._id, email: newUser.email, username: newUser.username, accessToken });
            } else {
                return res.json({ status: 400 })
            }
        } catch(e) {
            console.log(`api: ${e}`);
        }
    }

    static async apiUserLogin (req, res, next) {
        try {
            const { email, password } = req.body;

            if (!(email && password)) {
                return res.send({ status: 401 });
            }
            const { existingUser, refreshToken, accessToken } = await UsersDAO.loginUser(email, password);
            
            if (existingUser) {
                res.cookie('refresh',`${refreshToken}`,{
                    maxAge: 1000 * 60 * 10,
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none'
                });
                console.log(accessToken)

                return res.json({ status: 200, userId: existingUser._id, email: existingUser.email, username: existingUser.username, accessToken });
            } else {
                return res.json({ status: 403 });
            }
        } catch(e) {
            console.log(`api: ${e}`);
        }
    }

    static async apiUserLogout (req, res, next) {
        try {
            const refresh = req.cookies.refresh;
            res.clearCookie('refresh');

            if (!refresh) return res.json({ status: 401 })
            await UsersDAO.userLogout(refresh);
        } catch(e) {
            console.log(`api: ${e}`)
        }
    }

    static async apiGetUsers (req, res, next) {
        try {
            const user = req.user;

            const response = await UsersDAO.getUsers(user.user_id);
            return res.json({ user: response });
        } catch(e) {
            console.log(e)
        }
    }

    static async apiUpdateUser (req, res, next) {
        try {
            const user = req.user;
            const { username, password } = req.body;

            if (!(username && password)) {
                return res.status(401).send('Missing Input Fields.');
            }

            const response = await UsersDAO.updateUser(user.user_id, username, password);
            res.json({ updatedUser: response })
        } catch(e) {
            console.log(e);
        }
    }

    static async apiDeleteUser (req, res, next) {
        try {
            const user = req.user;
            const { password } = req.body;

            if (!password) {
                return res.status(401).send("Missing Password");
            }
            const response = await UsersDAO.deleteUser(user.user_id, password);
            if (!response) {
                return res.send("Incorrect Password.")
            }
            return res.json({ deletedUserInfo: response });
        } catch(e) {
            console.log(e);
        }
    }
}