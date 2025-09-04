"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, Building, Star, X, Filter, SlidersHorizontal, Sparkles } from "lucide-react"
import type { SearchFilters } from "@/lib/hooks/use-search"

interface AdvancedSearchProps {
  filters: SearchFilters
  onFiltersChange: (filters: Partial<SearchFilters>) => void
  onClearFilters: () => void
  suggestions?: string[]
  className?: string
}

const regions = [
  { value: "", label: "Tất cả khu vực" },
  { value: "mien-bac", label: "Miền Bắc" },
  { value: "mien-trung", label: "Miền Trung" },
  { value: "mien-nam", label: "Miền Nam" },
  { value: "phu-quoc", label: "Đảo Phú Quốc" },
]

const propertyTypes = [
  { id: "can-ho", label: "Căn hộ" },
  { id: "biet-thu", label: "Biệt thự" },
  { id: "dat-nen", label: "Đất nền" },
  { id: "resort", label: "Resort" },
  { id: "van-phong", label: "Văn phòng" },
  { id: "shophouse", label: "Shophouse" },
]

const categories = ["Tất cả", "Miền Bắc", "Miền Trung", "Miền Nam", "Đảo Phú Quốc"]

const popularTags = [
  "Cao cấp",
  "Gần biển",
  "Trung tâm",
  "Giá tốt",
  "Mới xây",
  "Đầu tư",
  "Nghỉ dưỡng",
  "Tiện ích đầy đủ",
]

export function AdvancedSearch({
  filters,
  onFiltersChange,
  onClearFilters,
  suggestions = [],
  className,
}: AdvancedSearchProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags)

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "Tất cả") {
      onFiltersChange({ categories: checked ? ["Tất cả"] : [] })
    } else {
      const newCategories = checked
        ? [...filters.categories.filter((c) => c !== "Tất cả"), category]
        : filters.categories.filter((c) => c !== category)

      onFiltersChange({
        categories: newCategories.length === 0 ? ["Tất cả"] : newCategories,
      })
    }
  }

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked ? [...filters.propertyType, type] : filters.propertyType.filter((t) => t !== type)

    onFiltersChange({ propertyType: newTypes })
  }

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]

    setSelectedTags(newTags)
    onFiltersChange({ tags: newTags })
  }

  const handleSuggestionClick = (suggestion: string) => {
    onFiltersChange({ query: suggestion })
    setShowSuggestions(false)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          Tìm kiếm nâng cao
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search Input with Suggestions */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm dự án, địa điểm, loại hình..."
              value={filters.query}
              onChange={(e) => {
                onFiltersChange({ query: e.target.value })
                setShowSuggestions(e.target.value.length > 0)
              }}
              onFocus={() => setShowSuggestions(filters.query.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 pr-10"
            />
            {filters.query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => onFiltersChange({ query: "" })}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search className="inline h-3 w-3 mr-2 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Khu vực
          </label>
          <Select value={filters.location} onValueChange={(value) => onFiltersChange({ location: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn khu vực" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Danh mục</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Property Types */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Building className="h-4 w-4" />
            Loại hình bất động sản
          </label>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.id}`}
                  checked={filters.propertyType.includes(type.id)}
                  onCheckedChange={(checked) => handlePropertyTypeChange(type.id, checked as boolean)}
                />
                <label
                  htmlFor={`type-${type.id}`}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Khoảng giá (triệu VNĐ)</h3>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({ priceRange: value as [number, number] })}
              max={10000}
              min={0}
              step={100}
              className="mb-3"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.priceRange[0].toLocaleString()}tr</span>
              <span>{filters.priceRange[1].toLocaleString()}tr</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Đánh giá tối thiểu
          </label>
          <Select
            value={filters.minRating.toString()}
            onValueChange={(value) => onFiltersChange({ minRating: Number(value) })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Tất cả đánh giá</SelectItem>
              <SelectItem value="3">3+ sao</SelectItem>
              <SelectItem value="4">4+ sao</SelectItem>
              <SelectItem value="4.5">4.5+ sao</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Popular Tags */}
        <div>
          <label className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Thẻ phổ biến
          </label>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="pt-4 border-t border-border">
          <Button variant="outline" onClick={onClearFilters} className="w-full bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Xóa tất cả bộ lọc
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
