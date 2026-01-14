<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="w-full max-w-md rounded bg-white p-6 shadow-lg">
      <h2 class="mb-4 text-lg font-semibold">{{ title }}</h2>

      <slot></slot>

      <div class="mt-6 flex justify-end gap-2">
        <button
          class="border border-gray-400 px-4 py-1 text-sm hover:bg-gray-200"
          @click="emit('close')"
        >
          Cancel
        </button>

        <button
          class="border border-gray-400 bg-gray-200 px-4 py-1 text-sm hover:bg-gray-300"
          @click="emit('confirm')"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
