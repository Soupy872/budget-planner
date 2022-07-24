import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

const Auth = () => {
    const [state] = useContext(AuthContext);
    const location = useLocation();

    const noToken = () => {
        sessionStorage.setItem('user', null);
        return (<Navigate to='/login' state={ { from: location } } replace />);
    }

    return (
        state?.auth?.accessToken ? (
            <Outlet />
        ) : (
            noToken()
        )
    )
}

export default Auth;