<script setup>
import ArchiveModal from '@/assets/components/modals/ArchiveModal.vue'
import SearchBar from '@/assets/components/SearchBar.vue'
import TableBase from '@/assets/components/TableBase.vue'
import { computed, onMounted, ref } from 'vue'

const search = ref('')
const archivedStudents = ref([])

const currentPage = ref(1)
const pageSize = 10
const students = ref(JSON.parse(localStorage.getItem('students')))

const filteredArchived = computed(() => {
  if (!search.value) return archivedStudents.value

  const query = search.value.toLowerCase()
  return archivedStudents.value.filter(
    (student) =>
      student.name.toLowerCase().includes(query) ||
      student.dob.toLowerCase().includes(query) ||
      student.municipality.toLowerCase().includes(query),
  )
})

const totalPages = computed(() => Math.ceil(filteredArchived.value.length / pageSize))
const paginatedArchived = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredArchived.value.slice(start, end)
})

/**
 * Restore the selected user
 */
const openRestoreModal = ref(false)
const restoringStudent = ref(null)
const restoreStudent = (student) => {
  restoringStudent.value = { ...student }
  openRestoreModal.value = true
}

const handleRestore = () => {
  students.value.push(restoringStudent.value)

  const index = findStudent(restoringStudent.value)
  archivedStudents.value.splice(index, 1)

  updateLocalStorages()
  openRestoreModal.value = false
}

/**
 * Reusable functions
 */
const findStudent = (student) => archivedStudents.value.findIndex((s) => s.id === student.id)

const updateLocalStorages = () => {
  localStorage.setItem('archivedStudents', JSON.stringify(archivedStudents.value))
  localStorage.setItem('students', JSON.stringify(students.value))
}

const theadLabels = ['ID', 'Name', 'Date of Birth', 'Municipality', 'Archive Date', 'Actions']

onMounted(() => {
  const saved = localStorage.getItem('archivedStudents')

  archivedStudents.value = saved
    ? JSON.parse(saved)
    : [
        {
          id: 1000,
          name: 'Alice Johnson',
          dob: '2005-03-15',
          municipality: 'New York',
          archivedAt: '2023-06-01',
        },
        {
          id: 1001,
          name: 'Bob Smith',
          dob: '2004-07-22',
          municipality: 'Los Angeles',
          archivedAt: '2022-12-15',
        },
        {
          id: 1002,
          name: 'Charlie Brown',
          dob: '2006-01-10',
          municipality: 'Chicago',
          archivedAt: '2024-02-20',
        },
        {
          id: 1003,
          name: 'Diana Prince',
          dob: '2005-09-05',
          municipality: 'Houston',
          archivedAt: '2023-08-10',
        },
        {
          id: 1004,
          name: 'Ethan Hunt',
          dob: '2004-11-30',
          municipality: 'Phoenix',
          archivedAt: '2022-10-05',
        },
        {
          id: 1005,
          name: 'Fiona Green',
          dob: '2006-04-18',
          municipality: 'Philadelphia',
          archivedAt: '2024-01-12',
        },
        {
          id: 1006,
          name: 'George Miller',
          dob: '2005-12-07',
          municipality: 'San Antonio',
          archivedAt: '2023-11-25',
        },
        {
          id: 1007,
          name: 'Hannah Lee',
          dob: '2004-05-14',
          municipality: 'San Diego',
          archivedAt: '2022-09-30',
        },
        {
          id: 1008,
          name: 'Ian Clark',
          dob: '2006-08-25',
          municipality: 'Dallas',
          archivedAt: '2024-03-18',
        },
        {
          id: 1009,
          name: 'Julia Roberts',
          dob: '2005-06-12',
          municipality: 'San Jose',
          archivedAt: '2023-07-22',
        },
      ]

  localStorage.setItem('archivedStudents', JSON.stringify(archivedStudents.value))
})
</script>

<template>
  <div class="p-8">
    <div class="mb-4">
      <SearchBar v-model="search" />
    </div>

    <ArchiveModal
      v-if="openRestoreModal"
      :student="restoringStudent"
      @close="openRestoreModal = false"
      @restore="handleRestore"
    />

    <!-- Table -->
    <div class="overflow-x-auto border border-gray-400">
      <TableBase :students="paginatedArchived" :theadLabels="theadLabels">
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
          <td class="border border-gray-400 px-2 py-1">
            {{ student.archivedAt }}
          </td>
          <td class="border border-gray-400 px-2 py-1 space-x-2">
            <button
              @click="restoreStudent(student)"
              class="text-blue-600 underline hover:text-blue-800 cursor-pointer"
            >
              Restore
            </button>
          </td>
        </template>
      </TableBase>
    </div>
    <div v-if="totalPages > 1" class="mt-4 flex items-center justify-end gap-2 text-sm">
      <button
        class="border px-3 py-1 disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        Prev
      </button>

      <span> Page {{ currentPage }} of {{ totalPages }} </span>

      <button
        class="border px-3 py-1 disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next
      </button>
    </div>
  </div>
</template>
