import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Brain, Rocket, CheckCircle, Clock, Award } from "lucide-react";

const Programs = () => {
  const programs = [
    {
      id: 1,
      title: "1:1 Elite Mentorship",
      subtitle: "Transform Your Business in 90 Days",
      price: "₹25,000",
      duration: "3 months",
      badge: "Most Popular",
      icon: Users,
      description: "Get personalized guidance from successful women entrepreneurs who've scaled from zero to six figures.",
      features: [
        "Weekly 1-on-1 strategy sessions",
        "Personal brand development roadmap",
        "Business scaling action plan",
        "Direct access to mentor WhatsApp",
        "Exclusive mastermind group access",
        "30-day money-back guarantee"
      ],
      highlights: [
        "Average 300% revenue increase",
        "Lifetime community access",
        "Certificate of completion"
      ]
    },
    {
      id: 2,
      title: "Digital Marketing & AI Mastery",
      subtitle: "Future-Proof Your Business Skills",
      price: "₹15,000",
      duration: "6 weeks",
      badge: "Best Value",
      icon: Brain,
      description: "Master cutting-edge AI tools and digital marketing strategies that will give you an unfair advantage.",
      features: [
        "AI-powered marketing automation",
        "Social media content systems",
        "Email marketing mastery",
        "SEO and online visibility",
        "Analytics and ROI tracking",
        "Live weekly group coaching"
      ],
      highlights: [
        "50+ AI tools training",
        "Ready-to-use templates",
        "Industry certifications"
      ]
    },
    {
      id: 3,
      title: "Community & Networking Hub",
      subtitle: "Connect, Collaborate, Conquer",
      price: "₹5,000",
      duration: "12 months",
      badge: "Community Favorite",
      icon: Rocket,
      description: "Join an exclusive network of ambitious women entrepreneurs and access premium networking opportunities.",
      features: [
        "Monthly regional meetups",
        "Virtual mastermind sessions",
        "Industry expert guest speakers",
        "Business collaboration opportunities",
        "Success celebration events",
        "24/7 community support"
      ],
      highlights: [
        "500+ active members",
        "Regional chapters",
        "Lifetime access"
      ]
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
              Programs That Transform
              <span className="block">Lives & Businesses</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Choose your path to entrepreneurial success. Every program is designed 
              to deliver measurable results and lasting transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <Card key={program.id} className={`relative overflow-hidden transition-all duration-300 hover:shadow-elegant hover:scale-105 ${program.badge === "Most Popular" ? "border-primary border-2" : ""}`}>
                  {program.badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        {program.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-muted-foreground">
                      {program.subtitle}
                    </CardDescription>
                    
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-3xl font-bold text-primary">{program.price}</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{program.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-3">What You'll Get:</h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        Program Highlights:
                      </h4>
                      <ul className="space-y-1">
                        {program.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-sm text-primary font-medium">
                            • {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      variant={program.badge === "Most Popular" ? "hero" : "outline"} 
                      className="w-full group"
                      size="lg"
                    >
                      Enroll Now
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
                          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Success is Guaranteed
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're so confident in our programs that we offer a 30-day money-back guarantee. 
              If you don't see measurable progress in your business, we'll refund every penny.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Success Stories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">3x</div>
                <div className="text-muted-foreground">Average Revenue Growth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
                      <div className="rounded-2xl p-8 md:p-12 text-center" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't let another day pass wondering "what if". Your future self is counting on 
              the decision you make today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                Book Free Consultation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                Compare All Programs
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;