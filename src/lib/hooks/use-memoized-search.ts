"use client"

import { useMemo } from "react"
import { useDebounce } from "./use-debounce"
import { memoryCache } from "@/lib/utils/cache"

export function useMemoizedSearch<T>(
  data: T[],
  searchTerm: string,
  searchFn: (item: T, term: string) => boolean,
  deps: any[] = [],
) {
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  return useMemo(() => {
    if (!debouncedSearchTerm.trim()) return data

    // Create cache key
    const cacheKey = `search:${debouncedSearchTerm}:${JSON.stringify(deps)}`

    // Check cache first
    const cached = memoryCache.get<T[]>(cacheKey)
    if (cached) return cached

    // Perform search
    const results = data.filter((item) => searchFn(item, debouncedSearchTerm))

    // Cache results
    memoryCache.set(cacheKey, results, 2 * 60 * 1000) // 2 minutes

    return results
  }, [data, debouncedSearchTerm, searchFn, ...deps])
}
