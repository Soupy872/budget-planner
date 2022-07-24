import { useContext, useEffect } from "react";
import API from '../API';
import { AuthContext } from "../context/authContext";

const useAuth = () => {
    const [state, dispatch] = useContext(AuthContext);

    const login = async ({ email, password }) => {
        const response = await API.fetchLogin({ email, password });
        console.log(response)
        if (response.status === 200) {
            dispatch({ type: 'UPDATE_AUTH', payload: response.accessToken });
        } else {
            dispatch({ type: 'UPDATE_AUTH', payload: null });
        }
    }

    const register = async ({ email, password }) => {
        const response = await API.fetchLogin({ email, password });
        if (response.status === 200) {
            dispatch({ type: 'UPDATE_AUTH', payload: response.accessToken });
        } else {
            dispatch({ type: 'UPDATE_AUTH', payload: null });
        }
    }

    const logout = async () => {
        await API.fetchLogout();
        dispatch({ type: 'UPDATE_AUTH', payload: null });
        localStorage.clear('token');
        sessionStorage.clear('user');
        return;
    }

    return { login, register, logout }
}

export default useAuth;