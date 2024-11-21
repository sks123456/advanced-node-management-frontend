<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <main class="flex-grow p-6">
      <router-view></router-view>
    </main>
    <footer class="bg-gray-800 text-white text-center py-4">
      <p>&copy; 2024 Node Management Application</p>
    </footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
