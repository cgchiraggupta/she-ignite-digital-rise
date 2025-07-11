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
      name: "Sangeeta",
      business: "From Atta Chakki to Shark Tank",
      city: "Mumbai",
      results: "Traditional business to national TV platform",
      image: "/media/sangeeta%20sucess.avif",
      story: "From running a traditional atta chakki to pitching on Shark Tank India - SHELeadsIndia helped me transform my business and navigate entrepreneurship challenges. This incredible journey taught me that with passion and determination, dreams truly have no limits!",
      metrics: {
        achievement: "Shark Tank India Pitch",
        transformation: "Traditional to Modern Business",
        impact: "Inspiring Entrepreneur"
      }
    },
    {
      name: "Payaal Jain",
      business: "Professional Makeup Artist & Entrepreneur",
      city: "Pune",
      results: "Built thriving makeup artistry brand",
      image: "/api/placeholder/300/300",
      story: "Building my makeup artistry brand in the competitive beauty industry was challenging until SHELeadsIndia showed me how to blend creativity with smart business strategies. Now I'm living my passion while inspiring the next generation of artists!",
      metrics: {
        business: "Thriving Makeup Brand",
        impact: "Inspiring Next Generation",
        growth: "Creative + Business Success"
      }
    },
    {
      name: "Adv. Amruta Salunke",
      business: "RERA Expert, Lawyer & YouTuber",
      city: "Pune",
      results: "Successfully balanced law practice with content creation",
      image: "/media/Adv. Amruta Salunke.jpg",
      story: "Breaking into the male-dominated legal industry while building my YouTube presence felt impossible until SHELeadsIndia showed me the path forward. Now I successfully balance my RERA expertise with content creation, empowering women through legal education every single day!",
      metrics: {
        expertise: "RERA Legal Expert",
        platform: "YouTube Content Creator",
        mission: "Empowering Women Daily"
      }
    }
  ];

  const quickTestimonials = [
    {
      quote: "The ROI tracking methods alone paid for the entire course within the first month.",
      author: "Rajani Kulkarni",
      title: "Digital Marketing Agency Owner",
      city: "Pune"
    },
    {
      quote: "I found my business co-founder at a SHE networking event. We've now launched two successful ventures together.",
      author: "Kavitha Rao",
      title: "Tech Startup Co-founder",
      city: "Nagpur"
    },
    {
      quote: "The personal branding workshop transformed how I present myself online. My client inquiries tripled!",
      author: "Sunita Joshi",
      title: "Business Consultant",
      city: "Nashik"
    },
    {
      quote: "From struggling freelancer to agency owner in 18 months. The mentorship program changed everything.",
      author: "Pooja Mehta",
      title: "Digital Agency Founder",
      city: "Pune"
    },
    {
      quote: "The AI automation tools they taught me now handle 80% of my marketing. I finally have my life back!",
      author: "Deepika Singh",
      title: "E-commerce Store Owner",
      city: "Nagpur"
    },
    {
      quote: "The community connections are invaluable. These women celebrate your wins and support you through challenges.",
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
              Real Women,
              <span className="block">Real Transformations</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              These aren't just success stories—they're proof that with the right guidance 
              and community, any woman can build the business of her dreams.
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
              Transformation Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the women who dared to dream big and built businesses that matter.
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
                      <div className="w-80 h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white relative">
                        {story.image.includes('placeholder') ? (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                            <Users className="h-24 w-24 text-primary/50" />
                          </div>
                        ) : (
                          <img 
                            src={story.image} 
                            alt={story.name}
                            className="w-full h-full"
                            style={{
                              objectFit: 'contain',
                              objectPosition: 'center center',
                              width: '100%',
                              height: '100%',
                              display: 'block'
                            }}
                            onError={(e) => {
                              // Fallback to a styled div if image fails to load
                              const target = e.target as HTMLImageElement;
                              console.log('Image failed to load:', story.image);
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                    <div class="text-center">
                                      <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                                        <svg class="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                        </svg>
                                      </div>
                                      <div class="text-xs font-medium text-gray-600">${story.name}</div>
                                    </div>
                                  </div>
                                `;
                              }
                            }}
                            onLoad={() => {
                              console.log('Image loaded successfully:', story.image);
                            }}
                          />
                        )}
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