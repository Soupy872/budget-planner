import { useState, useEffect } from "react";
import API from "../API";
import { isPersistedState } from "../helpers";

export const useDashboardFetch = token => {
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState();
    const initialState = {
        user: {
            userId: '',
            email: '',
            username: '',
            status: 200
        },
        incomes: [],
        expenses: [],
        token
    }

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                setError(false);
                setLoading(true);
    
                const user = (await API.fetchUser(token)).user;
                const incomes = (await API.fetchIncomes(token)).incomes;
                const expenses = (await API.fetchExpenses(token)).expenses;
                console.log(user)
                console.log(incomes)
                console.log(expenses)
                
                setState({
                    user,
                    incomes,
                    expenses,
                    accessToken: token,
                })
                setLoading(false);
            } catch(e) {
                setError(true);
                setState(e)
            }
        }
        const sessionState = isPersistedState('user');

        if (sessionState && sessionState?.user?.userId !== {}) {
            setState(sessionState);
            console.log(state)
            setLoading(false);
            return;
        }

        fetchUsersData();
    }, [token])

    // Write to session storage
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(state));
    }, [state])
    

    return { state, loading, error, tableData, setTableData };
}