<script setup>
import ArchiveModal from '@/assets/components/modals/ArchiveModal.vue'
import SearchBar from '@/assets/components/SearchBar.vue'
import TableBase from '@/assets/components/TableBase.vue'
import { usePagination } from '@/composables/usePagination'
import { useSorting } from '@/composables/useSorting'
import { useStudentsStore } from '@/stores/studentsStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const search = ref('')
const currentPage = ref(1)
const pageSize = 10
const studentsStore = useStudentsStore();
const { archivedStudents } = storeToRefs(studentsStore)
const { loadArchivedStudents, restoreStudent: restoreFunc } = studentsStore

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

const sortKey = ref(null)
const sortDirection = ref('desc')
const { sortedStudents: sortedArchived } = useSorting(filteredArchived, sortKey, sortDirection)

const sortBy = (label) => {
  sortKey.value = label.toLowerCase()
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

const totalPages = computed(() => Math.ceil(filteredArchived.value.length / pageSize))
const { paginatedItems: paginatedArchived } = usePagination(sortedArchived, currentPage)

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
  restoreFunc(restoringStudent.value)
  openRestoreModal.value = false
}

const theadLabels = ['ID', 'Name', 'Date of Birth', 'Municipality', 'Archive Date', 'Actions']

onMounted(() => {
  loadArchivedStudents()
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
      <TableBase
        :students="paginatedArchived"
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
