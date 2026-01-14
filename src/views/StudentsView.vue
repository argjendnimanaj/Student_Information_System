<script setup>
import RegisterModal from '@/assets/components/RegisterModal.vue'
import { ref, computed, onMounted } from 'vue'

const students = ref([])
const search = ref('')

const showModal = ref(false)
const showRegisterModal = () => (showModal.value = true)

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
  showModal.value = false
}

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
      <input
        type="text"
        placeholder="Search"
        v-model="search"
        class="w-64 rounded-full border border-gray-400 px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
      />

      <button
        class="rounded border border-gray-400 bg-gray-200 px-3 py-1 text-sm cursor-pointer hover:bg-gray-300 active:bg-gray-400"
        @click="showRegisterModal"
      >
        Register New Student
      </button>
    </div>

    <RegisterModal v-if="showModal" @save="handleSaveStudent" @close="showModal = false" />

    <!-- Table -->
    <div class="overflow-x-auto border border-gray-400">
      <table class="w-full border-collapse text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-400 px-2 py-1 text-left">Index</th>
            <th class="border border-gray-400 px-2 py-1 text-left">Name</th>
            <th class="border border-gray-400 px-2 py-1 text-left">DoB</th>
            <th class="border border-gray-400 px-2 py-1 text-left">Municipality</th>
            <th class="border border-gray-400 px-2 py-1 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="student in filteredStudents"
            :key="student.id"
            class="even:bg-white odd:bg-gray-100"
          >
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
              <button class="text-blue-600 underline hover:text-blue-800 cursor-pointer">
                Edit
              </button>
              <button class="text-blue-600 underline hover:text-blue-800 cursor-pointer">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
