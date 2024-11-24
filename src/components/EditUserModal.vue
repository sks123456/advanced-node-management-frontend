<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h2 class="text-lg font-bold mb-4">Edit User</h2>
        <form @submit.prevent="saveUser">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input
              v-model="localUser.Name"
              type="text"
              id="name"
              placeholder="Enter user's name"
              required
              class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
            <input
              v-model="localUser.Email"
              type="email"
              id="email"
              placeholder="Enter user's email"
              required
              class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      user: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        // Initialize localUser with empty data or fallback values
        localUser: {
          Name: '',
          Email: '',
        },
      };
    },
    watch: {
      // Watch for changes in the user prop and update localUser
      user(newUser) {
        this.localUser = { ...newUser }; // Update localUser when user prop changes
      },
    },
    methods: {
      saveUser() {
        // Emit the updated user object to the parent component
        this.$emit('save', this.localUser);
      },
      closeModal() {
        // Emit the close event to hide the modal
        this.$emit('close');
      },
    },
  };
  </script>
