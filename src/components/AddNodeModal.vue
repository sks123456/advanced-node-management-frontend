<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white w-96 p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">
        {{ isEditMode ? "Edit Node" : "Add Node" }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            v-model="nodeData.Name"
            class="w-full p-2 border rounded"
            placeholder="Enter node name"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">IP Address</label>
          <input
            type="text"
            v-model="nodeData.IP"
            class="w-full p-2 border rounded"
            placeholder="Enter IP address"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Port</label>
          <input
            type="number"
            v-model="nodeData.Port"
            class="w-full p-2 border rounded"
            placeholder="Enter port number"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Location</label>
          <input
            type="text"
            v-model="nodeData.Location"
            class="w-full p-2 border rounded"
            placeholder="Enter location"
          />
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            class="px-4 py-2 bg-gray-500 text-white rounded"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {{ isEditMode ? "Save Changes" : "Add Node" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isEditMode: {
      type: Boolean,
      default: false,
    },
    node: {
      type: Object,
      default: () => ({
        name: "",
        ip: "",
        port: null,
        location: "",
      }),
    },
  },
  data() {
    return {
      nodeData: { ...this.node }, // Create a local copy to avoid mutating props
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("save", this.nodeData); // Emit the updated/added node data to the parent
    },
  },
};
</script>
