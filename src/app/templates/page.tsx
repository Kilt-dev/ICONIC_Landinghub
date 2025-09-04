"use client"

import { useState, memo, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Star,
  Eye,
  ShoppingCart,
  Grid,
  List,
  SlidersHorizontal,
  MapPin,
  Building2,
  TrendingUp,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AdvancedSearch } from "@/components/search/advanced-search"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { VirtualList } from "@/components/ui/virtual-list"
import { LazyComponent } from "@/components/performance/lazy-component"
import { useSearch, type SearchFilters } from "@/lib/hooks/use-search"
import { usePerformance } from "@/lib/hooks/use-performance"
import { useMemoizedSearch } from "@/lib/hooks/use-memoized-search"
import { realEstateProjects } from "@/lib/data/real-estate-data"

const ProjectCard = memo(({ project, index }: { project: any; index: number }) => {
  return (
    <Card className="group hover-lift border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <OptimizedImage
            src={project.images[0] || "/placeholder.svg"}
            alt={project.title}
            width={400}
            height={200}
            className="w-full h-48 group-hover:scale-110 transition-transform duration-500"
            priority={index < 3} // Prioritize first 3 images
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button size="lg" className="shadow-xl backdrop-blur-sm bg-white/90 text-foreground hover:bg-white" asChild>
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

          {project.featured && (
            <Badge variant="secondary" className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm shadow-lg">
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
  )
})

ProjectCard.displayName = "ProjectCard"

const ProjectListItem = memo(({ project }: { project: any }) => {
  return (
    <Card className="hover:shadow-md transition-shadow h-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 h-full">
          <div className="relative w-full md:w-48 h-32 flex-shrink-0">
            <OptimizedImage
              src={project.images[0] || "/placeholder.svg"}
              alt={project.title}
              width={192}
              height={128}
              className="w-full h-full rounded-lg"
            />
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
              {project.type === "can-ho"
                ? "Căn hộ"
                : project.type === "resort"
                  ? "Resort"
                  : project.type === "dat-nen"
                    ? "Đất nền"
                    : "BDS"}
            </Badge>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{project.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{project.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({project.reviews} đánh giá)</span>
                  {project.featured && (
                    <Badge variant="secondary" className="text-xs">
                      Nổi bật
                    </Badge>
                  )}
                </div>
              </div>
              <span className="text-2xl font-bold text-primary">{(project.price / 1000000).toFixed(1)}tr</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/templates/${project.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Xem trước
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={`/templates/${project.id}`}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Mua ngay
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

ProjectListItem.displayName = "ProjectListItem"

const searchFunction = (project: any, filters: SearchFilters) => {
  const matchesQuery =
    !filters.query ||
    project.title.toLowerCase().includes(filters.query.toLowerCase()) ||
    project.location.toLowerCase().includes(filters.query.toLowerCase()) ||
    project.tags.some((tag: string) => tag.toLowerCase().includes(filters.query.toLowerCase())) ||
    project.description?.toLowerCase().includes(filters.query.toLowerCase())

  const matchesCategory =
    filters.categories.includes("Tất cả") ||
    filters.categories.some((cat) => {
      if (cat === "Miền Bắc")
        return ["Hà Nội", "Hải Phòng", "Quảng Ninh"].some((city) => project.location.includes(city))
      if (cat === "Miền Trung")
        return ["Đà Nẵng", "Huế", "Quy Nhơn", "Đà Lạt"].some((city) => project.location.includes(city))
      if (cat === "Miền Nam") return ["TP.HCM", "Cần Thơ", "Vũng Tàu"].some((city) => project.location.includes(city))
      if (cat === "Đảo Phú Quốc") return project.location.includes("Phú Quốc")
      return false
    })

  const matchesPrice =
    project.price >= filters.priceRange[0] * 1000000 && project.price <= filters.priceRange[1] * 1000000

  const matchesRating = project.rating >= filters.minRating

  const matchesPropertyType = filters.propertyType.length === 0 || filters.propertyType.includes(project.type)

  const matchesTags = filters.tags.length === 0 || filters.tags.some((tag) => project.tags.includes(tag))

  return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesPropertyType && matchesTags
}

const sortFunction = (a: any, b: any, sortBy: string) => {
  switch (sortBy) {
    case "price-low":
      return a.price - b.price
    case "price-high":
      return b.price - a.price
    case "rating":
      return b.rating - a.rating
    case "reviews":
      return b.reviews - a.reviews
    case "name":
      return a.title.localeCompare(b.title)
    case "newest":
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    case "featured":
    default:
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  }
}

const getSuggestions = (query: string, data: any[]) => {
  const suggestions = new Set<string>()
  const lowerQuery = query.toLowerCase()

  data.forEach((project) => {
    // Add matching titles
    if (project.title.toLowerCase().includes(lowerQuery)) {
      suggestions.add(project.title)
    }

    // Add matching locations
    if (project.location.toLowerCase().includes(lowerQuery)) {
      suggestions.add(project.location)
    }

    // Add matching tags
    project.tags.forEach((tag: string) => {
      if (tag.toLowerCase().includes(lowerQuery)) {
        suggestions.add(tag)
      }
    })
  })

  return Array.from(suggestions).slice(0, 5)
}

export default function TemplatesPage() {
  const metrics = usePerformance("TemplatesPage")

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const { filters, updateFilters, clearFilters, searchResults, loadMore } = useSearch(
    realEstateProjects,
    searchFunction,
    sortFunction,
    getSuggestions,
  )

  const memoizedResults = useMemoizedSearch(
    realEstateProjects,
    filters.query,
    (project, term) => searchFunction(project, { ...filters, query: term }),
    [filters.categories, filters.priceRange, filters.minRating, filters.propertyType, filters.tags],
  )

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    loadMore()
    setIsLoadingMore(false)
  }

  const renderGridItem = useMemo(
    () => (project: any, index: number) => <ProjectCard key={project.id} project={project} index={index} />,
    [],
  )

  const renderListItem = useMemo(
    () => (project: any, index: number) => <ProjectListItem key={project.id} project={project} />,
    [],
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl gradient-text">LandingHub</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/templates" className="text-foreground font-medium">
                Dự án BDS
              </Link>
              <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                Khu vực
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Bảng giá
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Đăng nhập
              </Button>
              <Button size="sm">Bắt đầu</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-bold text-4xl md:text-5xl text-foreground mb-4">
            Dự Án Bất Động Sản <span className="gradient-text">Việt Nam</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Khám phá {realEstateProjects.length} dự án bất động sản cao cấp trên toàn quốc
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-2 text-xs text-muted-foreground">
              Render: {metrics.renderTime.toFixed(2)}ms | FPS: {metrics.fps}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Advanced Search Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <LazyComponent>
                <AdvancedSearch
                  filters={filters}
                  onFiltersChange={updateFilters}
                  onClearFilters={clearFilters}
                  suggestions={searchResults.suggestions}
                />
              </LazyComponent>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Quick Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm nhanh dự án BDS..."
                  value={filters.query}
                  onChange={(e) => updateFilters({ query: e.target.value })}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                {/* Mobile Advanced Search */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Bộ lọc
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Tìm kiếm nâng cao</SheetTitle>
                      <SheetDescription>Lọc dự án theo khu vực, giá, loại hình và nhiều tiêu chí khác</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <AdvancedSearch
                        filters={filters}
                        onFiltersChange={updateFilters}
                        onClearFilters={clearFilters}
                        suggestions={searchResults.suggestions}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Nổi bật</SelectItem>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="price-low">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price-high">Giá: Cao đến thấp</SelectItem>
                    <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                    <SelectItem value="reviews">Nhiều đánh giá nhất</SelectItem>
                    <SelectItem value="name">Tên A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.categories.length > 1 ||
              !filters.categories.includes("Tất cả") ||
              filters.propertyType.length > 0 ||
              filters.tags.length > 0 ||
              filters.location ||
              filters.minRating > 0) && (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Bộ lọc đang áp dụng:</span>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Xóa tất cả
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.categories
                    .filter((c) => c !== "Tất cả")
                    .map((category) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  {filters.propertyType.map((type) => (
                    <Badge key={type} variant="secondary">
                      {type}
                    </Badge>
                  ))}
                  {filters.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {filters.location && (
                    <Badge variant="secondary">
                      <MapPin className="h-3 w-3 mr-1" />
                      {/* Added label lookup for location */}
                      {regions.find((r) => r.value === filters.location)?.label}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Hiển thị {searchResults.items.length} trong tổng số {searchResults.total} dự án
                {filters.query && (
                  <span>
                    {" "}
                    cho "<strong>{filters.query}</strong>"
                  </span>
                )}
              </p>
            </div>

            {/* Templates Grid/List with Virtual Scrolling for large datasets */}
            {searchResults.items.length > 50 ? (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Sử dụng cuộn ảo để tối ưu hiệu suất với {searchResults.items.length} kết quả
                </p>
                <VirtualList
                  items={searchResults.items}
                  itemHeight={viewMode === "grid" ? 400 : 200}
                  height={800}
                  renderItem={viewMode === "grid" ? renderGridItem : renderListItem}
                  className="border border-border rounded-lg"
                />
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {searchResults.items.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.items.map((project) => (
                  <ProjectListItem key={project.id} project={project} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {searchResults.hasMore && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="px-8 bg-transparent"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Đang tải...
                    </>
                  ) : (
                    "Xem thêm dự án"
                  )}
                </Button>
              </div>
            )}

            {/* No Results */}
            {searchResults.items.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Không tìm thấy dự án nào</h3>
                  <p>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm của bạn</p>
                </div>
                <Button variant="outline" onClick={clearFilters}>
                  Xóa tất cả bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const regions = [
  { value: "", label: "Tất cả khu vực" },
  { value: "mien-bac", label: "Miền Bắc" },
  { value: "mien-trung", label: "Miền Trung" },
  { value: "mien-nam", label: "Miền Nam" },
  { value: "phu-quoc", label: "Đảo Phú Quốc" },
]
