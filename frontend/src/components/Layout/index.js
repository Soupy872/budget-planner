import React, { useContext } from "react";
import useTransactionFetch from "../../hooks/useTransactionFetch";
import { AuthContext } from "../../context/authContext";
import Charts from '../Charts/index'
import Table from '../Table/index';
import Stats from '../Stats/index';
import { ChartsContainer, StatsContainer, TableContainer, Wrapper } from './Layout.styles';

const Layout = () => {
    const [state, dispatch] = useContext(AuthContext);
    const { transactions, addTransaction } = useTransactionFetch(state?.auth?.accessToken);
    console.log(state)

    return (
        <Wrapper>
            <div className="custom-container">
                <StatsContainer><Stats /></StatsContainer>
                <TableContainer><Table transactions={transactions} add={addTransaction} /></TableContainer>
                <ChartsContainer>
                    <Charts type='expense' tData={transactions} />
                    <Charts type='income' tData={transactions} />
                </ChartsContainer>
            </div>
        </Wrapper>
    );
}

export default Layout;