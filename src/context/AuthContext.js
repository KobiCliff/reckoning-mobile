import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/config';

export const AuthContext = createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (email, password, phone) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/signup', { email, password, phone });
      const { token } = response.data;
      
      await AsyncStorage.setItem('auth_token', token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || 'Signup failed';
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      
      await AsyncStorage.setItem('auth_token', token);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || 'Login failed';
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('auth_token');
    setUser(null);
  };

  React.useEffect(()=> {
    const restoreUser = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        setUser({ id: 'cached' });
      }
    };
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};