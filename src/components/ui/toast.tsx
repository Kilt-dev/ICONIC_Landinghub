"use client"

import * as React from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast, type Toast } from "@/lib/hooks/use-toast"

const ToastProvider = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
      {...props}
    />
  ),
)
ToastProvider.displayName = "ToastProvider"

const ToastViewport = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      tabIndex={-1}
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className,
      )}
      {...props}
    />
  ),
)
ToastViewport.displayName = "ToastViewport"

const ToastComponent = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & {
    toast: Toast
  }
>(({ className, toast, ...props }, ref) => {
  const { removeToast } = useToast()

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const Icon = icons[toast.type]

  const colorClasses = {
    success: "border-green-200 bg-green-50 text-green-900",
    error: "border-red-200 bg-red-50 text-red-900",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
    info: "border-blue-200 bg-blue-50 text-blue-900",
  }

  return (
    <li
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        colorClasses[toast.type],
        className,
      )}
      {...props}
    >
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 space-y-1">
          <div className="text-sm font-semibold">{toast.title}</div>
          {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
          {toast.action && (
            <Button
              size="sm"
              variant="outline"
              className="mt-2 h-8 text-xs bg-transparent"
              onClick={toast.action.onClick}
            >
              {toast.action.label}
            </Button>
          )}
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="absolute right-2 top-2 h-6 w-6 p-0 opacity-60 hover:opacity-100"
        onClick={() => removeToast(toast.id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </li>
  )
})
ToastComponent.displayName = "Toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} />
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

export { ToastProvider, ToastViewport, ToastComponent as Toast }
