<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold text-gray-800 mb-4">
        {{ modalTitle }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            v-model="name"
            type="text"
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter user's name"
            required
          />
          <span v-if="errors.name" class="text-red-500 text-xs">{{ errors.name }}</span>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter user's email"
            required
          />
          <span v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</span>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter password"
            required
            minlength="6"
          />
          <span v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</span>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
  props: ["modalTitle"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    validateForm() {
      const errors = {};
      if (!this.name) errors.name = "Name is required";
      if (!this.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        errors.email = "Please enter a valid email address";
      }
      if (!this.password) errors.password = "Password is required";
      else if (this.password.length < 6) errors.password = "Password must be at least 6 characters long";

      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    handleSubmit() {
      if (this.validateForm()) {
        // Emit the user data (name, email, and password) back to the parent component
        this.$emit("save", { name: this.name, email: this.email, password: this.password });
        this.$emit("close"); // Close the modal after saving
      }
    },
  },
};
</script>
