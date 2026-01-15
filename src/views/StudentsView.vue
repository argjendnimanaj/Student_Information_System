<script setup>
import DeleteModal from '@/assets/components/modals/DeleteModal.vue'
import EditModal from '@/assets/components/modals/EditModal.vue'
import RegisterModal from '@/assets/components/modals/RegisterModal.vue'
import SearchBar from '@/assets/components/SearchBar.vue'
import TableBase from '@/assets/components/TableBase.vue'
import { ref, computed, onMounted, watch } from 'vue'

const students = ref([])
const search = ref('')

const currentPage = ref(1)
const pageSize = 10
const archivedStudents = ref(JSON.parse(localStorage.getItem('archivedStudents')))

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

const sortKey = ref(null)
const sortDirection = ref('desc')
const sortedStudents = computed(() => {
  if (!sortKey.value) return filteredStudents.value

  return [...filteredStudents.value].sort((a, b) => {
    if (sortKey.value === 'date of birth') {
      let dateA = a.dob
      let dateB = b.dob
      dateA = new Date(dateA)
      dateB = new Date(dateB)

      return sortDirection.value === 'asc' ? dateA - dateB : dateB - dateA
    }

    if (sortKey.value === 'name') {
      return sortDirection.value === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    }

    if (sortKey.value === 'municipality') {
      return sortDirection.value === 'asc'
        ? a.municipality.localeCompare(b.municipality)
        : b.municipality.localeCompare(a.municipality)
    }

    return
  })
})

const sortBy = (label) => {
  sortKey.value = label.toLowerCase()
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

const totalPages = computed(() => Math.ceil(filteredStudents.value.length / pageSize))

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return sortedStudents.value.slice(start, end)
})

watch(search, () => {
  currentPage.value = 1
})

/**
 * Registering a new student.
 */
const openRegisterModal = ref(false)
const showRegisterModal = () => (openRegisterModal.value = true)

const handleSaveStudent = (student) => {
  students.value.push(student)
  localStorage.setItem('students', JSON.stringify(students.value))
  openRegisterModal.value = false
}

/**
 * Editing an existing student.
 */
const openEditModal = ref(false)
const editingStudent = ref(null)
const openEdit = (student) => {
  editingStudent.value = { ...student }
  openEditModal.value = true
}

const handleUpdateStudent = (updatedStudent) => {
  const id = findStudent(updatedStudent)
  if (id !== -1) {
    students.value[id] = updatedStudent
    updateLocalStorages()
  }

  openEditModal.value = false
}

/**
 * Deleting an existing student and add him to the archived.
 */
const openDeleteModal = ref(false)
const deletingStudent = ref(null)
const showDeleteModal = (student) => {
  openDeleteModal.value = true
  deletingStudent.value = { ...student }
}

const handleDeleteStudent = () => {
  const index = findStudent(deletingStudent.value)
  if (index !== -1) {
    students.value.splice(index, 1)
    archivedStudents.value.push(deletingStudent.value)
    updateLocalStorages()
  }

  openDeleteModal.value = false
}

/**
 * Reusable functions
 */
const findStudent = (student) => students.value.findIndex((s) => s.id === student.id)
const updateLocalStorages = () => {
  localStorage.setItem('students', JSON.stringify(students.value))
  localStorage.setItem('archivedStudents', JSON.stringify(archivedStudents.value))
}

const theadLabels = ['Index', 'Name', 'Date of Birth', 'Municipality', 'Action']

onMounted(() => {
  const saved = localStorage.getItem('students')
  students.value = saved
    ? JSON.parse(saved)
    : [
        { id: 1458, name: 'Mergim Bajrami', dob: '1989-10-05', municipality: 'Prishtine' },
        { id: 1459, name: 'Arta Krasniqi', dob: '1990-03-12', municipality: 'Prizren' },
        { id: 1460, name: 'Flamur Dervishi', dob: '1988-07-22', municipality: 'Gjilan' },
        { id: 1461, name: 'Liridona Ahmeti', dob: '1991-01-15', municipality: 'Ferizaj' },
        { id: 1462, name: 'Besnik Rexhepi', dob: '1987-11-30', municipality: 'Peja' },
        { id: 1463, name: 'Valentina Shala', dob: '1992-05-08', municipality: 'Mitrovica' },
        { id: 1464, name: 'Driton Kelmendi', dob: '1989-09-14', municipality: 'Gjakova' },
        { id: 1465, name: 'Elsa Berisha', dob: '1990-12-03', municipality: 'Vushtrri' },
        { id: 1466, name: 'Ilir Hasani', dob: '1988-04-19', municipality: 'Podujeva' },
        { id: 1467, name: 'Sara Musliu', dob: '1991-08-27', municipality: 'Lipjan' },
        { id: 1469, name: 'Fjolla Gashi', dob: '1990-02-28', municipality: 'Prizren' },
        { id: 1470, name: 'Gentian Leka', dob: '1988-10-17', municipality: 'Gjilan' },
        { id: 1471, name: 'Hana Ismajli', dob: '1991-04-09', municipality: 'Ferizaj' },
        { id: 1472, name: 'Kujtim Veliqi', dob: '1987-12-25', municipality: 'Peja' },
        { id: 1473, name: 'Linda Kelmendi', dob: '1992-07-04', municipality: 'Mitrovica' },
        { id: 1474, name: 'Mirsad Krasniqi', dob: '1989-11-21', municipality: 'Gjakova' },
        { id: 1475, name: 'Nora Ahmetaj', dob: '1990-08-16', municipality: 'Vushtrri' },
        { id: 1476, name: 'Orhan Dervishi', dob: '1988-03-30', municipality: 'Podujeva' },
        { id: 1477, name: 'Rina Shala', dob: '1991-09-13', municipality: 'Lipjan' },
        { id: 1478, name: 'Arben Thaçi', dob: '1989-06-11', municipality: 'Prishtine' },
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

    <DeleteModal
      v-if="openDeleteModal"
      :student="deletingStudent"
      @delete="handleDeleteStudent"
      @close="openDeleteModal = false"
    />

    <!-- Table -->
    <div class="overflow-x-auto border border-gray-400">
      <TableBase
        :students="paginatedStudents"
        :theadLabels="theadLabels"
        :sortKey="sortKey"
        :sortDirection="sortDirection"
        @sort="sortBy"
      >
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
            <button
              @click="showDeleteModal(student)"
              class="text-blue-600 underline hover:text-blue-800 cursor-pointer"
            >
              Delete
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
