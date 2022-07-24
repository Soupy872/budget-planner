import React, { useReducer } from "react";
  
export const AuthContext = React.createContext({});

const Reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_AUTH': {
            return {
                ...action.payload,
            }
        }
        case 'DELETE_AUTH': {
            return null;
        }
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