import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./components/AuthContext/AuthContext"

import Homepage from "./components/homepage/Homepage"
import Navigation from "./components/navigation/Navigation"
import Footer from "./components/footer/Footer"
import DashboardAdmin from "./components/dashboard/DashboardAdmin"
import DashboardClient from "./components/dashboard/DashboardClient"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import ProfileAdmin from "./components/profile/ProfileAdmin"
import ProfileClient from "./components/profile/ProfileClient"
import ReportForm from "./components/report/ReportForm"
import ChangePassword from "./components/profile/ChangePassword"
import CreateNewAdmin from "./components/profile/CreateNewAdmin"
import Error from "./components/responses/Error"
import Error404 from "./components/responses/Error404"
import Success from "./components/responses/Success"

const isAdmin = true

const App = () => {
  return (
    <AuthProvider>
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
          <Route path="/change-password" element={<ChangePassword/>} />
          <Route path="/create-new-admin" element={<CreateNewAdmin/>} />
          <Route path="/error" element={<Error/>} />
          <Route path="/error/404" element={<Error404/>} />
          <Route path="/success" element={<Success/>} />
        </Routes>
        {<Footer />}
      </Router>
    </AuthProvider>
  )
}

export default App
