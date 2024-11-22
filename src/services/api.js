import axios from "axios";
import store from "@/store";
import router from "@/router"; // Import the router to redirect users


const api = axios.create({
  baseURL: process.env.BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = store.state.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token from the store and localStorage
      store.dispatch("logout");

      // Redirect to the login page
      router.push("/login");

      // Optional: Notify the user
      const message = error.response.data.message || "Session expired. Please log in again.";
      if (window.$toast) {
        window.$toast.error(message); // If a global toast is available
      }
    }

    return Promise.reject(error); // Propagate the error for further handling
  }
);

export default api;