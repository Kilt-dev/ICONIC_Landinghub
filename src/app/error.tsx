"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">Có lỗi xảy ra</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center">
            Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng thử lại hoặc quay về trang chủ.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium text-destructive mb-2">Chi tiết lỗi (development):</p>
              <p className="text-xs text-muted-foreground font-mono">{error.message}</p>
              {error.digest && <p className="text-xs text-muted-foreground font-mono mt-1">Digest: {error.digest}</p>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Thử lại
            </Button>

            <Button variant="outline" onClick={() => (window.location.href = "/")} className="flex-1">
              <Home className="w-4 h-4 mr-2" />
              Về trang chủ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
