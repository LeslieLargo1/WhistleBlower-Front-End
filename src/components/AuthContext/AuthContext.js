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
  const [userRoleId, setUserRoleId] = useState(
    sessionStorage.getItem("userRoleId") || null
  )
  const [userRole, setUserRole] = useState(
    sessionStorage.getItem("userRole") || null
  )
  
  console.log("userRole: ", userRole)
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || null
  )


  useEffect(() => {
    const syncSessionStorage = (key, value) => {
      if (value) {
        sessionStorage.setItem(key, value)
      } else {
        sessionStorage.removeItem(key)
      }
    }
    syncSessionStorage("token", token)
    syncSessionStorage("userId", userId)
    syncSessionStorage("userRoleId", userRoleId)
    syncSessionStorage("userRole", userRole)
    syncSessionStorage("username", username)
    
  }, [token, userId, userRoleId, userRole, username])

  const logout = () => {
    ;["token", "userId", "userRoleId", "userRole", "username"].forEach((key) =>
      sessionStorage.removeItem(key)
    )
    setToken(null)
    setUserId(null)
    setUserRoleId(null)
    setUserRole(null)
    setUsername(null)
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
    username,
    setUsername,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
