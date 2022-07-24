import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// components
import Login from "./components/Login";
import Register from "./components/Register";
import Auth from "./components/Auth";

// styles
import { GlobalStyle } from "./GlobalStyles";
import Dashboard from "./components/Dashboard";


function App() {

  return (
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<Auth />} >
            <Route path='/' element={<Dashboard />} />
          </Route>

          <Route path='/*' element={<Navigate to='/login' replace />} />
        </Routes>
        <GlobalStyle />
      </Router>
  );
}

export default App;
