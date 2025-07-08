import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchEventById, Event } from "@/lib/eventService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, DollarSign, Clock, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    fetchEventById(eventId)
      .then((data) => {
        if (!data) {
          setError("Event not found");
          setLoading(false);
          return;
        }
        
        if (data.status !== 'published') {
          setError("This event is not available");
          setLoading(false);
          return;
        }

        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load event details");
        setLoading(false);
      });
  }, [eventId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
            <p className="mb-6" style={{ color: '#E60023' }}>{error || "The event you're looking for doesn't exist."}</p>
            <Button onClick={() => navigate("/events")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <div className="mb-6">
          <Button onClick={() => navigate("/events")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>

        {/* Event Details */}
        <Card className="overflow-hidden">
          {event.image_url && (
            <div className="aspect-[2/1] overflow-hidden">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              {event.price > 0 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {event.price} {event.currency}
                </Badge>
              )}
            </div>
            <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(event.event_date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{formatTime(event.event_time)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-medium">Max {event.max_attendees} attendees</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-3">About This Event</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Registration Fields Info */}
            {event.registration_fields && event.registration_fields.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Registration Requirements</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-2">
                    You'll need to provide the following information when registering:
                  </p>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    {event.registration_fields.map((field: string) => (
                      <li key={field}>
                        {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Pricing */}
            {event.price > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Pricing</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-800">
                      {event.price} {event.currency}
                    </span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Payment will be processed during registration
                  </p>
                </div>
              </div>
            )}

            {/* Registration CTA */}
            <div className="border-t pt-6">
              {event.registration_enabled ? (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Ready to Join Us?</h3>
                  <p className="text-muted-foreground">
                    Secure your spot at this exciting event!
                  </p>
                  <Button asChild size="lg" className="w-full md:w-auto">
                    <Link to={`/events/${event.id}/register`}>
                      Register Now
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold text-muted-foreground">
                    Registration Closed
                  </h3>
                  <p className="text-muted-foreground">
                    Registration is currently not available for this event.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
} 