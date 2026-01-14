<script setup>
const props = defineProps({
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
  <li class="text-blue-500 underline px-2 focus:text-black">
    <router-link :to="{ name: props.routeName }">
      {{ props.label }}
    </router-link>
  </li>
  |
</template>
