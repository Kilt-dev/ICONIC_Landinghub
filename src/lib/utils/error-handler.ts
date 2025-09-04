"use client"

import { useToast } from "@/lib/hooks/use-toast"
import { useNotifications } from "@/lib/hooks/use-notifications"

export interface AppError extends Error {
  code?: string
  statusCode?: number
  context?: Record<string, any>
}

export class NetworkError extends Error implements AppError {
  code = "NETWORK_ERROR"
  statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = "NetworkError"
    this.statusCode = statusCode
  }
}

export class ValidationError extends Error implements AppError {
  code = "VALIDATION_ERROR"
  context?: Record<string, any>

  constructor(message: string, context?: Record<string, any>) {
    super(message)
    this.name = "ValidationError"
    this.context = context
  }
}

export class AuthenticationError extends Error implements AppError {
  code = "AUTH_ERROR"
  statusCode = 401

  constructor(message = "Bạn cần đăng nhập để thực hiện hành động này") {
    super(message)
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends Error implements AppError {
  code = "AUTHORIZATION_ERROR"
  statusCode = 403

  constructor(message = "Bạn không có quyền thực hiện hành động này") {
    super(message)
    this.name = "AuthorizationError"
  }
}

export class NotFoundError extends Error implements AppError {
  code = "NOT_FOUND"
  statusCode = 404

  constructor(message = "Không tìm thấy tài nguyên yêu cầu") {
    super(message)
    this.name = "NotFoundError"
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === "string") {
    return error
  }

  return "Đã xảy ra lỗi không xác định"
}

export function getErrorCode(error: unknown): string | undefined {
  if (error && typeof error === "object" && "code" in error) {
    return (error as AppError).code
  }

  return undefined
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof NetworkError || (error instanceof Error && error.message.includes("fetch"))
}

export function isValidationError(error: unknown): boolean {
  return error instanceof ValidationError
}

export function isAuthError(error: unknown): boolean {
  return error instanceof AuthenticationError || error instanceof AuthorizationError
}

export class ErrorHandler {
  private static instance: ErrorHandler
  private toastFn?: (toast: any) => void
  private notificationFn?: (notification: any) => void

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }

  setToastFunction(toastFn: (toast: any) => void) {
    this.toastFn = toastFn
  }

  setNotificationFunction(notificationFn: (notification: any) => void) {
    this.notificationFn = notificationFn
  }

  handle(error: unknown, context?: string) {
    const message = getErrorMessage(error)
    const code = getErrorCode(error)

    console.error(`[ErrorHandler] ${context || "Unknown context"}:`, error)

    // Show appropriate user feedback
    if (isNetworkError(error)) {
      this.showNetworkError(message)
    } else if (isValidationError(error)) {
      this.showValidationError(message, (error as ValidationError).context)
    } else if (isAuthError(error)) {
      this.showAuthError(message)
    } else {
      this.showGenericError(message)
    }

    // Log to external service in production
    if (process.env.NODE_ENV === "production") {
      this.logToExternalService(error, context)
    }
  }

  private showNetworkError(message: string) {
    this.toastFn?.({
      type: "error",
      title: "Lỗi kết nối",
      description: "Vui lòng kiểm tra kết nối internet và thử lại",
      action: {
        label: "Thử lại",
        onClick: () => window.location.reload(),
      },
    })
  }

  private showValidationError(message: string, context?: Record<string, any>) {
    this.toastFn?.({
      type: "warning",
      title: "Dữ liệu không hợp lệ",
      description: message,
    })
  }

  private showAuthError(message: string) {
    this.toastFn?.({
      type: "error",
      title: "Lỗi xác thực",
      description: message,
      action: {
        label: "Đăng nhập",
        onClick: () => (window.location.href = "/auth/signin"),
      },
    })
  }

  private showGenericError(message: string) {
    this.toastFn?.({
      type: "error",
      title: "Có lỗi xảy ra",
      description: message,
    })

    this.notificationFn?.({
      type: "error",
      title: "Lỗi hệ thống",
      message: message,
    })
  }

  private logToExternalService(error: unknown, context?: string) {
    // In a real app, send to error tracking service like Sentry
    const errorData = {
      message: getErrorMessage(error),
      code: getErrorCode(error),
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      stack: error instanceof Error ? error.stack : undefined,
    }

    console.log("Would log to external service:", errorData)
  }
}

export const errorHandler = ErrorHandler.getInstance()

// React hook for error handling
export function useErrorHandler() {
  const { addToast } = useToast()
  const { addNotification } = useNotifications()

  // Set up the error handler with toast and notification functions
  errorHandler.setToastFunction(addToast)
  errorHandler.setNotificationFunction(addNotification)

  return {
    handleError: (error: unknown, context?: string) => {
      errorHandler.handle(error, context)
    },
    createError: {
      network: (message: string, statusCode?: number) => new NetworkError(message, statusCode),
      validation: (message: string, context?: Record<string, any>) => new ValidationError(message, context),
      auth: (message?: string) => new AuthenticationError(message),
      authorization: (message?: string) => new AuthorizationError(message),
      notFound: (message?: string) => new NotFoundError(message),
    },
  }
}
