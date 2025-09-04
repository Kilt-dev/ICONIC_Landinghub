"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo)
    }

    // Call custom error handler
    this.props.onError?.(error, errorInfo)

    // Log to external service in production
    if (process.env.NODE_ENV === "production") {
      this.logErrorToService(error, errorInfo)
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In a real app, you would send this to an error tracking service like Sentry
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    console.error("Error logged to service:", errorData)
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  private handleGoHome = () => {
    window.location.href = "/"
  }

  private handleReportBug = () => {
    const subject = encodeURIComponent("Báo lỗi từ LandingHub")
    const body = encodeURIComponent(`
Mô tả lỗi: ${this.state.error?.message || "Không xác định"}

Chi tiết kỹ thuật:
- URL: ${window.location.href}
- Thời gian: ${new Date().toLocaleString("vi-VN")}
- Trình duyệt: ${navigator.userAgent}

Stack trace:
${this.state.error?.stack || "Không có"}
    `)

    window.open(`mailto:support@landinghub.vn?subject=${subject}&body=${body}`)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-xl font-bold text-foreground">Oops! Có lỗi xảy ra</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center">
                Chúng tôi xin lỗi vì sự bất tiện này. Một lỗi không mong muốn đã xảy ra.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium text-destructive mb-2">
                    Thông tin lỗi (chỉ hiển thị trong development):
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">{this.state.error.message}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={this.handleRetry} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Thử lại
                </Button>

                <Button variant="outline" onClick={this.handleGoHome} className="flex-1 bg-transparent">
                  <Home className="w-4 h-4 mr-2" />
                  Về trang chủ
                </Button>
              </div>

              <Button variant="ghost" onClick={this.handleReportBug} className="w-full text-sm">
                <Bug className="w-4 h-4 mr-2" />
                Báo cáo lỗi
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error("Error caught by useErrorHandler:", error, errorInfo)

    // In production, log to external service
    if (process.env.NODE_ENV === "production") {
      // Log to error tracking service
    }
  }
}
