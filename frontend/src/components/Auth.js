import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

const Auth = () => {
    const [state, dispatch] = useContext(AuthContext);
    const location = useLocation();

    return (
        state?.auth?.accessToken ? (
            <Outlet />
        ) : (
            <Navigate to='/login' state={ { from: location } } replace />
        )
    )
}

export default Auth;