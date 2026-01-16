<script setup>
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page',
  },
})
</script>

<template>
  <div class="flex justify-center pt-24">
    <div class="text-center max-w-md">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>

      <h3 class="text-lg text-gray-600 mb-6">The {{ resource }} you're looking for is not here.</h3>

      <router-link
        :to="{ name: 'login' }"
        class="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-blue-700"
      >
        Go Back
      </router-link>
    </div>
  </div>
</template>
