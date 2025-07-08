import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTrainingById, createTrainingRegistration, Training } from "@/lib/trainingService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, DollarSign, BookOpen, CheckCircle, Award, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TrainingRegistration() {
  const { trainingId } = useParams<{ trainingId: string }>();
  const navigate = useNavigate();
  const [training, setTraining] = useState<Training | null>(null);
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
    if (!trainingId) return;

    fetchTrainingById(trainingId)
      .then((data) => {
        if (!data) {
          setError("Training not found");
          setLoading(false);
          return;
        }
        
        if (data.status !== 'published') {
          setError("This training is not available for registration");
          setLoading(false);
          return;
        }

        setTraining(data);
        
        // Initialize form with required fields
        const initialForm: any = {};
        data.registration_fields.forEach((field: string) => {
          initialForm[field] = "";
        });
        setFormData(initialForm);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load training details");
        setLoading(false);
      });
  }, [trainingId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!training || !trainingId) return;

    setSubmitting(true);
    setError(null);

    try {
      // Create registration with the new structure
      await createTrainingRegistration({
        training_id: trainingId,
        registration_data: formData,
        status: "confirmed",
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to register for training");
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
            <p className="mt-4 text-muted-foreground">Loading training details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !training) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="mb-4" style={{ color: '#E60023' }}>{error || "Training not found"}</p>
            <Button onClick={() => navigate("/upcoming-training")} variant="outline">
              Back to Training
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
                Thank you for registering for our training program! We'll send you more details and materials soon.
              </p>
            </div>
            <div className="space-y-4">
              <Button onClick={() => navigate("/upcoming-training")} className="mr-4">
                View Other Training
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
          <Button onClick={() => navigate("/upcoming-training")} variant="outline">
            ← Back to Training
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Training Details */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-2">
                  <Badge variant="default">
                    {training.status}
                  </Badge>
                  <Badge variant="outline">
                    {training.level}
                  </Badge>
                  {training.certificate_provided && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      Certificate
                    </Badge>
                  )}
                </div>
                {training.price > 0 && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {training.price} {training.currency}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{training.title}</CardTitle>
            </CardHeader>
            
            <CardContent>
              {training.image_url && (
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img
                    src={training.image_url}
                    alt={training.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <p className="text-muted-foreground mb-6">
                {training.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Starts: {formatDate(training.start_date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Time: {formatTime(training.start_time)}</span>
                </div>
                {training.end_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Ends: {formatDate(training.end_date)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>Duration: {training.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{training.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Max {training.max_participants} participants</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Instructor: {training.instructor}</span>
                </div>
              </div>

              {/* Topics */}
              {training.topics && training.topics.length > 0 && (
                <div className="mt-4">
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
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle>Register for Training</CardTitle>
            </CardHeader>
            <CardContent>
              {!training.registration_enabled ? (
                <Alert>
                  <AlertDescription>
                    Registration is currently closed for this training.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {training.registration_fields.map((field: string) => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-sm font-medium mb-2">
                        {getFieldLabel(field)}
                        {["name", "email"].includes(field) && (
                          <span className="ml-1" style={{ color: '#E60023' }}>*</span>
                        )}
                      </label>
                      
                      {["dietary_requirements", "special_needs"].includes(field) ? (
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