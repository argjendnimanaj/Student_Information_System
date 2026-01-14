<script setup>
import { ref } from 'vue'

const emit = defineEmits(['save', 'close'])

const newStudent = ref({
  id: '',
  name: '',
  dob: '',
  municipality: '',
})

const saveStudent = () => {
  if (
    !newStudent.value.id ||
    !newStudent.value.name ||
    !newStudent.value.dob ||
    !newStudent.value.municipality
  ) {
    alert('All fields are required')
    return
  }

  emit('save', { ...newStudent.value })
}

const closeModal = () => emit('close')
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div class="w-full max-w-md rounded bg-white p-6 shadow-lg">
      <h2 class="mb-4 text-lg font-semibold">Register New Student</h2>

      <div class="space-y-3 text-sm">
        <input
          v-model="newStudent.id"
          type="number"
          placeholder="Index"
          class="w-full border border-gray-400 px-3 py-1"
        />

        <input
          v-model="newStudent.name"
          type="text"
          placeholder="Full Name"
          class="w-full border border-gray-400 px-3 py-1"
        />

        <input
          v-model="newStudent.dob"
          type="date"
          class="w-full border border-gray-400 px-3 py-1"
        />

        <input
          v-model="newStudent.municipality"
          type="text"
          placeholder="Municipality"
          class="w-full border border-gray-400 px-3 py-1"
        />
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button
          class="border border-gray-400 px-4 py-1 text-sm hover:bg-gray-200"
          @click="closeModal"
        >
          Cancel
        </button>

        <button
          class="border border-gray-400 bg-gray-200 px-4 py-1 text-sm hover:bg-gray-300"
          @click="saveStudent"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
