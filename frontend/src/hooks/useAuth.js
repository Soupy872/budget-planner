import { useContext } from "react";
import API from '../API';
import { AuthContext } from "../context/authContext";

const useAuth = () => {
    const [state, dispatch] = useContext(AuthContext);

    const login = async (loginInfo) => {
        const response = await API.fetchLogin(loginInfo);
        if (response.status === 200) {
            dispatch({ type: 'ADD_AUTH', payload: response });
            console.log(state)
            return true;
        } else {
            dispatch({ type: 'DELETE_AUTH'});
            return false;
        }
    }

    const register = async (registrationInfo) => {
        const response = await API.fetchLogin(registrationInfo);
        if (response.status === 200) {
            dispatch({ type: 'ADD_AUTH', payload: response });
            return true;
        } else {
            dispatch({ type: 'DELETE_AUTH'});
            return false;
        }
    }

    const logout = async () => {
        localStorage.clear('persist');
        await API.fetchLogout();
        dispatch({ type: 'DELETE_AUTH'});
        return;
    }

    return { login, register, logout }
}

export default useAuth;