<script setup>
defineProps({
  routeName: {
    type: String,
    required: true,
    default: 'home',
  },
  label: {
    type: String,
    required: true,
    default: 'Home',
  },
})
</script>
<template>
  <li>
    <router-link
      :to="{ name: routeName }"
      class="px-4 py-2 text-blue-600 transition"
      active-class="border-b-2 border-blue-600"
    >
      {{ label }}
    </router-link>
  </li>
  |
</template>
