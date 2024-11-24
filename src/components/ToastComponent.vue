<template>
    <div
      v-if="visible"
      :class="[
        'fixed top-4 right-4 px-4 py-2 rounded shadow text-white',
        type === 'success' ? 'bg-green-500' : 'bg-red-500',
      ]"
    >
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: "success", // 'success' or 'error'
      },
      visible: {
        type: Boolean,
        required: true,
      },
    },
  };
  </script>
  
  