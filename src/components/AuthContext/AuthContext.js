import React, { createContext, useContext, useState, useEffect } from "react"

// Define AuthContext
export const AuthContext = createContext()

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext)
}
// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null)
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || null)
  const [userRoleId, setUserRoleId] = useState(sessionStorage.getItem("userRoleId") || null )
  const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole") || null);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token)
    } else {
      sessionStorage.removeItem("token")
    }
  }, [token])

  useEffect(() => {
    if (userId) {
      sessionStorage.setItem("userId", userId)
    } else {
      sessionStorage.removeItem("userId")
    }
  }, [userId])

  useEffect(() => {
    if (userRoleId) {
      sessionStorage.setItem("userRoleId", userRoleId)
    } else {
      sessionStorage.removeItem("userRoleId")
    }
  }, [userRoleId])

  useEffect(() => {
    if (userRole) {
      sessionStorage.setItem("userRole", userRole);
    } else {
      sessionStorage.removeItem("userRole");
    }
  }, [userRole]);
  

  const logout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userId")
    setToken(null)
    setUserId(null)
  }

  const value = {
    token,
    setToken,
    userId,
    setUserId,
    userRoleId,
    setUserRoleId, 
     userRole,
    setUserRole,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
