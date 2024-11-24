<template>
  <table class="table-auto w-full bg-white shadow-md rounded">
    <thead>
      <tr class="bg-gray-200 text-gray-700">
        <th class="px-4 py-2 text-left">ID</th>
        <th class="px-4 py-2 text-left">Name</th>
        <th class="px-4 py-2 text-left">IP</th>
        <th class="px-4 py-2 text-left">Port</th>
        <th class="px-4 py-2 text-left">Location</th>
        <th class="px-4 py-2 text-left">Status</th>
        <th class="px-4 py-2 text-left">Health</th>
        <th class="px-4 py-2 text-left">Last Checked</th>
        <th class="px-4 py-2 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="node in nodes"
        :key="node.id"
        class="border-b hover:bg-gray-50"
      >
        <td class="px-4 py-2">{{ node.ID }}</td>
        <td class="px-4 py-2">{{ node.Name }}</td>
        <td class="px-4 py-2">{{ node.IP }}</td>
        <td class="px-4 py-2">{{ node.Port }}</td>
        <td class="px-4 py-2">{{ node.Location }}</td>
        <td class="px-4 py-2">{{ node.Status }}</td>
        <td class="px-4 py-2">
          <span
            :class="{
              'text-green-500 font-bold': node.HealthStatus === 'Healthy',
              'text-red-500 font-bold': node.HealthStatus === 'Unhealthy',
            }"
          >
            {{ node.HealthStatus }}
          </span>
        </td>
        <td class="px-4 py-2">{{ formatDate(node.LastChecked) }}</td>
        <td class="px-4 py-2 text-center">
          <button
            class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="node.Status !== 'Stopped'"
            :title="node.Status !== 'Stopped' ? 'Node must be stopped to edit' : ''"
            @click="$emit('edit-node', node)"
          >
            Edit
          </button>

          <button
            class="px-2 py-1 bg-red-500 text-white rounded ml-2 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="node.Status !== 'Stopped'"
            :title="node.Status !== 'Stopped' ? 'Node must be stopped to delete' : ''"
            @click="$emit('delete-node', node.ID)"
          >
            Delete
          </button>
          <button
            class="px-2 py-1 bg-green-500 text-white rounded ml-2"
            @click="$emit('update-status', node.ID, 'start')"
          >
            Start
          </button>
          <button
            class="px-2 py-1 bg-gray-500 text-white rounded ml-2 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="node.Status !== 'Running'"
            :title="node.Status !== 'Running' ? 'Node must be running to stop' : ''"
            @click="$emit('update-status', node.ID, 'stop')"
          >
            Stop
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axiosInstance from "@/services/api";

export default {
  inject: ["showToast"], // Access the showToast method from App.vue

  data() {
    return {
      nodes: [],
      socket: null, // WebSocket connection
    };
  },
  methods: {
    async fetchNodes() {
      try {
        const response = await axiosInstance.get("/nodes");
        this.nodes = response.data;
      } catch (error) {
        console.error("Failed to fetch nodes:", error);
      }
    },
    setupWebSocket() {
      this.socket = new WebSocket("ws://localhost:8080/ws");

      this.socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      this.socket.onmessage = (event) => {
        console.log("WebSocket message received:", event.data);

        const data = JSON.parse(event.data);

        // Find the corresponding node in the table
        const node = this.nodes.find((n) => n.ID === data.node_id);

        if (node) {
          // Check if the HealthStatus has changed
          if (node.HealthStatus !== data.health_status) {
            // Show toast message based on the health status
            if (data.health_status === "Healthy") {
              this.showToast(`Node ${node.Name} is now Healthy`, "success");
            } else {
              this.showToast(`Node ${node.Name} is now Unhealthy`, "error");
            }
          }

          // Update the node's health status and last checked timestamp
          node.HealthStatus = data.health_status;
          node.LastChecked = new Date();
          console.log(
            `Updated node ${node.ID} health status to ${node.HealthStatus}`
          );
        }
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    },

    formatDate(isoDate) {
      if (!isoDate) return "N/A";
      const date = new Date(isoDate);
      return date.toLocaleString();
    },
  },
  mounted() {
    this.fetchNodes();
    this.setupWebSocket();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>
