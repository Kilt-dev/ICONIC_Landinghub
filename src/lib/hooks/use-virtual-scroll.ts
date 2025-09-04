"use client"

import type React from "react"

import { useState, useMemo } from "react"

interface UseVirtualScrollProps {
  items: any[]
  itemHeight: number
  containerHeight: number
  overscan?: number
}

export function useVirtualScroll({ items, itemHeight, containerHeight, overscan = 5 }: UseVirtualScrollProps) {
  const [scrollTop, setScrollTop] = useState(0)

  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    const endIndex = Math.min(items.length - 1, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan)

    const visibleItemsArray = []
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItemsArray.push({
        index: i,
        item: items[i],
        offsetTop: i * itemHeight,
      })
    }

    return visibleItemsArray
  }, [items, itemHeight, scrollTop, containerHeight, overscan])

  const totalHeight = items.length * itemHeight

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return {
    visibleItems,
    totalHeight,
    handleScroll,
    scrollTop,
  }
}
