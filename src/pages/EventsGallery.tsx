import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EventsGallery = () => {
  const eventPhotos = [
    "/media/_PAS5285.JPG",
    "/media/_PAS5276.JPG",
    "/media/_PAS5044.JPG",
    "/media/_PAS5037.JPG",
    "/media/_PAS5032.JPG",
    "/media/_PAS4968.JPG",
    "/media/_PAS4965.JPG",
    "/media/_PAS4929.JPG",
    "/media/_PAS4914.JPG",
    "/media/DSC02058.JPG",
    "/media/DSC02132.JPG",
    "/media/DSC02153.JPG",
    "/media/DSC02211.JPG",
    "/media/DSC02233.JPG",
    "/media/DSC02242.JPG",
    "/media/IMG_0011.JPG",
    "/media/IMG_0013.JPG",
    "/media/IMG_0137.JPG",
    "/media/IMG_0195.JPG",
    "/media/market-place.JPG",
    "/media/digital wisdom.JPG",
    "/media/networking.JPG",
    "/media/Mentoring.JPG"
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Digital Marketing Mastery Workshop",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Mumbai, Maharashtra",
      description: "Learn cutting-edge digital marketing strategies for women entrepreneurs",
      status: "upcoming",
      attendees: "50+"
    },
    {
      id: 2,
      title: "Women Entrepreneurs Networking Mixer",
      date: "March 22, 2024", 
      time: "6:00 PM - 9:00 PM",
      location: "Pune, Maharashtra",
      description: "Connect with like-minded women entrepreneurs and build meaningful partnerships",
      status: "upcoming",
      attendees: "75+"
    }
  ];

  const pastEvents = [
    {
      id: 3,
      title: "SHELeads Annual Conference 2024",
      date: "February 10, 2024",
      time: "9:00 AM - 6:00 PM", 
      location: "Mumbai, Maharashtra",
      description: "Our flagship event bringing together women leaders from across India",
      status: "completed",
      attendees: "200+"
    },
    {
      id: 4,
      title: "MarTech Training Bootcamp",
      date: "January 28, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "Delhi NCR",
      description: "Intensive training on marketing technology tools and automation",
      status: "completed", 
      attendees: "100+"
    },
    {
      id: 5,
      title: "Business Growth Workshop",
      date: "January 15, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Bangalore, Karnataka",
      description: "Strategies for scaling women-led businesses in the digital age",
      status: "completed",
      attendees: "80+"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="py-16 md:py-20 lg:py-24 text-white relative bg-cover bg-center bg-no-repeat min-h-[60vh] w-full overflow-hidden"
        style={{ 
          backgroundImage: 'url(/media/DSC02153.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6 text-sm font-medium drop-shadow-lg">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-white drop-shadow-xl" style={{
              textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 2px 2px 6px rgba(0, 0, 0, 0.7), 1px 1px 3px rgba(0, 0, 0, 0.5)'
            }}>
              Events Gallery
            </h1>
            <p className="text-lg text-white/90 mb-8 drop-shadow-lg" style={{
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 4px rgba(0, 0, 0, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.4)'
            }}>
              Discover our community events, workshops, and networking opportunities. 
              Join us in building the future of women entrepreneurship.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-center text-gray-900">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      Upcoming
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      {event.attendees}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-medium">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {event.date} • {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="default">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-center text-gray-900">
            Past Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {pastEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                      Completed
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      {event.attendees}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-medium">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Photos Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">
              Event Photo Gallery
            </h2>
            <p className="text-lg text-gray-600">
              Memories from our amazing events and workshops
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {eventPhotos.map((photo, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 aspect-square bg-gray-200"
              >
                <img
                  src={photo}
                  alt={`Event photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsGallery; 