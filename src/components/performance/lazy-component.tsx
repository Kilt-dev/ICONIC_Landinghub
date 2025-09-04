import type React from "react"
import { Suspense, lazy, type ComponentType } from "react"
import { Loader2 } from "lucide-react"

interface LazyComponentProps {
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function LazyComponent({ fallback, children }: LazyComponentProps) {
  const defaultFallback = (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="ml-2 text-muted-foreground">Đang tải...</span>
    </div>
  )

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>
}

// HOC for lazy loading components
export function withLazyLoading<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode,
) {
  const LazyLoadedComponent = lazy(importFn)

  return function WrappedComponent(props: P) {
    return (
      <LazyComponent fallback={fallback}>
        <LazyLoadedComponent {...props} />
      </LazyComponent>
    )
  }
}
