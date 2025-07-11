"use client"

import { useEffect, useState } from "react"
import { fetchEvents, type Event } from "@/lib/eventService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        // Only show published events to public
        const publishedEvents = data.filter((event) => event.status === "published")
        setEvents(publishedEvents)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to load events")
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
            <p className="mt-4 text-muted-foreground">Loading events...</p>
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

      {/* Hero Section with Background */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 0, 38, 0.27), rgba(255, 0, 38, 0.33)), url('https://i.ibb.co/rKWYwMv6/DSC02120.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height:600
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full backdrop-blur-sm border border-white/20 bg-white/10">
                <Calendar className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl drop-shadow-lg">Upcoming Events</h1>
            <p className="mt-6 text-lg leading-8 text-white max-w-2xl mx-auto drop-shadow-md opacity-95">
              Join us for empowering workshops, networking events, and educational sessions designed to help women
              entrepreneurs thrive in the digital age.
            </p>
          </div>
        </div>

        {/* Floating elements for visual appeal */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Events Grid */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {events.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming events</h3>
              <p className="text-muted-foreground">Check back soon for new workshops and networking opportunities!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group border-0 shadow-lg"
                >
                  {event.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image_url || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={event.status === "published" ? "default" : "secondary"} className="capitalize">
                        {event.status}
                      </Badge>
                      {event.price > 0 && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {event.price} {event.currency}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{event.description}</p>

                    <div className="space-y-2 text-sm mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{formatTime(event.event_time)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Max {event.max_attendees} attendees</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1 shadow-md hover:shadow-lg transition-all duration-300">
                        <Link to={`/events/${event.id}`}>View Details</Link>
                      </Button>
                      {event.registration_enabled && (
                        <Button
                          asChild
                          variant="outline"
                          className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
                        >
                          <Link to={`/events/${event.id}/register`}>Register</Link>
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

      {/* Newsletter/CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div
            className="rounded-2xl p-8 md:p-12 text-center border border-primary/10 shadow-lg"
            style={{ backgroundColor: "rgba(230, 0, 35, 0.05)" }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Don't Miss Out on Future Events
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be the first to know about our upcoming workshops, networking events, and exclusive opportunities for
              women entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              />
              <Button variant="default" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
                Notify Me
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
