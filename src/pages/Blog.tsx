"use client"

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, User, TrendingUp, Brain, Users, Target } from "lucide-react"
import { fetchBlogPosts, type BlogPost } from "@/lib/blogService"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Blog = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load blog posts.")
        setLoading(false)
      })
  }, [])

  const categoryIcons = {
    "Digital Marketing": TrendingUp,
    "AI & Technology": Brain,
    "Business Growth": Target,
    "Success Stories": Users,
  }

  const handlePostClick = (id: string) => {
    navigate(`/blog/${id}`)
  }

  // Get categories with counts
  const categories = Array.from(
    posts.reduce((acc, post) => {
      acc.set(post.category, (acc.get(post.category) || 0) + 1)
      return acc
    }, new Map<string, number>()),
  ).map(([name, count]) => ({ name, count }))

  // Featured and recent posts
  const featuredPosts = posts.filter((p) => p.featured).slice(0, 3)
  const recentPosts = posts.filter((p) => !p.featured).slice(0, 6)

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background */}
      <section
        className="py-20 text-white relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 0, 38, 0.28), rgba(255, 0, 38, 0.22)), url('https://i.ibb.co/rKWYwMv6/DSC02120.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height:600
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Business Growth
              <span className="block">Insights & Strategies</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-md">
              Practical advice, proven strategies, and inspiring stories to help you build and scale your business in
              the digital age.
            </p>
          </div>
        </div>

        {/* Floating elements for visual appeal */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Categories */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-background rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="grid md:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || TrendingUp
                return (
                  <div
                    key={index}
                    className="text-center group cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors group-hover:scale-110"
                      style={{ backgroundColor: "rgba(230, 0, 35, 0.1)" }}
                    >
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} articles</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Featured Articles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most popular and impactful content to accelerate your business growth.
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer border-0 shadow-lg"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-pink-600/10 flex items-center justify-center">
                    <div className="text-primary/30">
                      <Brain className="h-16 w-16" />
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                    <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(post.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <Button variant="ghost" className="w-full group/btn hover:bg-primary/5">
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with our latest business tips, strategies, and success stories.
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group bg-white/80 backdrop-blur-sm border-0 shadow-md"
                  onClick={() => handlePostClick(post.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(post.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="group/btn hover:bg-primary/5">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="group shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
            >
              View All Articles
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div
            className="rounded-2xl p-8 md:p-12 text-center border border-primary/10 shadow-lg"
            style={{ backgroundColor: "rgba(230, 0, 35, 0.05)" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Never Miss an Insight
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get our latest articles, exclusive tips, and business strategies delivered directly to your inbox every
              week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              />
              <Button variant="default" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Join 2,000+ entrepreneurs. No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Blog
