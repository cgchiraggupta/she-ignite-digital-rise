"use client"

import { useEffect, useState } from "react"
import { fetchTrainings, type Training } from "@/lib/trainingService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, BookOpen, Award } from "lucide-react"
import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function UpcomingTraining() {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTrainings()
      .then((data) => {
        // Only show published trainings to public
        const publishedTrainings = data.filter((training) => training.status === "published")
        setTrainings(publishedTrainings)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load training sessions")
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading training sessions...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section with Background Image */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(230, 0, 35, 0.38), rgba(204, 0, 31, 0.26)), url('https://i.ibb.co/rKWYwMv6/DSC02120.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height:600
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div
                className="p-4 rounded-full backdrop-blur-sm border border-white/20"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl drop-shadow-lg">
              Upcoming Training Sessions
            </h1>
            <p className="mt-6 text-lg leading-8 text-white max-w-2xl mx-auto drop-shadow-md opacity-95">
              Join our expert-led training sessions designed to empower women entrepreneurs with the skills and
              knowledge needed to succeed in today's digital landscape.
            </p>
          </div>
        </div>

        {/* Floating elements for visual appeal */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Training Sessions Grid */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {trainings.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming training sessions</h3>
              <p className="text-muted-foreground">
                Check back soon for new training opportunities and skill-building workshops!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {trainings.map((training) => (
                <Card key={training.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {training.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={training.image_url || "/placeholder.svg"}
                        alt={training.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {training.level}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {training.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{training.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{training.description}</p>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(training.start_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(training.start_time)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{training.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Max {training.max_participants} participants</span>
                      </div>
                    </div>

                    {training.topics && training.topics.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Topics covered:</p>
                        <div className="flex flex-wrap gap-1">
                          {training.topics.slice(0, 3).map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {training.topics.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{training.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex gap-2">
                      <Button asChild className="flex-1">
                        <Link to={`/training/${training.id}`}>View Details</Link>
                      </Button>
                      {training.registration_enabled && (
                        <Button asChild variant="outline">
                          <Link to={`/training/${training.id}/register`}>Register</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
