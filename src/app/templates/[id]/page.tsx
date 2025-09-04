"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Eye,
  ShoppingCart,
  Heart,
  Share2,
  Monitor,
  Smartphone,
  Tablet,
  Check,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { CartButton } from "@/components/cart/cart-button"
import { UserMenu } from "@/components/auth/user-menu"

// Mock data for template details
const templateData = {
  1: {
    id: 1,
    title: "SaaS Pro",
    category: "SaaS",
    price: 49,
    originalPrice: 79,
    rating: 4.9,
    reviews: 127,
    description:
      "A modern, conversion-optimized landing page template designed specifically for SaaS businesses. Features clean design, responsive layout, and proven conversion elements.",
    longDescription:
      "SaaS Pro is the ultimate landing page template for software-as-a-service companies looking to convert visitors into customers. Built with modern web standards and optimized for performance, this template includes everything you need to launch a professional SaaS landing page.",
    images: [
      "/modern-saas-landing-page-with-blue-gradient.jpg",
      "/placeholder.svg?height=600&width=800&text=Desktop+View",
      "/placeholder.svg?height=600&width=400&text=Mobile+View",
      "/placeholder.svg?height=600&width=800&text=Features+Section",
    ],
    previewUrl: "https://saas-pro-demo.vercel.app",
    tags: ["Responsive", "Dark Mode", "Analytics", "SEO Optimized"],
    features: [
      "Fully Responsive Design",
      "Dark/Light Mode Toggle",
      "Built-in Analytics",
      "SEO Optimized",
      "Fast Loading Speed",
      "Cross-browser Compatible",
      "Mobile-first Approach",
      "Conversion Optimized",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    includes: [
      "HTML/CSS/JS Source Files",
      "Figma Design File",
      "Documentation",
      "Free Updates for 1 Year",
      "Email Support",
    ],
    author: {
      name: "Design Studio",
      avatar: "/placeholder.svg?height=40&width=40&text=DS",
      templates: 12,
      rating: 4.8,
    },
    featured: true,
    bestseller: true,
  },
}

const reviews = [
  {
    id: 1,
    user: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Excellent template! Easy to customize and looks very professional. The documentation is clear and helpful.",
    helpful: 12,
  },
  {
    id: 2,
    user: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    rating: 5,
    date: "1 month ago",
    comment:
      "Perfect for our SaaS launch. The conversion rate improved significantly after switching to this template.",
    helpful: 8,
  },
  {
    id: 3,
    user: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    rating: 4,
    date: "2 months ago",
    comment: "Great design and functionality. Would love to see more color variations in future updates.",
    helpful: 5,
  },
]

const relatedTemplates = [
  {
    id: 2,
    title: "E-Shop Elite",
    category: "E-commerce",
    price: 59,
    rating: 4.8,
    image: "/ecommerce-landing-page-with-product-showcase.jpg",
  },
  {
    id: 3,
    title: "Agency Ace",
    category: "Agency",
    price: 39,
    rating: 4.9,
    image: "/creative-agency-landing-page-with-portfolio.jpg",
  },
  {
    id: 4,
    title: "Startup Swift",
    category: "Startup",
    price: 45,
    rating: 4.7,
    image: "/startup-landing-page-with-team-section.jpg",
  },
]

export default function TemplateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const templateId = params.id as string
  const template = templateData[1] // Using template 1 as example
  const [selectedImage, setSelectedImage] = useState(0)
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isLiked, setIsLiked] = useState(false)

  const { addToCart } = useCart()
  const { user } = useAuth()

  if (!template) {
    return <div>Template not found</div>
  }

  const handleAddToCart = () => {
    addToCart({
      id: template.id.toString(),
      name: template.title,
      price: template.price,
      image: template.images[0],
      category: template.category,
    })
  }

  const handleBuyNow = () => {
    if (!user) {
      router.push("/auth/signin?redirect=" + encodeURIComponent(`/templates/${templateId}`))
      return
    }

    addToCart({
      id: template.id.toString(),
      name: template.title,
      price: template.price,
      image: template.images[0],
      category: template.category,
    })
    router.push("/cart")
  }

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 28, percentage: 22 },
    { stars: 3, count: 7, percentage: 6 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="font-playfair-display font-bold text-xl text-foreground">LandingHub</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
                Templates
              </Link>
              <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <CartButton />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/templates" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Link>
          <span>/</span>
          <span>{template.category}</span>
          <span>/</span>
          <span className="text-foreground">{template.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Preview */}
          <div className="lg:col-span-2">
            {/* Main Preview */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={previewDevice === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("desktop")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewDevice === "tablet" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("tablet")}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewDevice === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("mobile")}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`mx-auto bg-gray-100 rounded-lg overflow-hidden ${
                    previewDevice === "desktop"
                      ? "w-full h-96"
                      : previewDevice === "tablet"
                        ? "w-2/3 h-80"
                        : "w-80 h-96 max-w-full"
                  }`}
                >
                  <iframe
                    src={template.previewUrl}
                    className="w-full h-full border-0"
                    title={`${template.title} Preview`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {template.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-primary" : "border-border"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${template.title} screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={template.images[selectedImage] || "/placeholder.svg"}
                    alt={`${template.title} screenshot`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="mb-2">{template.category}</Badge>
                    {template.bestseller && (
                      <Badge variant="secondary" className="ml-2">
                        Bestseller
                      </Badge>
                    )}
                    <h1 className="font-playfair-display font-bold text-2xl text-foreground mb-2">{template.title}</h1>
                    <p className="text-muted-foreground">{template.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(template.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{template.rating}</span>
                  <span className="text-muted-foreground">({template.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">${template.price}</span>
                    {template.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">${template.originalPrice}</span>
                    )}
                  </div>
                  {template.originalPrice && (
                    <Badge variant="destructive">Save ${template.originalPrice - template.price}</Badge>
                  )}
                </div>

                <div className="flex gap-2 mb-4">
                  <Button className="flex-1" onClick={handleAddToCart}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <Button variant="outline" className="w-full bg-transparent mb-4" onClick={handleBuyNow}>
                  Buy Now - ${template.price}
                </Button>

                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={template.previewUrl} target="_blank">
                    <Eye className="h-4 w-4 mr-2" />
                    Live Preview
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {template.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle>Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={template.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {template.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{template.author.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {template.author.templates} templates • {template.author.rating} rating
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">About This Template</h3>
                  <p className="text-muted-foreground mb-6">{template.longDescription}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.technologies.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Rating Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-primary mb-2">{template.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(template.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">{template.reviews} reviews</div>
                    </div>

                    <div className="space-y-2">
                      {ratingDistribution.map((item) => (
                        <div key={item.stars} className="flex items-center gap-2 text-sm">
                          <span className="w-8">{item.stars}★</span>
                          <Progress value={item.percentage} className="flex-1" />
                          <span className="w-8 text-muted-foreground">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="lg:col-span-2 space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {review.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{review.user}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-muted-foreground mb-2">{review.comment}</p>
                            <div className="text-sm text-muted-foreground">
                              {review.helpful} people found this helpful
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Support & Documentation</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Getting Started</h4>
                      <p className="text-muted-foreground">
                        Complete documentation and setup guide included with your purchase.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Support</h4>
                      <p className="text-muted-foreground">Email support included for 6 months after purchase.</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Updates</h4>
                      <p className="text-muted-foreground">
                        Free updates for 1 year including bug fixes and new features.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Templates */}
        <div className="mt-12">
          <h2 className="font-playfair-display font-bold text-2xl text-foreground mb-6">Related Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTemplates.map((relatedTemplate) => (
              <Card key={relatedTemplate.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={relatedTemplate.image || "/placeholder.svg"}
                      alt={relatedTemplate.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      {relatedTemplate.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{relatedTemplate.title}</h3>
                    <span className="font-bold text-primary">${relatedTemplate.price}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{relatedTemplate.rating}</span>
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link href={`/templates/${relatedTemplate.id}`}>View Template</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
