<script setup>
import EditModal from '@/assets/components/modals/EditModal.vue'
import RegisterModal from '@/assets/components/modals/RegisterModal.vue'
import SearchBar from '@/assets/components/SearchBar.vue'
import TableBase from '@/assets/components/TableBase.vue'
import { ref, computed, onMounted } from 'vue'

const students = ref([])
const search = ref('')

const openRegisterModal = ref(false)
const showRegisterModal = () => (openRegisterModal.value = true)

const openEditModal = ref(false)
const editingStudent = ref(null)
const openEdit = (student) => {
  editingStudent.value = { ...student }
  openEditModal.value = true
}

const filteredStudents = computed(() => {
  if (!search.value) return students.value

  const query = search.value.toLowerCase()

  return students.value.filter(
    (student) =>
      student.name.toLowerCase().includes(query) ||
      student.dob.toLowerCase().includes(query) ||
      student.municipality.toLowerCase().includes(query),
  )
})

const handleSaveStudent = (student) => {
  students.value.push(student)
  localStorage.setItem('students', JSON.stringify(students.value))
  openRegisterModal.value = false
}

const handleUpdateStudent = (updatedStudent) => {
  const index = students.value.findIndex((student) => student.id === updatedStudent.id)

  if (index !== -1) {
    students.value[index] = updatedStudent
    localStorage.setItem('students', JSON.stringify(students.value))
  }

  openEditModal.value = false
}

const theadLabels = ['Index', 'Name', 'DoB', 'Municipality', 'Action']

onMounted(() => {
  const saved = localStorage.getItem('students')
  students.value = saved
    ? JSON.parse(saved)
    : [
        {
          id: 1458,
          name: 'Mergim Bajrami',
          dob: '1989-10-05',
          municipality: 'Prishtine',
        },
        {
          id: 1452,
          name: 'Blerton Rexha',
          dob: '1989-10-05',
          municipality: 'Prishtine',
        },
        {
          id: 1461,
          name: 'Abdullah Krasniqi',
          dob: '1989-10-05',
          municipality: 'Prishtine',
        },
        {
          id: 1472,
          name: 'Sami Salihu',
          dob: '1989-10-05',
          municipality: 'Prishtine',
        },
        {
          id: 1491,
          name: 'Visar Uruqi',
          dob: '1989-10-05',
          municipality: 'Prishtine',
        },
        {
          id: 1232,
          name: 'Naim Krasniqi',
          dob: '1989-10-05',
          municipality: 'Prishtine',
        },
      ]

  localStorage.setItem('students', JSON.stringify(students.value))
})
</script>

<template>
  <div class="p-8">
    <!-- Top controls -->
    <div class="flex items-center justify-between mb-4">
      <SearchBar v-model="search" />
      <!--
      Vue automatically converts it to:
        <SearchBar
          :modelValue="search"
          @update:modelValue="search = $event"
        />
      -->

      <button
        class="rounded border border-gray-400 bg-gray-200 px-3 py-1 text-sm cursor-pointer hover:bg-gray-300 active:bg-gray-400"
        @click="showRegisterModal"
      >
        Register New Student
      </button>
    </div>

    <RegisterModal
      v-if="openRegisterModal"
      @save="handleSaveStudent"
      @close="openRegisterModal = false"
    />

    <EditModal
      v-if="openEditModal"
      :student="editingStudent"
      @update="handleUpdateStudent"
      @close="openEditModal = false"
    />

    <!-- Table -->
    <div class="overflow-x-auto border border-gray-400">
      <TableBase :students="filteredStudents" :theadLabels="theadLabels">
        <template #row="{ student }">
          <td class="border border-gray-400 px-2 py-1">
            {{ student.id }}
          </td>
          <td class="border border-gray-400 px-2 py-1">
            {{ student.name }}
          </td>
          <td class="border border-gray-400 px-2 py-1">
            {{ student.dob }}
          </td>
          <td class="border border-gray-400 px-2 py-1">
            {{ student.municipality }}
          </td>
          <td class="border border-gray-400 px-2 py-1 space-x-2">
            <button
              @click="openEdit(student)"
              class="text-blue-600 underline hover:text-blue-800 cursor-pointer"
            >
              Edit
            </button>
            <button class="text-blue-600 underline hover:text-blue-800 cursor-pointer">
              Delete
            </button>
          </td>
        </template>
      </TableBase>
    </div>
  </div>
</template>
