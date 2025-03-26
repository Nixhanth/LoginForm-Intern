import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './Components/Login-SignUp/LoginSignUp';
import Dashboard from './Components/Login-SignUp/Dashboard';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LoginSignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
);

export default App;
