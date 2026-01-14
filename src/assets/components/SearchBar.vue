<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="relative w-64">
    <img
      src="@/assets/images/search-icon.png"
      alt="search"
      class="absolute top-1/2 h-10 w-10 -translate-y-1/2 opacity-70"
    />

    <input
      type="text"
      placeholder="Search"
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="w-64 rounded-full border border-gray-400 p-3 pl-8 py-1 text-sm focus:outline-none focus:border-blue-500"
    />
  </div>
</template>
