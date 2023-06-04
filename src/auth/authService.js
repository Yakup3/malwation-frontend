import axios from "axios";
import { DEFAULT_BASE_URL } from "../Api.constants";
import { LOCAL_STORAGE } from "../shared.constants";

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${DEFAULT_BASE_URL}users/login`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem(LOCAL_STORAGE.TOKEN, token);
      return token;
    } catch (error) {
      throw error.response.data;
    }
  },

  register: async (email, password) => {
    try {
      const response = await axios.post(`${DEFAULT_BASE_URL}users/register`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
  },

  isAuthenticated: () => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    return !!token;
  },
};

export default AuthService;
