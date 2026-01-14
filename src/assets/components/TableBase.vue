<script setup>
defineProps({
  students: {
    type: Array,
    required: true,
  },
  theadLabels: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <table class="w-full border-collapse text-sm">
    <thead class="bg-gray-200">
      <tr>
        <th
          v-for="label in theadLabels"
          :key="label"
          class="border border-gray-400 px-2 py-1 text-left"
        >
          {{ label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="student in students" :key="student.id" class="even:bg-white odd:bg-gray-100">
        <slot name="row" :student="student"></slot>
      </tr>
    </tbody>
  </table>
</template>
