<template>
  <nav class="bg-blue-600 text-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left Section -->
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold hover:text-blue-300">
            Node Management
          </router-link>
          <div class="hidden md:block ml-10">
            <div class="flex space-x-4">
              <router-link
                to="/users"
                class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
              >
                Users
              </router-link>
              <router-link
                to="/nodes"
                class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
              >
                Nodes
              </router-link>
            </div>
          </div>
        </div>
        <!-- Right Section -->
        <div class="hidden md:flex items-center space-x-4">
          <span v-if="isAuthenticated" class="text-sm">
            Logged in as: <strong>{{ user?.email||"Loading ..." }}</strong>
          </span>
          <button
            v-if="isAuthenticated"
            @click="logoutUser"
            class="px-4 py-2 bg-red-500 rounded-md text-sm font-medium hover:bg-red-600"
          >
            Logout
          </button>
          <router-link
            v-else
            to="/login"
            class="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600"
          >
            Login
          </router-link>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="text-white focus:outline-none focus:ring focus:ring-blue-300"
          >
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-blue-500 px-2 pt-2 pb-3 space-y-1"
    >
      <router-link
        to="/users"
        class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-400"
        @click="toggleMenu"
      >
        Users
      </router-link>
      <router-link
        to="/nodes"
        class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-400"
        @click="toggleMenu"
      >
        Nodes
      </router-link>
      <button
        v-if="isAuthenticated"
        @click="logoutUser"
        class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-red-400"
      >
        Logout
      </button>
      <router-link
        v-else
        to="/login"
        class="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-green-400"
        @click="toggleMenu"
      >
        Login
      </router-link>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.isAuthenticated,
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions(['logout']), // Map the logout action from Vuex

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    
    logoutUser() {
      this.logout();  // Call the Vuex action to clear the state and log out the user
      this.$router.push('/login');  // Redirect to login page after logging out
    }
  },
};
</script>
