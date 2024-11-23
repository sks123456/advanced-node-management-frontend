<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">User Management</h1>
      <button
        @click="showAddUserModal = true"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Add User
      </button>
    </div>
    <user-table ref="userTable" />

    <!-- Add User Modal -->
    <add-user-modal
      v-if="showAddUserModal"
      :modalTitle="'Register New User'"
      @close="showAddUserModal = false"
      @save="registerUser"
    />
  </div>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
import AddUserModal from "@/components/AddUserModal.vue";
import axiosInstance from "@/services/api";

export default {
  components: {
    UserTable,
    AddUserModal,
  },
  data() {
    return {
      showAddUserModal: false,
    };
  },
  methods: {
    async registerUser(userData) {
      try {
        // Call the /register endpoint
        await axiosInstance.post("/register", userData);

        // Close the modal
        this.showAddUserModal = false;

        // Refresh the UserTable
        this.$refs.userTable.fetchUsers();
      } catch (error) {
        console.error("Failed to register user:", error.response?.data?.message || error.message);
        alert("Failed to register user. Please check the details and try again.");
      }
    },
  },
};
</script>
