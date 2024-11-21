<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">User List</h1>
    <table class="table-auto w-full bg-white shadow-md rounded">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Name</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.ID" class="border-b">
          <td class="px-4 py-2">{{ user.ID }}</td>
          <td class="px-4 py-2">{{ user.Name }}</td>
          <td class="px-4 py-2">{{ user.Email }}</td>
          <td class="px-4 py-2 text-center">
            <button
              class="px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded"
              @click="editUser(user)"
            >
              Edit
            </button>
            <button
              class="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded ml-2"
              @click="deleteUser(user.ID)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.get("/users");
        this.users = response.data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    editUser(user) {
      console.log("Edit User:", user);
    },
    async deleteUser(ID) {
      try {
        await api.delete(`/users/${ID}`);
        this.fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
