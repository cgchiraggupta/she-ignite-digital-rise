import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById, createRegistration, Event } from "@/lib/eventService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, DollarSign, Clock, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function EventRegistration() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
  });

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
          setError("This event is not available for registration");
          setLoading(false);
          return;
        }

        setEvent(data);
        
        // Initialize form with required fields
        const initialForm: any = {};
        data.registration_fields.forEach((field: string) => {
          initialForm[field] = "";
        });
        setFormData(initialForm);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load event details");
        setLoading(false);
      });
  }, [eventId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !eventId) return;

    setSubmitting(true);
    setError(null);

    try {
      // Separate standard fields from additional fields
      const { name, email, phone, ...additionalInfo } = formData;
      
      await createRegistration({
        event_id: eventId,
        name: name || "",
        email: email || "",
        phone: phone || "",
        additional_info: additionalInfo,
        status: "confirmed",
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to register for event");
    } finally {
      setSubmitting(false);
    }
  };

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

  const getFieldLabel = (field: string) => {
    const labels: { [key: string]: string } = {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      business_name: "Business Name",
      experience_level: "Experience Level",
      company: "Company",
      job_title: "Job Title",
      linkedin: "LinkedIn Profile",
      website: "Website",
      dietary_requirements: "Dietary Requirements",
      special_needs: "Special Needs/Accommodations",
    };
    return labels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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
            <p className="text-red-500 mb-4">{error || "Event not found"}</p>
            <Button onClick={() => navigate("/events")} variant="outline">
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Registration Successful!
            </h1>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <p className="text-green-800 whitespace-pre-line">
                {event.thank_you_message}
              </p>
            </div>
            <div className="space-y-4">
              <Button onClick={() => navigate("/events")} className="mr-4">
                View Other Events
              </Button>
              <Button onClick={() => navigate("/")} variant="outline">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6">
          <Button onClick={() => navigate("/events")} variant="outline">
            ← Back to Events
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Event Details */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="default">
                  {event.status}
                </Badge>
                {event.price > 0 && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {event.price} {event.currency}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {event.image_url && (
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <p className="text-muted-foreground mb-6">
                {event.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(event.event_date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatTime(event.event_time)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Max {event.max_attendees} attendees</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Register for Event</CardTitle>
            </CardHeader>
            <CardContent>
              {!event.registration_enabled ? (
                <Alert>
                  <AlertDescription>
                    Registration is currently closed for this event.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {event.registration_fields.map((field: string) => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-sm font-medium mb-2">
                        {getFieldLabel(field)}
                        {["name", "email"].includes(field) && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      {field === "dietary_requirements" || field === "special_needs" ? (
                        <textarea
                          id={field}
                          name={field}
                          value={formData[field] || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={3}
                          placeholder={`Enter your ${getFieldLabel(field).toLowerCase()}`}
                        />
                      ) : (
                        <input
                          id={field}
                          name={field}
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          value={formData[field] || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder={`Enter your ${getFieldLabel(field).toLowerCase()}`}
                          required={["name", "email"].includes(field)}
                        />
                      )}
                    </div>
                  ))}

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Registering..." : "Register Now"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 