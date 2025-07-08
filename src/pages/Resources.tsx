import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, Award, Users, BookOpen, Video, FileText, ArrowRight } from "lucide-react";

const Resources = () => {
  const leadMagnets = [
    {
      title: "5-Day Business Growth Planner",
      description: "Transform your business with daily action plans designed by successful women entrepreneurs.",
      type: "PDF Workbook",
      downloads: "2,500+",
      icon: TrendingUp,
      features: [
        "Daily growth challenges",
        "Revenue tracking templates",
        "Goal-setting frameworks",
        "Success metrics dashboard"
      ]
    },
    {
      title: "Brand Confidence Quiz",
      description: "Discover your unique brand personality and get personalized recommendations for your business.",
      type: "Interactive Quiz",
      downloads: "1,800+",
      icon: Award,
      features: [
        "Personalized brand analysis",
        "Custom action plan",
        "Brand voice guidelines",
        "Visual identity tips"
      ]
    },
    {
      title: "Pre-Launch Success Checklist",
      description: "Everything you need to successfully launch your product or service without missing critical steps.",
      type: "Checklist + Templates",
      downloads: "3,200+",
      icon: Users,
      features: [
        "60-point launch checklist",
        "Marketing timeline templates",
        "Launch day action plan",
        "Post-launch optimization guide"
      ]
    }
  ];

  const resourceCategories = [
    {
      title: "Free Guides & Ebooks",
      icon: BookOpen,
      count: 12,
      description: "Comprehensive guides on digital marketing, business growth, and entrepreneurship."
    },
    {
      title: "Video Tutorials",
      icon: Video,
      count: 25,
      description: "Step-by-step video tutorials on AI tools, social media, and business strategies."
    },
    {
      title: "Templates & Tools",
      icon: FileText,
      count: 18,
      description: "Ready-to-use templates for social media, email marketing, and business planning."
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
              Free Resources That
              <span className="block">Accelerate Success</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Access our library of proven business tools, templates, and guides. 
              Start building your empire today—completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Lead Magnets */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Most Downloaded Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These tools have helped thousands of women entrepreneurs build successful businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {leadMagnets.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="relative overflow-hidden hover:shadow-elegant transition-all duration-300 hover:scale-105 group">
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background">
                      {resource.type}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                    
                    <div className="text-sm text-muted-foreground mt-2">
                      <Download className="h-4 w-4 inline mr-1" />
                      {resource.downloads} downloads
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">What's Included:</h4>
                      <ul className="space-y-1">
                        {resource.features.map((feature, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="hero" className="w-full group">
                      <Download className="h-4 w-4 mr-2" />
                      Download Free
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Explore All Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our complete library organized by category to find exactly what you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {resourceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                    <div className="text-2xl font-bold text-primary mb-2">{category.count}</div>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="group">
                      Browse Collection
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
                      <div className="rounded-2xl p-8 md:p-12 text-center" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Get New Resources First
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of 2,000+ entrepreneurs and be the first to access 
              new tools, templates, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="lg">
                Subscribe Free
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;