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
    <node-table
      ref="nodeTable"
      @edit-node="editNode"
      @delete-node="deleteNode"
      @update-status="updateNodeStatus"
      @update-health="updateNodeHealthStatus"
    />

    <!-- Add/Edit Node Modal -->
    <add-node-modal
      v-if="showAddNodeModal || showEditNodeModal"
      :isEditMode="showEditNodeModal"
      :node="selectedNode"
      @close="closeModal"
      @save="saveNode"
    />
  </div>
</template>

<script>
import NodeTable from "@/components/NodeTable.vue";
import AddNodeModal from "@/components/AddNodeModal.vue";
import axiosInstance from "@/services/api";

export default {
  components: {
    NodeTable,
    AddNodeModal,
  },
  inject: ["showToast"], // Access the showToast method from App.vue

  data() {
    return {
      showAddNodeModal: false,
      showEditNodeModal: false,
      selectedNode: null,
    };
  },
  methods: {
    async saveNode(nodeData) {
      try {
        if (this.showEditNodeModal) {
          await axiosInstance.put(`/nodes/${nodeData.ID}`, nodeData);
          this.showToast("Node Updated Successfully",)

        } else {
          await axiosInstance.post("/nodes", nodeData);
          this.showToast("Node Created Successfully",)
        }
        this.$refs.nodeTable.fetchNodes();
        this.closeModal();
      } catch (error) {
        console.error("Failed to save node:", error);
        alert("Failed to save node. Please try again.");
      }
    },
    closeModal() {
      this.showAddNodeModal = false;
      this.showEditNodeModal = false;
      this.selectedNode = null;
    },
    editNode(node) {
      this.selectedNode = { ...node }; // Pass the complete node object with backend field names
      this.showEditNodeModal = true;
    },
    async deleteNode(nodeId) {
      try {
        await axiosInstance.delete(`/nodes/${nodeId}`);
        this.$refs.nodeTable.fetchNodes();
      } catch (error) {
        console.error("Failed to delete node:", error);
        const errorMessage = error.response?.data?.error||"Failed to Delete Node";
        this.showToast(errorMessage, "error");   
      }
    },
    async updateNodeStatus(nodeId, status) {
      try {
        await axiosInstance.post(`/nodes/${nodeId}/${ status }`);
        this.$refs.nodeTable.fetchNodes();
        this.showToast("Node updated successfully!", "success");

      } catch (error) {
        console.error("Failed to update node status:", error);
        const errorMessage = error.response?.data?.error||"Failed to update node status";
        this.showToast(errorMessage, "error");      

      }
    },
    async updateNodeHealthStatus(nodeId, healthStatus) {
      try {
        await axiosInstance.put(`/nodes/${nodeId}`, { health_status: healthStatus });
        this.$refs.nodeTable.fetchNodes();
        this.showToast("Node Health Status Changed!", "success");

      } catch (error) {
        console.error("Failed to update node health status:", error);
        const errorMessage = error.response?.data?.error||"Failed to update node health status";
        this.showToast(errorMessage, "error");      

      }
    },
  },
};
</script>
