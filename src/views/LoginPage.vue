<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p class="text-gray-600 text-sm mt-4">
          Don't have an account?
          <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
        </p>
        <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        error: null,
      };
    },
    methods: {
      ...mapActions(["login"]),
      async handleLogin() {
        try {
          await this.login({ email: this.email, password: this.password });
          this.$router.push("/"); // Redirect to home after login
        } catch (error) {
          this.error = "Invalid email or password.";
        }
      },
    },
  };
  </script>
  