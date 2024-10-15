import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRoles, setUserRoles] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Wrong password or email");
        throw new Error(`Login failed: ${errorText}`);
      }

      const data = await response.json();
      sessionStorage.setItem('accessToken', data.jwt);
      setUserRoles(data.roles);
      setUserEmail(data.userName);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setUserRoles([]);
    setUserEmail("");
  };

  const updateEmail = (newEmail) => {
    setUserEmail(newEmail);
  };

  return (
    <AuthContext.Provider value={{ userRoles, userEmail, login, logout, updateEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
