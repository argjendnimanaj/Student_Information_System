import { computed, unref } from 'vue'

export function usePagination(items, currentPage, pageSize = 10) {
  const paginatedItems = computed(() => {
    const list = unref(items)
    const page = unref(currentPage)
    const size = unref(pageSize)

    const start = (page - 1) * size
    const end = start + size

    return list.slice(start, end)
  })

  return { paginatedItems }
}
