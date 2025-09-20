// src/Context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import adminService from "../Services/adminService";
import clientService from "../Services/clientService"; // Importa o serviço do cliente
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const processToken = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      if (decodedUser.exp * 1000 < Date.now()) {
        logout();
        return null;
      }
      const roleClaim =
        decodedUser[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      if (!roleClaim) {
        logout();
        return null;
      }
      const userToStore = {
        id: decodedUser.sub,
        email: decodedUser.email,
        role: roleClaim,
      };
      setUser(userToStore);
      return userToStore;
    } catch (error) {
      logout();
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      processToken(token);
    }
    setLoading(false);
  }, []);

  // ✨ FUNÇÃO DE LOGIN APENAS PARA ADMINS ✨
  const loginAdmin = async (email, password) => {
    try {
      const data = await adminService.login(email, password);
      localStorage.setItem("token", data.token);
      return processToken(data.token);
    } catch (error) {
      throw new Error(error);
    }
  };

  // ✨ FUNÇÃO DE LOGIN APENAS PARA CLIENTES (SUPPORT) ✨
  const loginClient = async (email, password) => {
    try {
      const data = await clientService.login(email, password);
      localStorage.setItem("token", data.token);
      return processToken(data.token);
    } catch (error) {
      throw new Error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Expondo as duas novas funções de login
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    loginAdmin,
    loginClient,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
