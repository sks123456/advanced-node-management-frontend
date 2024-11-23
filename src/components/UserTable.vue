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
              @click="openEditModal(user)"
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

    <!-- Edit User Modal -->
    <EditUserModal
      :isOpen="isEditModalOpen"
      :user="selectedUser"
      @close="closeEditModal"
      @save="updateUser"
    />
  </div>
</template>

<script>
import axiosInstance from "@/services/api";
import EditUserModal from "@/components/EditUserModal.vue"; // Import the modal component
import { mapActions } from 'vuex';

export default {
  components: {
    EditUserModal,
  },
  inject: ["showToast"], // Access the showToast method from App.vue

  data() {
    return {
      users: [],
      isEditModalOpen: false,
      selectedUser: null, // Local copy of the user being edited
    };
  },
  methods: {
    ...mapActions(["fetchUserProfile"]), // Map the fetchUserProfile action from Vuex

    async fetchUsers() {
      try {
        const response = await axiosInstance.get("/users");
        this.users = response.data;
        this.showToast("Users fetched successfully!", "success");

      } catch (error) {
        const errorMessage = error.response?.data?.error || "Failed to fetch users.";
        this.showToast(errorMessage, "error");

      }
    },
    openEditModal(user) {
      this.selectedUser = { ...user }; // Clone the user data to avoid direct mutation
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.selectedUser = null;
    },
    async updateUser(user) {
      try {
        const { ID, Name, Email } = user;
        await axiosInstance.put(`/users/${ID}`, { Name, Email }); // Update user via axiosInstance
      
        // Dispatch fetchUserProfile to refresh Vuex store
        console.log(this.$store.state.user)
        console.log(ID)
      if (this.$store.state.user?.id === ID) {
        // console.log("hehe")
        await this.fetchUserProfile(); 
      }

        this.fetchUsers(); // Refresh the user list
        this.closeEditModal(); // Close the modal
        this.showToast("User updated successfully!", "success");

      } catch (error) {
        const errorMessage = error.response?.data?.error||"Failed to Update";
        this.showToast(errorMessage, "error");      
      }
    },
    async deleteUser(ID) {
      try {
        await axiosInstance.delete(`/users/${ID}`);
        this.fetchUsers();
        this.showToast("Users deleted successfully!", "success");

      } catch (error) {
        console.error("Failed to delete user:", error);
        const errorMessage = error.response?.data?.error || "Failed deleting users.";
        this.showToast(errorMessage, "error"); 
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
/* Add custom styling if needed */
</style>
