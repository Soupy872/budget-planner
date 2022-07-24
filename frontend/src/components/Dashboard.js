import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// components
import Table from "./Table";
import FactSection from "./FactSection";
import { useDashboardFetch } from "../hooks/useDashboardFetch";
import { AuthContext } from "../context/authContext";
import API from '../API'

const Dashboard = () => { 
  const [state, dispatch] = useContext(AuthContext);
  const navigate = useNavigate();
  const expenses = {};
  if (!state) navigate('/', { replace: true })
  console.log(state)
  const { state: userInfo, loading, error, tableData, setTableData } = useDashboardFetch(state?.accessToken || state?.auth?.accessToken);

  if (userInfo?.status === 401) {
    dispatch({ type: 'UPDATE_AUTH', accessToken: null });
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login', { replace: true })
  } else if (userInfo?.status === 403) {
    retrieveRefresh();
  } else {
    localStorage.setItem('token', JSON.stringify(userInfo?.user?.accessToken));
  }
  if (loading) return <div>loading</div>;
  if (error) return <div>Something went wrong...</div>

  const buttclick = async () => {
    expenses = await API.fetchExpenses(state?.auth?.accessToken)
    console.log(expenses)
    if (expenses.status === 403) retrieveRefresh();

  }

  const retrieveRefresh = async () => {
    await API.fetchRefresh();
  }

  const columns = [
    { label: "Date", accessor: "date", sortable: true },
    { label: "Name", accessor: "name", sortable: false },
    { label: "Category", accessor: "category", sortable: false }
  ]
// console.log(state)
  return (
      <div>
        dashboard
        <buton onClick={buttclick}>Expenses</buton>
      </div>
  );
}

export default Dashboard;