import UsersDAO from "../dao/users.js";

export const apiRefreshToken = async (req, res, next) => {
    const refresh = req.cookies.refresh;

    if (!refresh) return res.status(403);
    try {
        const { accessToken, refreshToken } = await UsersDAO.assignNewRefreshToken(refresh);

        if (!refreshToken || !accessToken) return res.status(403);

        res.setHeader("Authorization", `Bearer ${accessToken}`);

        res.cookie('refresh',`${refreshToken}`,{
            maxAge: 1000 * 60 * 10,
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        });

        return res.json({ status: 200 });
    } catch (e) {
        res.json({ status: 400 })
    }
}