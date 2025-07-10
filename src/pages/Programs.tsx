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
      title: "Sacred Sisterhood Mentorship",
      subtitle: "Heart-Centered Transformation in 90 Days",
      price: "₹25,000",
      duration: "3 months",
      badge: "Most Cherished",
      icon: Users,
      description: "Walk alongside women who've transformed not just their businesses, but their entire relationship with success—learning courage, strategy, and the art of authentic leadership.",
      features: [
        "Weekly heart-to-heart strategy sessions",
        "Authentic personal brand development",
        "Values-driven business scaling blueprint",
        "Sister-to-sister WhatsApp connection",
        "Exclusive sisterhood circle access",
        "Sacred 30-day transformation guarantee"
      ],
      highlights: [
        "Deep personal & business transformation",
        "Lifetime sisterhood community",
        "Cultural wisdom integration"
      ]
    },
    {
      id: 2,
      title: "Digital Mastery with Indian Wisdom",
      subtitle: "Technology That Honors Your Values",
      price: "₹15,000",
      duration: "6 weeks",
      badge: "Most Practical",
      icon: Brain,
      description: "Master cutting-edge AI and digital tools while staying rooted in authenticity. Technology that amplifies your voice, not changes it.",
      features: [
        "AI tools designed for Indian markets",
        "Culturally-aware content creation",
        "Regional language optimization",
        "Values-based marketing strategies",
        "Community-centered growth tactics",
        "Weekly wisdom-sharing circles"
      ],
      highlights: [
        "50+ India-focused digital tools",
        "Culture-conscious templates",
        "Authenticity-first certifications"
      ]
    },
    {
      id: 3,
      title: "The Sisterhood Circle",
      subtitle: "Where Dreams Meet Community",
      price: "₹5,000",
      duration: "12 months",
      badge: "Heart of Community",
      icon: Rocket,
      description: "Find your tribe of like-minded women who understand your journey, celebrate your wins, and support you through every challenge with unwavering sisterhood.",
      features: [
        "Monthly regional sister gatherings",
        "Virtual wisdom-sharing sessions",
        "Cultural celebration meetups",
        "Collaborative growth opportunities",
        "Success ritual celebrations",
        "24/7 sister support network"
      ],
      highlights: [
        "500+ sisters across Maharashtra",
        "Cultural festival celebrations",
        "Lifetime belonging and connection"
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
              Journeys Designed for
              <span className="block">The Indian Woman's Heart</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Every program is crafted with deep understanding of your unique journey—balancing ambition with 
              tradition, innovation with values, and personal growth with community connection.
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
              Your Success Is Sacred to Us
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We believe so deeply in your potential and our programs that we offer a heartfelt 30-day guarantee. 
              If you don't feel the transformation beginning in your business and your confidence, we'll honor our commitment with a complete refund.
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