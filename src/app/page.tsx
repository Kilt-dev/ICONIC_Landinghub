"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Star,
  Eye,
  ShoppingCart,
  Filter,
  Menu,
  MapPin,
  Building2,
  Sparkles,
  TrendingUp,
  Award,
} from "lucide-react"
import Link from "next/link"
import { UserMenu } from "@/components/auth/user-menu"
import { CartButton } from "@/components/cart/cart-button"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { realEstateProjects } from "@/lib/data/real-estate-data"
import { useRealtime } from "@/lib/hooks/use-realtime"
import { useToast } from "@/lib/hooks/use-toast"
import { useEffect } from "react"

export default function HomePage() {
  const featuredProjects = realEstateProjects.slice(0, 6)
  const { isConnected } = useRealtime()
  const { addToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      addToast({
        type: "success",
        title: "Chào mừng đến với LandingHub!",
        description: "Khám phá các dự án bất động sản tốt nhất Việt Nam",
        duration: 4000,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [addToast])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-2xl gradient-text">LandingHub</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/templates"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Dự án BDS
              </Link>
              <Link
                href="/categories"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Khu vực
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                Bảng giá
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                {isConnected && (
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Kết nối real-time" />
                )}
                <NotificationCenter />
              </div>
              <CartButton />
              <UserMenu />
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(5,150,105,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-5xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <Badge variant="secondary" className="px-4 py-1 text-sm font-medium">
                Nền tảng #1 Việt Nam
              </Badge>
            </div>

            <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-8 text-balance leading-tight">
              Landing Page Bất Động Sản <span className="gradient-text">Chuyên Nghiệp</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
              Khám phá các mẫu landing page bất động sản được thiết kế chuyên nghiệp, tối ưu chuyển đổi. Xem trước, tùy
              chỉnh và triển khai trong vài phút.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Tìm kiếm dự án BDS..."
                  className="pl-12 h-14 text-lg border-2 border-border/50 focus:border-primary shadow-lg"
                />
              </div>
              <Button size="lg" className="h-14 px-8 shadow-lg hover-lift" asChild>
                <Link href="/templates">
                  <Filter className="h-5 w-5 mr-2" />
                  Khám phá ngay
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-muted-foreground font-medium">Phổ biến:</span>
              <Badge
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                Miền Nam
              </Badge>
              <Badge
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                Căn hộ cao cấp
              </Badge>
              <Badge
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                Biệt thự
              </Badge>
              <Badge
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                Resort nghỉ dưỡng
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-6 w-6 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Được lựa chọn kỹ lưỡng
              </span>
            </div>

            <h2 className="font-bold text-4xl md:text-5xl text-foreground mb-6">
              Dự Án Bất Động Sản <span className="gradient-text">Nổi Bật</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Các dự án bất động sản được lựa chọn kỹ lưỡng từ khắp Việt Nam. Mỗi landing page đều responsive hoàn hảo
              và tối ưu chuyển đổi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="group hover-lift border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button
                        size="lg"
                        className="shadow-xl backdrop-blur-sm bg-white/90 text-foreground hover:bg-white"
                        asChild
                      >
                        <Link href={`/templates/${project.id}`}>
                          <Eye className="h-5 w-5 mr-2" />
                          Xem chi tiết
                        </Link>
                      </Button>
                    </div>

                    <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg">
                      {project.type === "can-ho"
                        ? "Căn hộ"
                        : project.type === "resort"
                          ? "Resort"
                          : project.type === "dat-nen"
                            ? "Đất nền"
                            : "BDS"}
                    </Badge>

                    {index < 3 && (
                      <Badge
                        variant="secondary"
                        className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm shadow-lg"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <span className="text-xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                      {(project.price / 1000000).toFixed(1)}tr
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground font-medium">{project.location}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{project.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({project.reviews} đánh giá)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-primary/20 hover:bg-primary/10 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <div className="flex gap-3 w-full">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 border-primary/20 hover:bg-primary/5 bg-transparent"
                      asChild
                    >
                      <Link href={`/templates/${project.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Xem trước
                      </Link>
                    </Button>
                    <Button size="lg" className="flex-1 shadow-md" asChild>
                      <Link href={`/templates/${project.id}`}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Mua ngay
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/templates">
                Xem tất cả {realEstateProjects.length}+ dự án
                <TrendingUp className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">
                150+
              </div>
              <div className="text-muted-foreground font-medium">Dự án BDS</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">
                5K+
              </div>
              <div className="text-muted-foreground font-medium">Khách hàng hài lòng</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-muted-foreground font-medium">Thời gian hoạt động</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-muted-foreground font-medium">Hỗ trợ khách hàng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-2xl gradient-text">LandingHub</span>
              </Link>
              <p className="text-muted-foreground leading-relaxed">
                Nền tảng landing page bất động sản chuyên nghiệp hàng đầu Việt Nam, phục vụ các dự án hiện đại và cao
                cấp.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-6 text-lg">Loại hình BDS</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Căn hộ cao cấp
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Biệt thự sang trọng
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Đất nền đầu tư
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Resort nghỉ dưỡng
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-6 text-lg">Khu vực</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Miền Bắc
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Miền Trung
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Miền Nam
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Đảo Phú Quốc
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-6 text-lg">Công ty</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Tuyển dụng
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-300"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 LandingHub. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
