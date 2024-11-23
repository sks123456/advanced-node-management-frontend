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
        <td class="px-4 py-2">{{ node.HealthStatus }}</td>
        <td class="px-4 py-2">{{ formatDate(node.LastChecked) }}</td>
        <td class="px-4 py-2 text-center">
          <button
            class="px-2 py-1 bg-blue-500 text-white rounded"
            @click="$emit('edit-node', node)"
          >
            Edit
          </button>
          <button
            class="px-2 py-1 bg-red-500 text-white rounded ml-2"
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
            class="px-2 py-1 bg-gray-500 text-white rounded ml-2"
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
  data() {
    return {
      nodes: [],
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
    formatDate(isoDate) {
    if (!isoDate) return "N/A"; // Handle null or undefined values
    const date = new Date(isoDate);
    return date.toLocaleString(); // Converts to local date and time
    },
  },
  mounted() {
    this.fetchNodes();
  },
};
</script>
