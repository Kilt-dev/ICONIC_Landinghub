"use client"

import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FormErrorProps {
  error?: string | string[]
  className?: string
  onDismiss?: () => void
}

export function FormError({ error, className, onDismiss }: FormErrorProps) {
  if (!error) return null

  const errors = Array.isArray(error) ? error : [error]

  return (
    <div className={cn("rounded-lg border border-destructive/20 bg-destructive/10 p-4", className)}>
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          {errors.length === 1 ? (
            <p className="text-sm text-destructive">{errors[0]}</p>
          ) : (
            <ul className="text-sm text-destructive space-y-1">
              {errors.map((err, index) => (
                <li key={index}>• {err}</li>
              ))}
            </ul>
          )}
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

interface FieldErrorProps {
  error?: string
  className?: string
}

export function FieldError({ error, className }: FieldErrorProps) {
  if (!error) return null

  return <p className={cn("text-sm text-destructive mt-1", className)}>{error}</p>
}
