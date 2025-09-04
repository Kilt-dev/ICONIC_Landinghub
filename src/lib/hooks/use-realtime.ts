"use client"

import { useEffect, useRef } from "react"
import { useNotifications } from "./use-notifications"
import { useToast } from "./use-toast"

interface RealtimeEvent {
  type: "price_update" | "inventory_change" | "new_project" | "user_action"
  data: any
  timestamp: Date
}

export function useRealtime() {
  const { addNotification } = useNotifications()
  const { addToast } = useToast()
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = () => {
    // Simulate WebSocket connection with mock events
    const mockEvents: RealtimeEvent[] = [
      {
        type: "price_update",
        data: { projectId: "1", oldPrice: 2500000000, newPrice: 2400000000 },
        timestamp: new Date(),
      },
      {
        type: "inventory_change",
        data: { projectId: "2", available: 15, total: 50 },
        timestamp: new Date(),
      },
      {
        type: "new_project",
        data: { name: "Vinhomes Grand Park Phase 3", location: "TP.HCM" },
        timestamp: new Date(),
      },
    ]

    // Simulate receiving events every 30 seconds
    const interval = setInterval(() => {
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)]
      handleRealtimeEvent(randomEvent)
    }, 30000)

    return () => clearInterval(interval)
  }

  const handleRealtimeEvent = (event: RealtimeEvent) => {
    switch (event.type) {
      case "price_update":
        const { projectId, oldPrice, newPrice } = event.data
        const priceChange = (((newPrice - oldPrice) / oldPrice) * 100).toFixed(1)
        const isIncrease = newPrice > oldPrice

        addNotification({
          type: isIncrease ? "info" : "success",
          title: "Cập nhật giá dự án",
          message: `Giá dự án đã ${isIncrease ? "tăng" : "giảm"} ${Math.abs(Number.parseFloat(priceChange))}%`,
          action: {
            label: "Xem chi tiết",
            onClick: () => window.open(`/templates/${projectId}`, "_blank"),
          },
        })

        addToast({
          type: isIncrease ? "warning" : "success",
          title: `Giá ${isIncrease ? "tăng" : "giảm"} ${Math.abs(Number.parseFloat(priceChange))}%`,
          description: "Dự án bất động sản vừa cập nhật giá mới",
          duration: 4000,
        })
        break

      case "inventory_change":
        const { available, total } = event.data
        if (available < 5) {
          addNotification({
            type: "warning",
            title: "Sắp hết hàng",
            message: `Chỉ còn ${available}/${total} căn hộ có sẵn`,
          })
        }
        break

      case "new_project":
        const { name, location } = event.data
        addNotification({
          type: "info",
          title: "Dự án mới",
          message: `${name} tại ${location} vừa được thêm vào`,
          action: {
            label: "Khám phá ngay",
            onClick: () => window.open("/templates", "_blank"),
          },
        })
        break

      case "user_action":
        // Handle user-specific events
        break
    }
  }

  useEffect(() => {
    const cleanup = connect()

    return () => {
      cleanup()
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [])

  return {
    isConnected: true, // Mock connection status
    sendEvent: (event: Omit<RealtimeEvent, "timestamp">) => {
      handleRealtimeEvent({ ...event, timestamp: new Date() })
    },
  }
}
