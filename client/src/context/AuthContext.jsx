import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext(null);
const STORAGE_KEY = 'alcoaware_auth';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [auth]);

  const register = async ({ name, email, password }) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      setAuth({ user: response.user, token: response.token });
      toast.success('Account created.');
      return true;
    } catch (error) {
      toast.error(error.message || 'Registration failed.');
      return false;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setAuth({ user: response.user, token: response.token });
      toast.success('Logged in.');
      return true;
    } catch (error) {
      toast.error(error.message || 'Login failed.');
      return false;
    }
  };

  const loginWithGoogleCredential = async (credential) => {
    try {
      const response = await api.post('/auth/google', { credential });
      setAuth({ user: response.user, token: response.token });
      toast.success('Logged in with Google.');
      return true;
    } catch (error) {
      toast.error(error.message || 'Google login failed.');
      return false;
    }
  };

  const logout = () => {
    setAuth(null);
    toast.success('Logged out.');
  };

  const value = useMemo(() => ({
    user: auth?.user || null,
    token: auth?.token || null,
    isAuthenticated: Boolean(auth?.user),
    register,
    login,
    loginWithGoogleCredential,
    logout
  }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
