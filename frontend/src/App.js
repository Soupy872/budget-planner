import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// components
import Login from "./components/LogReg/Login";
import Register from "./components/LogReg/Register";
import Auth from "./components/Auth";
import PersistLogin from "./components/PersistLogin";

// styles
import Dashboard from "./components/Dashboard";
import PageNavbar from "./components/Navbar";
import { GlobalStyle } from './GlobalStyles';

function App() {

  return (
      <Router>
        <PageNavbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/test' element={<Dashboard />} />

          <Route element={<PersistLogin />}>
            <Route element={<Auth />} >
              <Route path='/' element={<Dashboard />} />
            </Route>
          </Route>


          <Route path='/*' element={<Navigate to='/login' replace />} />
        </Routes>
        <GlobalStyle />
      </Router>
  );
}

export default App;
