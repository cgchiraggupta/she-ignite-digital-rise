import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Brain, Rocket, ArrowRight } from "lucide-react";
import digitalTrainingImage from "@/assets/digital-training.jpg";

const ProgramsShowcase = () => {
  const programs = [
    {
      icon: Users,
      title: "1:1 Mentorship Program",
      description: "Personalized guidance from successful women entrepreneurs who've scaled from zero to six figures.",
      features: ["Weekly strategy sessions", "Personal brand development", "Business scaling roadmap", "Exclusive network access"],
      cta: "Apply for Mentorship",
      highlight: "Most Popular"
    },
    {
      icon: Brain,
      title: "Digital Marketing & AI Mastery",
      description: "Master the tools and strategies that will future-proof your business in the digital age.",
      features: ["AI-powered marketing tools", "Social media automation", "Content creation systems", "ROI tracking methods"],
      cta: "Start Learning",
      highlight: ""
    },
    {
      icon: Rocket,
      title: "Community & Events",
      description: "Connect with like-minded women entrepreneurs and access exclusive networking opportunities.",
      features: ["Monthly regional meetups", "Virtual mastermind groups", "Industry expert sessions", "Success celebration events"],
      cta: "Join Community",
      highlight: ""
    }
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Programs That Transform
            <span className="block text-primary">Lives & Businesses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your path to entrepreneurial success. Each program is designed to meet you 
            where you are and take you where you want to be.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-elegant transition-all duration-300 hover:scale-105 group">
                {program.highlight && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {program.highlight}
                  </div>
                )}
                <CardHeader>
                                      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-base">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={program.highlight ? "hero" : "outline"} 
                    className="w-full group"
                  >
                    {program.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Image Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Why Digital Skills Are Your
              <span className="block text-primary">Competitive Advantage</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              In today's economy, digital literacy isn't optional—it's essential. Our programs 
              combine cutting-edge AI tools with proven marketing strategies to give you the 
              unfair advantage you need to dominate your market.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">✓</span>
                </div>
                <span>Reduce marketing costs by 60% with AI automation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">✓</span>
                </div>
                <span>Scale your reach 10x without hiring more staff</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">✓</span>
                </div>
                <span>Build systems that work 24/7 while you sleep</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={digitalTrainingImage}
              alt="Digital Marketing Training"
              className="rounded-lg shadow-card"
            />
                            <div className="absolute inset-0 rounded-lg" style={{ background: 'linear-gradient(to top, rgba(230, 0, 35, 0.2), transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsShowcase;