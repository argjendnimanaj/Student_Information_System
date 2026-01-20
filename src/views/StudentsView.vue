<script setup>
import DeleteModal from '@/assets/components/modals/DeleteModal.vue'
import EditModal from '@/assets/components/modals/EditModal.vue'
import RegisterModal from '@/assets/components/modals/RegisterModal.vue'
import SearchBar from '@/assets/components/SearchBar.vue'
import TableBase from '@/assets/components/TableBase.vue'
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/useSorting'
import { useStudentsStore } from '@/stores/studentsStore'
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'

const search = ref('')

const currentPage = ref(1)
const pageSize = 10
const studentsStore = useStudentsStore()
const { students } = storeToRefs(studentsStore)
const { addStudent, editStudent, deleteStudent } = studentsStore

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
const { sortedStudents } = useSorting(filteredStudents, sortKey, sortDirection)

const sortBy = (label) => {
  sortKey.value = label.toLowerCase()
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

const totalPages = computed(() => Math.ceil(filteredStudents.value.length / pageSize))

const { paginatedItems: paginatedStudents } = usePagination(sortedStudents, currentPage)

watch(search, () => {
  currentPage.value = 1
})

/**
 * Registering a new student.
 */
const openRegisterModal = ref(false)
const showRegisterModal = () => (openRegisterModal.value = true)

const handleSaveStudent = (student) => {
  addStudent(student)
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
  editStudent(updatedStudent)
  openEditModal.value = false
}

/**
 * Deleting an existing student and adding him to the archived.
 */
const openDeleteModal = ref(false)
const deletingStudent = ref(null)
const showDeleteModal = (student) => {
  openDeleteModal.value = true
  deletingStudent.value = { ...student }
}

const handleDeleteStudent = () => {
  deleteStudent(deletingStudent.value)
  openDeleteModal.value = false
}

const theadLabels = ['Index', 'Name', 'Date of Birth', 'Municipality', 'Action']
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
