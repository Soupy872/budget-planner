import { useContext } from "react";
import API from '../API';
import { AuthContext } from "../context/authContext";

const useRefreshToken = () => {
    const [state, dispatch] = useContext(AuthContext);

    const refresh = async () => {
        const response = await API.fetchRefresh();
        
        if (response.status === 200) {
            dispatch({ type: 'ADD_AUTH', payload: response });
            console.log(state)
        } else {
            console.log('not 200')
            dispatch({ type: 'DELETE_AUTH'});
        }

        return response?.accessToken ? true : false;
    }

    return refresh;
}

export default useRefreshToken;