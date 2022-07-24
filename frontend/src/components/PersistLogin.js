import React, { useState, useEffect, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from "../context/authContext";
import useLocalStorage from "../hooks/useLocalStorage";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
    const refresh = useRefreshToken();
    const location = useLocation();
    const [persist] = useLocalStorage('persist', false);

    const [state] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch(e) {
                console.log(e);
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        !state?.auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    })

    return (
        <>
            {!persist ? (
                <Outlet />
            ) : (
                isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <Outlet />
                )
            )}
        </>
    )
}

export default PersistLogin;