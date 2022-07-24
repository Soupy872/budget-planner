import React, { useEffect, useReducer } from "react";
  
export const AuthContext = React.createContext();

const Reducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_AUTH':
            const token = { accessToken: action.payload?.accessToken || action.payload };
            localStorage.setItem('token', JSON.stringify({ accessToken: token }));
            return {
                auth: { accessToken: token }
            };
            default: throw new Error();
    };
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer);

    return (
        <AuthContext.Provider value={[state, dispatch]} >
            { children }
        </AuthContext.Provider>
    )
}