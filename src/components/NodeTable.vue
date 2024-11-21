<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Node List</h1>
    <table class="table-auto w-full bg-white shadow-md rounded">
      <thead>
        <tr class="bg-gray-200 text-gray-700">
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Name</th>
          <th class="px-4 py-2 text-left">IP</th>
          <th class="px-4 py-2 text-left">Status</th>
          <th class="px-4 py-2 text-left">Health</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="node in nodes"
          :key="node.id"
          class="border-b hover:bg-gray-50"
        >
          <td class="px-4 py-2">{{ node.id }}</td>
          <td class="px-4 py-2">{{ node.name }}</td>
          <td class="px-4 py-2">{{ node.ip }}</td>
          <td
            class="px-4 py-2"
            :class="{
              'text-green-500 font-bold': node.status === 'Running',
              'text-red-500 font-bold': node.status === 'Stopped',
            }"
          >
            {{ node.status }}
          </td>
          <td
            class="px-4 py-2"
            :class="{
              'text-green-500 font-bold': node.health_status === 'Healthy',
              'text-red-500 font-bold': node.health_status === 'Unhealthy',
            }"
          >
            {{ node.health_status }}
          </td>
          <td class="px-4 py-2 text-center">
            <button
              class="px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded"
              @click="startNode(node.id)"
            >
              Start
            </button>
            <button
              class="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded ml-2"
              @click="stopNode(node.id)"
            >
              Stop
            </button>
            <button
              class="px-2 py-1 text-white bg-gray-500 hover:bg-gray-600 rounded ml-2"
              @click="deleteNode(node.id)"
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
      nodes: [],
    };
  },
  methods: {
    async fetchNodes() {
      try {
        const response = await api.get("/nodes");
        this.nodes = response.data;
      } catch (error) {
        console.error("Failed to fetch nodes:", error);
      }
    },
    async startNode(id) {
      try {
        await api.post(`/nodes/${id}/start`);
        this.fetchNodes();
      } catch (error) {
        console.error("Failed to start node:", error);
      }
    },
    async stopNode(id) {
      try {
        await api.post(`/nodes/${id}/stop`);
        this.fetchNodes();
      } catch (error) {
        console.error("Failed to stop node:", error);
      }
    },
    async deleteNode(id) {
      try {
        await api.delete(`/nodes/${id}`);
        this.fetchNodes();
      } catch (error) {
        console.error("Failed to delete node:", error);
      }
    },
  },
  mounted() {
    this.fetchNodes();
  },
};
</script>
