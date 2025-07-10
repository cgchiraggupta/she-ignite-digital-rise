import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Users, MapPin, Calendar, Target, Heart } from "lucide-react";
import founderImage from "@/assets/founder-portrait.jpg";

const About = () => {
  const achievements = [
    { icon: Users, title: "500+ Women Empowered", description: "Across 3 major cities" },
    { icon: Award, title: "Industry Recognition", description: "Featured in 15+ publications" },
    { icon: Target, title: "98% Success Rate", description: "Measurable business growth" },
  ];

  const values = [
    {
      title: "Authenticity Over Everything",
      description: "We honor real strategies that work for real Indian women, not borrowed concepts that don't fit our context.",
      icon: Heart
    },
    {
      title: "Sisterhood as Strength",
      description: "Success blooms when shared among sisters. We build bridges of trust and celebration that last lifetimes.",
      icon: Users
    },
    {
      title: "Rooted Empowerment",
      description: "Every woman carries infinite potential within her. We nurture it while honoring the cultural wisdom that grounds us.",
      icon: Target
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started with a vision to bridge the digital divide for women entrepreneurs in Maharashtra."
    },
    {
      year: "2021",
      title: "First 100 Members",
      description: "Launched our first mentorship program in Pune with overwhelming response."
    },
    {
      year: "2022",
      title: "Multi-City Expansion",
      description: "Extended our reach to Nagpur and Nashik, building regional communities."
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Became the first women's entrepreneurship program to integrate AI tools training."
    },
    {
      year: "2024",
      title: "500+ Success Stories",
      description: "Celebrated our 500th successful transformation and launched advanced programs."
    }
  ];

  const mediaFeatures = [
    "Economic Times Women's Forum",
    "Business Today",
    "YourStory.com",
    "SheThePeople",
    "Women's Web",
    "Entrepreneur India"
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 text-white" style={{ background: 'linear-gradient(135deg, rgb(230, 0, 35), rgb(204, 0, 31))' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Where Every Indian Woman's
              <span className="block">Dreams Find Their Wings</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Born from the belief that every woman deserves a platform to rise, SHELeadsIndia has become 
              a sanctuary where tradition meets innovation, and sisterhood powers success.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Meet Our Founder - Nikita Vora
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                "After 15+ years in the digital marketing world, 22 countries traveled, and 350+ women entrepreneurs mentored…
                I still hear this one line from powerhouse women: 'I have the skills, but I don't know how to grow my brand online.' 
                That's where I come in."
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                "I'm Nikita Vora—founder of SHELeadsIndia, where I help women-led businesses scale using smart digital systems, 
                MarTech, and AI-driven content strategies. What I do differently? I don't teach you to chase likes—I teach you to 
                build digital assets. I don't build funnels—I build credibility engines that attract clients."
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Business Strategist & Independent Director | IIM-A Alum</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Empowering 10,000+ Women Entrepreneurs across India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Featured in Times of India, Hindustan Times, Financial Express</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Invited Trainer at IIM Ahmedabad, BNI, and leading business forums</span>
                </div>
              </div>
              <div className="mb-8">
                <h4 className="font-semibold mb-4 text-primary">Signature Work Includes:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>→ LinkedIn Systems that attract inbound leads</li>
                  <li>→ Instagram Automation for content + community</li>
                  <li>→ Website & Funnel Revamps (No-code + Smart design)</li>
                  <li>→ AI-powered Content Strategy</li>
                  <li>→ Weekly Masterclasses & Offline Events for Women Founders</li>
                </ul>
              </div>
              <Button variant="outline" size="lg" className="group">
                Connect with Nikita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="relative">
              <img
                src={founderImage}
                alt="Nikita Vora - SHELeadsIndia Founder"
                className="rounded-2xl shadow-elegant w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-sm">Women Empowered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Makes SHELeads Special
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              SHELeads is dedicated to empowering women entrepreneurs and professionals by providing a tailored 
              business solution for establishing and growing their businesses in the digital world.
            </p>
          </div>

          {/* What Sets Us Apart */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-12">What Sets Us Apart?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Designed Exclusively for Women</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our platform is crafted to support women in advancing their business ventures with understanding and empathy.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Empowerment for Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">We help women elevate their businesses and create inspiring success stories that celebrate both achievement and values.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Independent E-commerce Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Unique opportunity for women entrepreneurs to manage and develop their online businesses independently with expert guidance.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Platform Offerings */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-12">Our Platform Offers</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-6 rounded-lg" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Networking Opportunities</h4>
                  <p className="text-sm text-muted-foreground">Connect with other entrepreneurs for collaboration and support</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Exclusive Digital Marketplace</h4>
                  <p className="text-sm text-muted-foreground">A space specifically for women entrepreneurs to showcase and sell their products</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Affordable Website Development</h4>
                  <p className="text-sm text-muted-foreground">Get your business online with a professionally developed website at a nominal charge</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Expert Mentoring</h4>
                  <p className="text-sm text-muted-foreground">Receive guidance from industry professionals and experienced mentors</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-lg" style={{ backgroundColor: 'rgba(230, 0, 5, 0.05)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Focused Training Modules</h4>
                  <p className="text-sm text-muted-foreground">Enhance your skills with targeted training designed to help you succeed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Heart of Our Mission
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We exist to create a world where every Indian woman's entrepreneurial spirit is nurtured, 
              celebrated, and given the tools to flourish—digitally savvy yet culturally rooted, globally ambitious yet locally connected.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Achievements */}
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From a vision to transform women's entrepreneurship to becoming Maharashtra's 
              leading business community.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((milestone, index) => (
              <div key={index} className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4">
                    {milestone.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-16 flex-shrink-0" style={{ backgroundColor: 'rgba(230, 0, 35, 0.2)' }} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-20 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Media Coverage & Recognition
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our work has been recognized by leading publications and organizations 
              across India.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mediaFeatures.map((publication, index) => (
              <div key={index} className="bg-background p-6 rounded-lg text-center shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="font-semibold text-sm text-muted-foreground">
                  {publication}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Presence */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Regional Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building strong entrepreneurial ecosystems across Maharashtra, 
              one city at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { city: "Pune", members: "200+", events: "24", businesses: "150+" },
              { city: "Nagpur", members: "180+", events: "18", businesses: "120+" },
              { city: "Nashik", members: "120+", events: "12", businesses: "85+" }
            ].map((region, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{region.city}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-bold text-primary">{region.members}</div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div>
                      <div className="font-bold text-primary">{region.events}</div>
                      <div className="text-xs text-muted-foreground">Events</div>
                    </div>
                    <div>
                      <div className="font-bold text-primary">{region.businesses}</div>
                      <div className="text-xs text-muted-foreground">Businesses</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Join {region.city} Chapter
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'rgba(230, 0, 35, 0.05)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Be Part of Our Story?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of women who've already transformed their businesses 
              and lives through our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                Join Our Community
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;