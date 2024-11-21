import { createStore } from "vuex";
import axios from "axios";

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
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post("http://localhost:8080/login", credentials);
      commit("setToken", { token: response.data.token, user: response.data.user });
    },
    async register(_, userData) {
      await axios.post("http://localhost:8080/register", userData);
    },
    logout({ commit }) {
      commit("clearToken");
    },
  },
});
