"use client"

import { useState, useMemo } from "react"
import { useDebounce } from "./use-debounce"

export interface SearchFilters {
  query: string
  categories: string[]
  priceRange: [number, number]
  minRating: number
  location: string
  propertyType: string[]
  sortBy: string
  tags: string[]
}

export interface SearchResult<T> {
  items: T[]
  total: number
  hasMore: boolean
  suggestions: string[]
}

export function useSearch<T>(
  data: T[],
  searchFn: (item: T, filters: SearchFilters) => boolean,
  sortFn: (a: T, b: T, sortBy: string) => number,
  getSuggestions: (query: string, data: T[]) => string[] = () => [],
) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    categories: ["Tất cả"],
    priceRange: [0, 10000],
    minRating: 0,
    location: "",
    propertyType: [],
    sortBy: "featured",
    tags: [],
  })

  const [page, setPage] = useState(1)
  const [pageSize] = useState(12)

  const debouncedQuery = useDebounce(filters.query, 300)

  const searchResults = useMemo(() => {
    const debouncedFilters = { ...filters, query: debouncedQuery }

    // Filter items
    const filteredItems = data.filter((item) => searchFn(item, debouncedFilters))

    // Sort items
    const sortedItems = [...filteredItems].sort((a, b) => sortFn(a, b, filters.sortBy))

    // Paginate
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedItems = sortedItems.slice(startIndex, endIndex)

    // Get suggestions
    const suggestions = debouncedQuery.length > 0 ? getSuggestions(debouncedQuery, data) : []

    return {
      items: paginatedItems,
      total: filteredItems.length,
      hasMore: endIndex < sortedItems.length,
      suggestions,
    }
  }, [data, debouncedQuery, filters, page, pageSize, searchFn, sortFn, getSuggestions])

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setPage(1) // Reset to first page when filters change
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      categories: ["Tất cả"],
      priceRange: [0, 10000],
      minRating: 0,
      location: "",
      propertyType: [],
      sortBy: "featured",
      tags: [],
    })
    setPage(1)
  }

  const loadMore = () => {
    if (searchResults.hasMore) {
      setPage((prev) => prev + 1)
    }
  }

  return {
    filters,
    updateFilters,
    clearFilters,
    searchResults,
    page,
    setPage,
    loadMore,
    isLoading: false, // Could be used for async search
  }
}
