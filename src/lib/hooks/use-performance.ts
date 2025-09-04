"use client"

import { useEffect, useRef, useState } from "react"

interface PerformanceMetrics {
  renderTime: number
  memoryUsage?: number
  fps: number
}

export function usePerformance(componentName: string) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    fps: 0,
  })

  const renderStartTime = useRef<number>()
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    renderStartTime.current = performance.now()

    return () => {
      if (renderStartTime.current) {
        const renderTime = performance.now() - renderStartTime.current

        // Get memory usage if available
        const memoryUsage = (performance as any).memory?.usedJSHeapSize

        setMetrics((prev) => ({
          ...prev,
          renderTime,
          memoryUsage,
        }))

        // Log performance in development
        if (process.env.NODE_ENV === "development") {
          console.log(`[Performance] ${componentName}:`, {
            renderTime: `${renderTime.toFixed(2)}ms`,
            memoryUsage: memoryUsage ? `${(memoryUsage / 1024 / 1024).toFixed(2)}MB` : "N/A",
          })
        }
      }
    }
  })

  // FPS monitoring
  useEffect(() => {
    let animationId: number

    const measureFPS = () => {
      frameCount.current++
      const now = performance.now()

      if (now >= lastTime.current + 1000) {
        const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current))
        setMetrics((prev) => ({ ...prev, fps }))

        frameCount.current = 0
        lastTime.current = now
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => cancelAnimationFrame(animationId)
  }, [])

  return metrics
}
