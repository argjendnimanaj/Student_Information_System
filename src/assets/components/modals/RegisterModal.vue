<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'

const emit = defineEmits(['save', 'close'])

const student = ref({
  id: '',
  name: '',
  dob: '',
  municipality: '',
})

const saveStudent = () => {
  if (
    !student.value.id ||
    !student.value.name ||
    !student.value.dob ||
    !student.value.municipality
  ) {
    alert('All fields are required')
    return
  }

  emit('save', { ...student.value })
}

const closeModal = () => emit('close')
</script>

<template>
  <BaseModal
    title="Register New Student"
    @close="closeModal"
    @confirm="saveStudent"
    buttonLabel="Save"
  >
    <div class="space-y-3 text-sm">
      <input
        v-model="student.id"
        type="number"
        placeholder="Index"
        class="w-full border border-gray-400 px-3 py-1"
      />

      <input
        v-model="student.name"
        type="text"
        placeholder="Full Name"
        class="w-full border border-gray-400 px-3 py-1"
      />

      <input v-model="student.dob" type="date" class="w-full border border-gray-400 px-3 py-1" />

      <input
        v-model="student.municipality"
        type="text"
        placeholder="Municipality"
        class="w-full border border-gray-400 px-3 py-1"
      />
    </div>
  </BaseModal>
</template>
