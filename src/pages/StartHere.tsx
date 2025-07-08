import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Download, MapPin, Users, CheckCircle } from "lucide-react";

const StartHere = () => {
  const cities = [
    { name: "Pune", description: "Tech Hub Programs", programs: 3 },
    { name: "Nagpur", description: "Business Growth Focus", programs: 2 },
    { name: "Nashik", description: "Startup Accelerator", programs: 2 },
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Your Path",
      description: "Select your city and get personalized resources for your region."
    },
    {
      number: "02", 
      title: "Download Free Resources",
      description: "Get instant access to our proven business growth tools."
    },
    {
      number: "03",
      title: "Join the Community",
      description: "Connect with like-minded women entrepreneurs in your area."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, rgb(230, 0, 35), rgb(204, 0, 31))' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Journey to Success
              <span className="block">Starts Right Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Get personalized resources, connect with your local community, 
              and transform your business dreams into reality.
            </p>
          </div>
        </div>
      </section>

      {/* City Selection */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Choose Your City
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get location-specific resources and connect with entrepreneurs in your area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {cities.map((city, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{city.name}</CardTitle>
                  <CardDescription className="text-base">
                    {city.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-primary">{city.programs}</span>
                    <span className="text-muted-foreground ml-2">Active Programs</span>
                  </div>
                  <Button variant="outline" className="w-full group">
                    Select {city.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Steps */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Success Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to begin your entrepreneurial transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 transform translate-x-8" style={{ backgroundColor: 'rgba(230, 0, 35, 0.2)' }} />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
                      <div className="rounded-2xl p-8 md:p-12 text-center" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Download our complete business starter kit and join thousands of 
              successful women entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Download className="h-5 w-5 mr-2" />
                Download Free Kit
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                <Users className="h-5 w-5 mr-2" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StartHere;