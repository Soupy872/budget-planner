import { API_URL } from './config';

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
        })).json();
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
        console.log(endpoint)
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
        console.log(token);
        const resp = await (await fetch(endpoint, {
            method: 'GET',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            credentials: 'include'
        })).json();
        console.log(resp)
        return resp;
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
        const endpoint = `${API_URL}/user/expense`;
        return await (await fetch(endpoint, {
            method: 'GET',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Body': `${days}`,
        },
            credentials: 'include'
        })).json();
    },
    fetchCreateExpense: async (token, expenseId) => {
        const endpoint = `${API_URL}/user/expense/${expenseId}`;
        return await (await fetch(endpoint, {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            credentials: 'include'
        })).json();
    },
    fetchUpdateExpense: async (token, expenseId) => {
        const endpoint = `${API_URL}/user/expense/${expenseId}`;
        return await (await fetch(endpoint, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            credentials: 'include'
        })).json();
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
        const endpoint = `${API_URL}/user/income`;
        return await (await fetch(endpoint, {
            method: 'GET',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Body': `${days}`,
        },
            credentials: 'include'
        })).json();
    },
    fetchCreateIncome: async (token, incomeId) => {
        const endpoint = `${API_URL}/user/income/${incomeId}`;
        return await (await fetch(endpoint, {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            credentials: 'include'
        })).json();
    },
    fetchUpdateIncome: async (token, incomeId) => {
        const endpoint = `${API_URL}/user/income/${incomeId}`;
        return await (await fetch(endpoint, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            credentials: 'include'
        })).json();
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