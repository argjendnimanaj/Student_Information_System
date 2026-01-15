<script setup>
import BaseModal from './BaseModal.vue'
const emit = defineEmits(['delete', 'close'])
defineProps({
  student: {
    type: Object,
    required: true,
  },
})

const deleteStudent = () => {
  emit('delete')
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <BaseModal
    @close="closeModal"
    @confirm="deleteStudent"
    buttonLabel="Yes"
    title="Are you sure you want to delete this student ?"
  >
    <h3 class="font-bold">Student being deleted:</h3>
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
