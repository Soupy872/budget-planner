import { useContext } from "react";
import API from '../API';
import { AuthContext } from "../context/authContext";

const useRefreshToken = () => {
    const [state, dispatch] = useContext(AuthContext)

    const refresh = async () => {
        const response = await API.fetchRefresh();

        if (response.status === 200) {
            dispatch({ type: 'UPDATE_AUTH', payload: response.accessToken });
        } else {
            dispatch({ type: 'UPDATE_AUTH', payload: null });
        }
        return response.accessToken;
    }

    return refresh;
}

export default useRefreshToken;