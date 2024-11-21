<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-blue-600 mb-6">Advanced Node Management</h1>
    <p class="text-gray-600 mb-8 text-center max-w-lg">
      Welcome to the Advanced Node Management Application. Use the links below to manage users and nodes efficiently.
    </p>
    <div class="flex space-x-4">
      <router-link
        to="/users"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Manage Users
      </router-link>
      <router-link
        to="/nodes"
        class="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
      >
        Manage Nodes
      </router-link>
    </div>
  </div>
</template>
