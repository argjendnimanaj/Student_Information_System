<script setup>
import { ref, watch } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps({
  student: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update', 'close'])
const localStudent = ref({ ...props.student })

watch(
  () => props.student,
  (newStudent) => {
    localStudent.value = { ...newStudent }
  },
  { immediate: true },
)

const confirmUpdate = () => {
  emit('update', { ...localStudent.value })
}
</script>

<template>
  <BaseModal title="Edit Student" @close="emit('close')" @confirm="confirmUpdate">
    <div class="space-y-3 text-sm">
      <input v-model="localStudent.id" type="number" class="w-full border px-3 py-1" />
      <input v-model="localStudent.name" type="text" class="w-full border px-3 py-1" />
      <input v-model="localStudent.dob" type="date" class="w-full border px-3 py-1" />
      <input v-model="localStudent.municipality" type="text" class="w-full border px-3 py-1" />
    </div>
  </BaseModal>
</template>
