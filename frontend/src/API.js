import { API_URL } from './config';

const getConfig = (method, token, transactionInfo = null) => {
    let config = {
        method,
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include'
    }
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    if (transactionInfo) { 
            config = { ...config, body: JSON.stringify(transactionInfo) }
    }
    return config;
};

const apiCall = async (endpoint, token, transactionInfo, method = 'GET') => {
    return await fetch(endpoint, getConfig(method, token, transactionInfo))
        .then(response => response.json())
        .catch(e => console.log(e));
}

const apiSettings = {
    fetchLogin: async (loginInfo) => {
        const endpoint = `${API_URL}/login`;
        return await (await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(loginInfo),
            credentials: 'include'
            })).json()
    },
    fetchRegister: async (registrationInfo) => {
        const endpoint = `${API_URL}/register`;
        return await (await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(registrationInfo),
            credentials: 'include'
        })).json();
    },
    fetchLogout: async () => {
        const endpoint = `${API_URL}/logout`;
        console.log(endpoint);
        return await (await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include'
        })).json();
    },
    fetchRefresh: async () => {
        const endpoint = `${API_URL}/refreshtoken`;
        return await (await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            credentials: 'include'
        })).json();
    },

    fetchUser: async (token) => {
        const endpoint = `${API_URL}/user`;
        return await apiCall(endpoint, token);
    },
    fetchUpdateUser: async (token) => {
        const endpoint = `${API_URL}/user`;
        return await (await fetch(endpoint, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            credentials: 'include'
        })).json();
    },
    fetchDeleteUser: async (token) => {
        const endpoint = `${API_URL}/user`;
        return await (await fetch(endpoint, {
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            credentials: 'include'
        })).json();
    },

    fetchExpenses: async (token, days = 90) => {
        const endpoint = `${API_URL}/user/expense?days=${days}`;
        return await apiCall(endpoint, token);
    },
    fetchCreateExpense: async (token, transactionInfo) => {
        const endpoint = `${API_URL}/user/expense`;
        const method = 'POST';
        return await apiCall(endpoint, token, transactionInfo, method);
    },
    fetchUpdateExpense: async (token, expenseId, transactionInfo) => {
        const endpoint = `${API_URL}/user/expense/${expenseId}`;
        return await apiCall(endpoint, token, transactionInfo);
    },
    fetchDeleteExpense: async (token, expenseId) => {
        const endpoint = `${API_URL}/user/expense/${expenseId}`;
        return await (await fetch(endpoint, {
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            credentials: 'include'
        })).json();
    },

    fetchIncomes: async (token, days = 90) => {
        const endpoint = `${API_URL}/user/income?days=${days}`;
        return await apiCall(endpoint, token);
    },
    fetchCreateIncome: async (token, transactionInfo) => {
        const endpoint = `${API_URL}/user/income`;
        const method = 'POST';
        return await apiCall(endpoint, token, transactionInfo, method);
    },
    fetchUpdateIncome: async (token, incomeId, transactionInfo) => {
        const endpoint = `${API_URL}/user/income/${incomeId}`;
        return await apiCall(endpoint, token, transactionInfo);;
    },
    fetchDeleteIncome: async (token, incomeId) => {
        const endpoint = `${API_URL}/user/income/${incomeId}`;
        return await (await fetch(endpoint, {
            method: 'DELETE',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            credentials: 'include'
        })).json();
    }
}

export default apiSettings;