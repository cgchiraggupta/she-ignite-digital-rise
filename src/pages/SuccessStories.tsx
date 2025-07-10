import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Award, MapPin } from "lucide-react";

const SuccessStories = () => {
  const featuredStories = [
    {
      name: "Priya Sharma",
      business: "Eco-Friendly Home Products",
      city: "Pune",
      results: "From dreams to ₹50L revenue in 8 months",
      image: "/api/placeholder/120/120",
      story: "As a mother who believed in sustainable living, I dreamed of creating products that would make a difference. SHELeadsIndia didn't just teach me digital marketing—they helped me find my voice as an Indian woman entrepreneur. The AI tools became my trusted assistants, and the sisterhood gave me courage I never knew I had. Today, families across Maharashtra choose my products for healthier homes!",
      metrics: {
        revenue: "500% growth with purpose",
        customers: "2,500+ families served",
        team: "5 women empowered with employment"
      }
    },
    {
      name: "Anita Desai",
      business: "Tech Solutions for SMEs",
      city: "Nagpur",
      results: "Scaled to 6-figure business with authenticity",
      image: "/api/placeholder/120/120",
      story: "As a software engineer turned entrepreneur, I had the technical knowledge but lacked the confidence to put myself out there. The mentorship program connected me with a sister who understood my journey intimately. Through authentic relationship-building and values-driven strategies, I found my first major clients and created recurring revenue streams that honor both innovation and tradition.",
      metrics: {
        revenue: "₹12L annual revenue with integrity",
        clients: "25+ businesses transformed",
        partnership: "Found my business sister through SHE community"
      }
    },
    {
      name: "Meera Patel",
      business: "Sustainable Fashion Brand",
      city: "Nashik",
      results: "Built 50K authentic community organically",
      image: "/api/placeholder/120/120",
      story: "My fashion brand represented my heritage and values, but I struggled to share this story effectively. The digital mastery program taught me content strategies rooted in authenticity rather than tactics. I learned to use AI as a tool for creativity, not replacement, and built genuine connections with women who share my values. Now customers across India celebrate sustainable fashion through my brand!",
      metrics: {
        followers: "50K+ community members",
        engagement: "8.5% authentic engagement",
        sales: "200+ monthly orders with love"
      }
    }
  ];

  const quickTestimonials = [
    {
      quote: "The wisdom shared here doesn't just improve your business metrics—it transforms how you see yourself as a leader.",
      author: "Rajani Kulkarni",
      title: "Digital Marketing Agency Owner",
      city: "Pune"
    },
    {
      quote: "I found not just a business partner, but a sister who shares my vision. Together we're creating solutions our community needs.",
      author: "Kavitha Rao",
      title: "Tech Startup Co-founder",
      city: "Nagpur"
    },
    {
      quote: "The personal branding guidance helped me present my authentic self confidently. My ideal clients started finding me naturally.",
      author: "Sunita Joshi",
      title: "Business Consultant",
      city: "Nashik"
    },
    {
      quote: "From feeling lost as a freelancer to leading an agency with purpose. The mentorship program honored who I am while nurturing who I'm becoming.",
      author: "Pooja Mehta",
      title: "Digital Agency Founder",
      city: "Pune"
    },
    {
      quote: "The AI automation tools respect my time and family priorities. Technology serves my life's balance, not the other way around.",
      author: "Deepika Singh",
      title: "E-commerce Store Owner",
      city: "Nagpur"
    },
    {
      quote: "This sisterhood celebrates your uniqueness and supports your journey without judgment. It's sacred space for growth.",
      author: "Neha Agarwal",
      title: "Health & Wellness Coach",
      city: "Nashik"
    }
  ];

  const stats = [
    { number: "500+", label: "Women Transformed", icon: Users },
    { number: "₹2.5Cr+", label: "Revenue Generated", icon: TrendingUp },
    { number: "98%", label: "Success Rate", icon: Award },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, rgb(230, 0, 35), rgb(204, 0, 31))' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Courage Creates Change,
              <span className="block">Dreams Become Reality</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              These are not just business victories—they are stories of Indian women who chose to believe 
              in themselves, honoring their roots while reaching for their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-background rounded-2xl shadow-elegant p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Journeys of Heart and Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the women who honored their dreams with courage and built businesses that celebrate both purpose and prosperity.
            </p>
          </div>

          <div className="space-y-16">
            {featuredStories.map((story, index) => (
              <Card key={index} className="overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-0">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-4 w-4 text-primary" />
                        <Badge variant="outline">{story.city}</Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
                      <p className="text-lg text-muted-foreground mb-4">{story.business}</p>
                      <div className="text-xl font-semibold text-primary mb-6">{story.results}</div>
                      
                      <blockquote className="text-foreground mb-6 italic leading-relaxed">
                        "{story.story}"
                      </blockquote>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {Object.entries(story.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 rounded-lg" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
                            <div className="font-semibold text-primary">{value}</div>
                          </div>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="self-start group">
                        Read Full Story
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                    
                    <div className="bg-gradient-section p-8 lg:p-12 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                        <Users className="h-24 w-24" style={{ color: 'rgba(230, 0, 35, 0.3)' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Testimonials Grid */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Community Says
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hundreds of women have transformed their businesses. Here's what they're saying.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
                      <div className="rounded-2xl p-8 md:p-12 text-center" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Your Success Story Starts Here
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every successful woman entrepreneur you just read about started exactly where you are now. 
              The only difference? They took action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                Start Your Transformation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                Book Free Strategy Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStories;