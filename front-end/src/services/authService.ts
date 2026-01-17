import axios from 'axios';

const API_URL = 'http://localhost:4000/users';
const CURRENT_USER_KEY = 'todo_current_user';

export const authService = {
  // Register new user
  register: async (email: string, password: string, fullName: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        fullName
      });
      
      const user = response.data.details;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Login user
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      
      const user = response.data.details;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }
};
