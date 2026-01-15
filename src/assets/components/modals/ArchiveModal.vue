<script setup>
import BaseModal from './BaseModal.vue'

const emit = defineEmits(['close', 'restore'])
defineProps({
  student: {
    type: Object,
    required: true,
  },
})

const closeModal = () => emit('close')
const handleRestore = () => emit('restore')
</script>

<template>
  <BaseModal
    @close="closeModal"
    @confirm="handleRestore"
    title="Are you sure you want to restore this student ?"
    buttonLabel="Restore"
  >
    <h3 class="font-bold">Student being restored:</h3>
    <p>
      Full Name: <span class="font-semibold">{{ student.name }}</span>
    </p>
    <p>
      Date of Birth: <span class="font-semibold">{{ student.dob }}</span>
    </p>
    <p>
      Municipality: <span class="font-semibold">{{ student.municipality }}</span>
    </p>
  </BaseModal>
</template>
