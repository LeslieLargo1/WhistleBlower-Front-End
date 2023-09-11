import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './components/homepage/Homepage';
import Navigation from './components/navigation/Navigation';
import Footer from './components/footer/Footer';
import DashboardAdmin from './components/dashboard/DashboardAdmin';
import DashboardClient from './components/dashboard/DashboardClient';
import Register from './components/register/Register';
import Login from './components/login/Login';
import ProfileAdmin from './components/profile/ProfileAdmin';
import ProfileClient from './components/profile/ProfileClient';
import ReportForm from './components/report/ReportForm';

const isAdmin = true;

const App = () => {
  return (
    <Router>
       {<Navigation isAdmin={isAdmin} />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        <Route path="/dashboard/client" element={<DashboardClient />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/admin" element={<ProfileAdmin />} />
        <Route path="/profile/client" element={<ProfileClient />} />
        <Route path="/report-form" element={<ReportForm />} />
      </Routes>
      { <Footer /> }
    </Router>
  );
};

export default App;
