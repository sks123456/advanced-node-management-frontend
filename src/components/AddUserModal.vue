<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold text-gray-800 mb-4">
        {{ modalTitle }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600 mb-1">
            {{ inputLabel }}
          </label>
          <input
            v-model="inputValue"
            type="text"
            class="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modalTitle", "inputLabel"],
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("save", this.inputValue);
      this.$emit("close");
    },
  },
};
</script>
