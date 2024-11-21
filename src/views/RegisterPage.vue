<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Register</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input
              v-model="name"
              type="text"
              id="name"
              required
              class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
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
            class="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-sm mt-4">{{ success }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        error: null,
        success: null,
      };
    },
    methods: {
      ...mapActions(["register"]),
      async handleRegister() {
        try {
          await this.register({
            name: this.name,
            email: this.email,
            password: this.password,
          });
          this.success = "Registration successful. You can now log in.";
          this.error = null;
        } catch (error) {
          this.error = "Failed to register. Please try again.";
          this.success = null;
        }
      },
    },
  };
  </script>
  