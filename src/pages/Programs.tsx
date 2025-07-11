import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Brain, Rocket, CheckCircle, Clock, Award, Target, Heart, TrendingUp, Zap } from "lucide-react";
import membershipImage from "@/assets/she-leads-membership.webp";

const Programs = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "The Spark Plan",
      price: "₹2,600",
      period: "year",
      badge: "Getting Started",
      tagline: "For the women just getting started, your first spark of success.",
      features: [
        "Weekly live training on digital marketing",
        "Access to our supportive WhatsApp community",
        "Learn. Connect. Begin."
      ],
      icon: Zap,
      color: "bg-yellow-100",
      highlight: false
    },
    {
      id: 2,
      name: "The Rise Plan",
      price: "₹25,000",
      period: "year",
      badge: "Most Popular",
      tagline: "You're done surviving. Now it's time to rise.",
      features: [
        "Everything in The Spark Plan",
        "Exclusive monthly meetings focused on implementation",
        "Your business featured on our podcast",
        "Unlimited access to all training session recordings",
        "Personal brand boost with peer collaborations"
      ],
      icon: TrendingUp,
      color: "bg-blue-100",
      highlight: true
    },
    {
      id: 3,
      name: "The Thrive Plan",
      price: "₹75,000",
      period: "year",
      badge: "Growing Business",
      tagline: "Your business is growing—and so is your leadership.",
      features: [
        "Everything in The Rise Plan",
        "One 1:1 strategy call/month with our senior mentor",
        "Exclusive discounts on digital tools",
        "Priority access to resources, templates, and expert sessions"
      ],
      icon: Rocket,
      color: "bg-green-100",
      highlight: false
    },
    {
      id: 4,
      name: "The Empire Plan",
      price: "₹2,50,000",
      period: "year",
      badge: "Elite",
      tagline: "You're the visionary—we're your execution team.",
      features: [
        "Everything in The Thrive Plan",
        "Done-for-you social media marketing",
        "Funnels built for lead generation & conversions",
        "Two high-impact strategy calls/month",
        "Complete backend marketing support to free your time for CEO-level moves"
      ],
      icon: Award,
      color: "bg-purple-100",
      highlight: false
    }
  ];

  const impactPoints = [
    "Bridge the gap between ambition and execution for women-led businesses.",
    "Equip women entrepreneurs with hands-on marketing tools and strategies.",
    "Replace isolation with connection through a thriving business sisterhood.",
    "Transform learning into implementation through challenges, mentorship, and managed services."
  ];

  const planRecommendations = [
    {
      plan: "Spark Plan",
      description: "Perfect for solopreneurs, early-stage founders, or women restarting their careers who want to upskill and get consistent training."
    },
    {
      plan: "Rise Plan",
      description: "Ideal for women with an existing business who need strategy + visibility. You're doing the work, but need direction and exposure."
    },
    {
      plan: "Thrive Plan",
      description: "Best for entrepreneurs with growing teams or consistent revenue, who need personalised mentorship and access to premium tools."
    },
    {
      plan: "Empire Plan",
      description: "Tailored for established founders ready to outsource their marketing, automate growth, and focus on scaling operations."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section 
        className="py-16 md:py-20 lg:py-24 text-white relative bg-cover bg-center bg-no-repeat min-h-[60vh] w-full overflow-hidden"
        style={{ 
          backgroundImage: 'url(/media/market-place.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="w-full px-4 relative z-10 flex items-center min-h-[50vh]">
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-6 leading-tight drop-shadow-xl" style={{
              textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 2px 2px 6px rgba(0, 0, 0, 0.7), 1px 1px 3px rgba(0, 0, 0, 0.5)'
            }}>
              Empowering Women Entrepreneurs with MarTech Mastery
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl mb-6 opacity-95 leading-relaxed font-light drop-shadow-lg" style={{
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 4px rgba(0, 0, 0, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.4)'
              }}>
                SHELeadsIndia is more than a platform—it is a movement designed exclusively for women 
                entrepreneurs who want to scale their businesses using modern marketing technology (MarTech). 
                We are on a mission to create India's largest business growth ecosystem for women-led ventures.
              </p>
              <p className="text-base sm:text-lg lg:text-xl opacity-95 leading-relaxed font-light drop-shadow-lg" style={{
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 4px rgba(0, 0, 0, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.4)'
              }}>
                Our community brings together women entrepreneurs, MarTech trainers, digital strategists, 
                and solution providers in one powerful network. We focus on practical, tech-enabled marketing 
                solutions that drive real business results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Vision Section - Better Organization */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-900">
                Our Impact Vision
              </h2>
              <p className="text-lg text-gray-600">We aim to:</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {impactPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            <div className="text-center bg-primary/5 p-6 rounded-lg">
              <p className="text-lg font-semibold text-primary">
                Our ultimate goal? To help women not just run businesses, but build brands, communities, and legacies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section - Made Smaller */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-900">
                  Founded by <span className="text-primary">Nikita Vora</span>
                </h2>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
                  A digital marketing consultant, trainer, and visionary behind the SHELeadsIndia movement, 
                  the platform reflects her deep belief in community-powered growth. With a decade of experience 
                  in digital marketing and a strong commitment to empowering women, Nikita envisions SHELeadsIndia 
                  as the go-to business growth hub for every woman entrepreneur in India.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-base font-medium text-primary italic">
                    Her philosophy: "Don't just learn marketing—implement it, automate it, and profit from it."
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <img
                    src={membershipImage}
                    alt="Nikita Vora - SHELeadsIndia Founder"
                    className="rounded-xl shadow-lg w-full max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Properly Organized */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-900">
              Power Play Pricing Model
            </h2>
            <p className="text-lg text-gray-600">
              Choose a plan that matches your momentum:
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {pricingPlans.map((plan, index) => {
                const IconComponent = plan.icon;
              return (
                  <div key={plan.id} className="flex flex-col group">
                    <Card className={`relative flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 ${plan.highlight ? "border-2 border-primary shadow-lg ring-1 ring-primary/20" : "border border-gray-200 hover:border-primary/30"}`}>
                      {plan.badge && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                          <Badge className={`${plan.highlight ? "bg-primary text-white" : "bg-gray-800 text-white"} px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all duration-300 group-hover:scale-105`}>
                            {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                      <CardHeader className="text-center pb-4 pt-8">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${plan.color} transition-all duration-300 group-hover:scale-110`}>
                          <IconComponent className="h-8 w-8 text-primary transition-all duration-300" />
                    </div>
                        <CardTitle className="text-xl font-bold mb-2 text-gray-900 transition-colors duration-300 group-hover:text-primary">{plan.name}</CardTitle>
                        
                        <div className="mb-4">
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-3xl font-bold text-primary transition-all duration-300 group-hover:scale-105">{plan.price}</span>
                            <span className="text-sm text-gray-500">/{plan.period}</span>
                      </div>
                    </div>
                        
                        <CardDescription className="text-gray-600 text-sm leading-relaxed px-2 transition-colors duration-300 group-hover:text-gray-700">
                          {plan.tagline}
                        </CardDescription>
                  </CardHeader>

                      <CardContent className="flex-1 flex flex-col px-6 pb-6">
                        <ul className="space-y-3 mb-6 flex-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 transition-all duration-300 group-hover:translate-x-1">
                              <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0 transition-colors duration-300 group-hover:text-primary" />
                              <span className="text-gray-700 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-800">{feature}</span>
                          </li>
                        ))}
                      </ul>

                    <Button 
                          variant={plan.highlight ? "default" : "outline"} 
                          className={`w-full py-3 text-sm font-semibold mt-auto transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                            plan.highlight 
                              ? "bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg" 
                              : "hover:bg-primary hover:text-white hover:border-primary"
                          }`}
                          onClick={() => {
                            // Add click handler here if needed
                            console.log(`Selected plan: ${plan.name}`);
                          }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <span>Choose Plan</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                    </Button>
                  </CardContent>
                </Card>
                  </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Plan Recommendations */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-8 text-center text-gray-900">
              Plan Recommendations
            </h2>
            
            <div className="space-y-4">
              {planRecommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-2">{rec.plan}:</h3>
                      <p className="text-gray-700 leading-relaxed">{rec.description}</p>
              </div>
              </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
      <section 
        className="py-16 md:py-20 text-white relative bg-cover bg-center bg-no-repeat w-full overflow-hidden"
        style={{ 
          backgroundImage: 'url(/media/market-place.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="w-full px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-medium mb-6 drop-shadow-xl" style={{
              textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), 2px 2px 6px rgba(0, 0, 0, 0.7), 1px 1px 3px rgba(0, 0, 0, 0.5)'
            }}>
              Ready to Lead?
            </h3>
            <p className="text-lg mb-8 opacity-95 leading-relaxed font-light drop-shadow-lg" style={{
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 4px rgba(0, 0, 0, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.4)'
            }}>
              Pick your plan. Power your brand. SHELeadsIndia is here to walk with you—from spark to empire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-medium py-3 px-6 shadow-lg transition-all duration-200 bg-transparent"
                style={{
                  borderColor: 'white',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#E60023';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <span>Get Started Today</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-medium py-3 px-6 shadow-lg transition-all duration-200 bg-transparent"
                style={{
                  borderColor: 'white',
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#E60023';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <span>Schedule a Call</span>
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