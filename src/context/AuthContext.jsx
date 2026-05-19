import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mock user for UI development: roles can be 'patient', 'reception', or 'admin'
  const [user, setUser] = useState({
    id: '123',
    name: 'Test User',
    role: 'reception', // Change this to test different views
  });

  const login = (role) => {
    setUser({ id: '123', name: 'Test User', role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
