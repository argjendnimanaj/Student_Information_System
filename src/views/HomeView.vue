<template>
  <div class="flex justify-center pt-24">
    <div class="max-w-2xl text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Student Information System</h1>

      <p class="text-gray-600 mb-8">
        Manage students, registrations, and academic data in one system.
      </p>

      <router-link
        :to="{ name: 'students' }"
        class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold shadow-md transition hover:bg-blue-700 hover:shadow-lg"
      >
        View Students
        <span aria-hidden="true">→</span>
      </router-link>
    </div>
  </div>
</template>
