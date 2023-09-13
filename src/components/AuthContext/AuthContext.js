import React, { createContext, useContext, useState, useEffect } from 'react';

// Define AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId') || null);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      sessionStorage.setItem('userId', userId);
    } else {
      sessionStorage.removeItem('userId');
    }
  }, [userId]);

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  };

  const value = {
    token,
    setToken,
    userId,
    setUserId,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
