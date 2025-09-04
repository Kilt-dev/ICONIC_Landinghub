import type React from "react"
import { useVirtualScroll } from "@/lib/hooks/use-virtual-scroll"
import { cn } from "@/lib/utils"

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  height: number
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  overscan?: number
}

export function VirtualList<T>({
  items,
  itemHeight,
  height,
  renderItem,
  className,
  overscan = 5,
}: VirtualListProps<T>) {
  const { visibleItems, totalHeight, handleScroll } = useVirtualScroll({
    items,
    itemHeight,
    containerHeight: height,
    overscan,
  })

  return (
    <div className={cn("overflow-auto", className)} style={{ height }} onScroll={handleScroll}>
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map(({ item, index, offsetTop }) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: offsetTop,
              left: 0,
              right: 0,
              height: itemHeight,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}
