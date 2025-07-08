import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTrainingById, Training } from "@/lib/trainingService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, DollarSign, BookOpen, Award, User, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TrainingDetails() {
  const { trainingId } = useParams<{ trainingId: string }>();
  const [training, setTraining] = useState<Training | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trainingId) return;

    fetchTrainingById(trainingId)
      .then((data) => {
        if (!data) {
          setError("Training not found");
        } else {
          setTraining(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load training details");
        setLoading(false);
      });
  }, [trainingId]);

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
            <Button asChild variant="outline">
              <Link to="/upcoming-training">Back to Training</Link>
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
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link to="/upcoming-training">← Back to Training</Link>
          </Button>
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
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
            <CardTitle className="text-3xl">{training.title}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {training.image_url && (
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={training.image_url}
                  alt={training.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="prose prose-gray max-w-none">
              <h3>About This Training</h3>
              <p className="text-muted-foreground">{training.description}</p>
            </div>
            
            {/* Training Details */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold mb-4">Training Details</h3>
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
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Instructor</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{training.instructor}</span>
                  </div>
                  {training.instructor_bio && (
                    <p className="text-sm text-muted-foreground">{training.instructor_bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Topics */}
            {training.topics && training.topics.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {training.topics.map((topic, index) => (
                    <Badge key={index} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {training.requirements && training.requirements.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {training.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials */}
            {training.materials_included && training.materials_included.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Materials Included</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {training.materials_included.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Registration Requirements */}
            {training.registration_fields && training.registration_fields.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Registration Requirements</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-2">
                    You'll need to provide the following information when registering:
                  </p>
                  <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                    {training.registration_fields.map((field: string) => (
                      <li key={field}>
                        {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Pricing */}
            {training.price > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Pricing</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-800">
                      {training.price} {training.currency}
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
              {training.registration_enabled ? (
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">Ready to Join This Training?</h3>
                  <p className="text-muted-foreground">
                    Secure your spot in this comprehensive training program!
                  </p>
                  <Button asChild size="lg" className="w-full md:w-auto">
                    <Link to={`/training/${training.id}/register`}>
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
                    Registration is currently not available for this training.
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