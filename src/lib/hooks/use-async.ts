"use client"

import { useState, useCallback } from "react"
import { useErrorHandler } from "@/lib/utils/error-handler"

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface UseAsyncOptions {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  retryCount?: number
  retryDelay?: number
}

export function useAsync<T>(asyncFunction: (...args: any[]) => Promise<T>, options: UseAsyncOptions = {}) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const { handleError } = useErrorHandler()
  const { onSuccess, onError, retryCount = 3, retryDelay = 1000 } = options

  const execute = useCallback(
    async (...args: any[]) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      let lastError: Error | null = null

      for (let attempt = 0; attempt <= retryCount; attempt++) {
        try {
          const data = await asyncFunction(...args)
          setState({ data, loading: false, error: null })
          onSuccess?.(data)
          return data
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error))

          // Don't retry on certain errors
          if (
            lastError.name === "AuthenticationError" ||
            lastError.name === "AuthorizationError" ||
            lastError.name === "ValidationError"
          ) {
            break
          }

          // Wait before retry (except on last attempt)
          if (attempt < retryCount) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, attempt)))
          }
        }
      }

      setState((prev) => ({ ...prev, loading: false, error: lastError }))
      handleError(lastError, "useAsync")
      onError?.(lastError!)
      throw lastError
    },
    [asyncFunction, handleError, onSuccess, onError, retryCount, retryDelay],
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}
