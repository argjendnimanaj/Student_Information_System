<script setup>
const props = defineProps({
  students: {
    type: Array,
    required: true,
  },
  theadLabels: {
    type: Array,
    required: true,
  },
  sortKey: {
    type: String,
    default: null,
  },
  sortDirection: {
    type: String,
    default: 'asc',
  },
})

const emit = defineEmits(['sort'])
const sortableLabels = ['Name', 'Date of Birth', 'Municipality']

const getSortIcon = (label) => {
  const key = label.toLowerCase()

  if (props.sortKey !== key) return '↕'
  return props.sortDirection === 'asc' ? '▲' : '▼'
}
</script>

<template>
  <table class="w-full border-collapse text-sm">
    <thead class="bg-gray-200">
      <tr>
        <th
          v-for="label in theadLabels"
          :key="label"
          class="border border-gray-400 px-2 py-1 text-left"
          @click="sortableLabels.includes(label) && emit('sort', label)"
        >
          <span class="flex items-center justify-between gap-1 px-2">
            {{ label }}

            <span v-if="sortableLabels.includes(label)" class="text-xs">
              {{ getSortIcon(label) }}
            </span>
          </span>
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
