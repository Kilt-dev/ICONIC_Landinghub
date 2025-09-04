"use client"

import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, AlertCircle } from "lucide-react"

interface RetryWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  maxRetries?: number
  onRetry?: () => void | Promise<void>
}

export function RetryWrapper({ children, fallback, maxRetries = 3, onRetry }: RetryWrapperProps) {
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    if (retryCount >= maxRetries) return

    setIsRetrying(true)
    try {
      await onRetry?.()
      setRetryCount(0) // Reset on successful retry
    } catch (error) {
      setRetryCount((prev) => prev + 1)
    } finally {
      setIsRetrying(false)
    }
  }

  if (retryCount > 0) {
    return (
      fallback || (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">Có lỗi xảy ra</CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">Không thể tải nội dung. Vui lòng thử lại.</p>

            <div className="text-sm text-muted-foreground">
              Lần thử: {retryCount}/{maxRetries}
            </div>

            {retryCount < maxRetries && (
              <Button onClick={handleRetry} disabled={isRetrying} className="w-full">
                {isRetrying ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Đang thử lại...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Thử lại
                  </>
                )}
              </Button>
            )}

            {retryCount >= maxRetries && (
              <div className="text-sm text-destructive">
                Đã thử {maxRetries} lần. Vui lòng tải lại trang hoặc liên hệ hỗ trợ.
              </div>
            )}
          </CardContent>
        </Card>
      )
    )
  }

  return <>{children}</>
}
