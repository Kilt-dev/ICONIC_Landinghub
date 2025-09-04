import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "@/components/ui/toast"
import { ErrorBoundary } from "@/components/error/error-boundary"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "LandingHub - Landing Page Bất Động Sản Chuyên Nghiệp",
  description: "Khám phá và mua các mẫu landing page bất động sản chất lượng cao cho dự án của bạn",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${dmSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={null}>{children}</Suspense>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
