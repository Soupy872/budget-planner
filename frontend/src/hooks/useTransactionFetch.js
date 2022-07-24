import { useState, useEffect } from "react";
import API from "../API";
import useRefreshToken from "./useRefreshToken";

export const useTransactionFetch = (token) => {
    const refresh = useRefreshToken();
    const [transactions, setTransactions] = useState();
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const getTransactions = async () => {
            const expenses = await API.fetchExpenses(token, 90);
            const incomes = await API.fetchIncomes(token, 90);

            if (expenses?.status === 403 || incomes?.status === 403) {
                await refresh();
                return;
            }
    
            setTransactions([
                ...expenses.expenses,
                ...incomes.incomes,
            ])
        }

        if (transactions && token !== undefined) return;

        getTransactions(token);
    }, [token, transactions, refresh])

    const addTransaction = async (transactionInfo) => {
        console.log(transactionInfo.transactionType)
        await refresh();
        if (transactionInfo.transactionType === 'income') {
            await API.fetchCreateIncome(token, transactionInfo);
        } else if (transactionInfo.transactionType === 'expense') {
            await API.fetchCreateExpense(token, transactionInfo);
        }
    };

    return { transactions, setTransactions, addTransaction }
}

export default useTransactionFetch;