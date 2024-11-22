<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-grow p-6">
      <router-view></router-view>
    </main>
    <footer class="bg-gray-800 text-white text-center py-4">
      <p>&copy; 2024 Node Management Application</p>
    </footer>

    <!-- Global Toast -->
    <div
      v-if="toast.visible"
      :class="[
        'fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500',
      ]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      toast: {
        visible: false,
        message: "",
        type: "success", // "success" or "error"
      },
    };
  },
  methods: {
    showToast(message, type = "success") {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.visible = true;

      // Hide the toast after 3 seconds
      setTimeout(() => {
        this.toast.visible = false;
      }, 3000);
    },
  },
  provide() {
    return {
      showToast: this.showToast, // Provide the showToast method globally
    };
  },
};
</script>

<style scoped>
/* Toast Styling */
.bg-green-500 {
  background-color: #48bb78;
}

.bg-red-500 {
  background-color: #f56565;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.fixed {
  position: fixed;
  z-index: 50;
}
</style>
