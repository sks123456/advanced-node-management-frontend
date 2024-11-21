<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Node Management</h1>
      <button
        @click="showAddNodeModal = true"
        class="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
      >
        Add Node
      </button>
    </div>
    <node-table />

    <!-- Add Node Modal -->
    <add-node-modal v-if="showAddNodeModal" @close="showAddNodeModal = false" />
  </div>
</template>

<script>
import NodeTable from "@/components/NodeTable.vue";
import AddNodeModal from "@/components/AddNodeModal.vue";

export default {
  components: {
    NodeTable,
    AddNodeModal,
  },
  data() {
    return {
      showAddNodeModal: false,
    };
  },
};
</script>
