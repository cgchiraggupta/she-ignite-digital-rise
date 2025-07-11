"use client"

import { useParams, useNavigate } from "react-router-dom"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Share2, Bookmark } from "lucide-react"
import { fetchBlogPostById, type BlogPost } from "@/lib/blogService"
import { useEffect, useState } from "react"
// import ReactMarkdown from "react-markdown"; // Uncomment if you add react-markdown

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchBlogPostById(slug)
        .then((data) => {
          setPost(data)
          setLoading(false)
        })
        .catch(() => {
          setPost(null)
          setLoading(false)
        })
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background */}
      <section
        className="py-20 text-white relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(230, 0, 35, 0.31), rgba(255, 0, 38, 0.33)), url('https://i.ibb.co/rKWYwMv6/DSC02120.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              className="text-primary-foreground mb-8 hover:bg-primary-foreground/10 backdrop-blur-sm"
              onClick={() => navigate("/blog")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>

            <div className="mb-6">
              <Badge variant="secondary" className="mb-4 backdrop-blur-sm bg-white/20 border-white/30">
                {post.category}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">{post.title}</h1>

            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed drop-shadow-md">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm opacity-90 drop-shadow-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.read_time}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 backdrop-blur-sm bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 backdrop-blur-sm bg-transparent"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements for visual appeal */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {/* If you want markdown rendering, use ReactMarkdown here: */}
              {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
              <div className="whitespace-pre-wrap text-lg leading-relaxed text-foreground">{post.content}</div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div
            className="rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-primary/10 shadow-lg"
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

export default BlogPostDetail
