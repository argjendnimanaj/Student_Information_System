import { computed, unref } from 'vue'

export function useSorting(items, sortKey, sortDirection) {
  const sortedStudents = computed(() => {
    // If any of these change -> re-run this computed
    const students = unref(items)
    const key = unref(sortKey)
    const direction = unref(sortDirection)

    if (!key) return students

    return [...students].sort((a, b) => {
      if (key === 'date of birth') {
        let dateA = a.dob
        let dateB = b.dob
        dateA = new Date(dateA)
        dateB = new Date(dateB)

        return direction === 'asc' ? dateA - dateB : dateB - dateA
      }

      if (key === 'name') {
        return direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }

      if (key === 'municipality') {
        return direction === 'asc'
          ? a.municipality.localeCompare(b.municipality)
          : b.municipality.localeCompare(a.municipality)
      }

      return
    })
  })

  return { sortedStudents }
}
