<template>
  <div class="flex justify-center pt-24">
    <div class="w-full max-w-3xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Help & Support</h1>
        <p class="text-gray-600">
          Find answers to common questions about using the Student Information System.
        </p>
      </div>

      <!-- Help Topics -->
      <div class="grid gap-6 sm:grid-cols-2">
        <div class="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Managing Students</h3>
          <p class="text-gray-600 text-sm">
            Learn how to add, edit, archive, and delete student records.
          </p>
        </div>

        <div class="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Registration & Login</h3>
          <p class="text-gray-600 text-sm">
            Having trouble logging in or registering? Here’s what to check.
          </p>
        </div>

        <div class="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Data Storage</h3>
          <p class="text-gray-600 text-sm">
            Understand how student data is saved and managed locally.
          </p>
        </div>

        <div class="rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Common Issues</h3>
          <p class="text-gray-600 text-sm">
            Solutions for frequent problems and unexpected behavior.
          </p>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="mt-12 text-center">
        <router-link
          :to="{ name: 'students' }"
          class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold shadow-md transition hover:bg-blue-700 hover:shadow-lg"
        >
          Go to Students
          <span aria-hidden="true">→</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
