import { createStore } from "vuex";
import axiosInstance from "@/services/api";

export default createStore({
  state: {
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  mutations: {
    setToken(state, { token, user }) {
      state.token = token;
      state.isAuthenticated = true;
      state.user = user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser(state, userData) {
      // Normalize API response data to match state structure
      const normalizedUser = {
        email: userData.Email,  // Map API's 'Email' to state's 'email'
        id: userData.ID,        // Map API's 'ID' to state's 'id'
        name: userData.Name,    // Map API's 'Name' to state's 'name'
      };
  
      state.user = normalizedUser;  // Update the user state
      localStorage.setItem("user", JSON.stringify(normalizedUser));  // Update localStorage
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axiosInstance.post(`/login`, credentials);
      commit("setToken", { token: response.data.token, user: response.data.user });
    },
    async register(_, userData) {
      await axiosInstance.post(`/register`, userData);
    },
    logout({ commit }) {
      commit("clearToken");
    },
    async fetchUserProfile({ commit, state }) {
      console.log("trying to fetch user profile")
      try {
        const response = await axiosInstance.get(`${process.env.BACKEND_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        console.log(response)
        commit("setUser", response.data); // Update the user state with the fetched profile
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    },
  },
});
