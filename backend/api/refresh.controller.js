import UsersDAO from "../dao/users.js";

export const apiRefreshToken = async (req, res, next) => {
    const refresh = req.cookies.refresh;
    res.clearCookie('refresh');
    console.log(refresh)

    if (!refresh) return res.status(401);
    try {
        const { existingUser, accessToken, refreshToken } = await UsersDAO.assignNewRefreshToken(refresh);

        if (!refreshToken || !accessToken) return res.status(401);

        res.cookie('refresh',`${refreshToken}`,{
            maxAge: 1000 * 60 * 10,
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });

        return res.json({ status: 200, email: existingUser.email, username: existingUser.username, auth: { accessToken } });
    } catch (e) {
        res.json({ status: 400 })
    }
}