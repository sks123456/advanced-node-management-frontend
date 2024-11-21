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
    <user-table />

    <!-- Add User Modal -->
    <add-user-modal v-if="showAddUserModal" @close="showAddUserModal = false" />
  </div>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
import AddUserModal from "@/components/AddUserModal.vue";

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
};
</script>
