import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Users, MapPin, Calendar, Target, Heart, ChevronLeft, ChevronRight, X } from "lucide-react";
import founderImage from "@/assets/she-leads-membership.webp";
import { useState, useEffect } from "react";

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupLogoIndex, setPopupLogoIndex] = useState(0);

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



  const mediaFeatures = [
    {
      name: "United News of India",
      url: "https://www.uniindia.com/empowerher24-of-sheleads-on-the-mission-to-transfoming-future-of-women-entrepreneurs/business-wire-india/news/3349214.html",
      logo: "/media/united news of india.jpg"
    },
    {
      name: "WN.com",
      url: "https://article.wn.com/view/2024/12/19/EmpowerHER24_of_SHELeads_On_the_Mission_to_Transfoming_Futur/",
      logo: "/media/wn logo.png"
    },
    {
      name: "Ad Hoc News",
      url: "https://www.ad-hoc-news.de/boerse/news/marktberichte/empowerher24-of-sheleads-on-the-mission-to-transforming-future-of-women/66321549",
      logo: "/media/ad hoc news logo.jpg"
    },
    {
      name: "Kalkine Media",
      url: "https://kalkinemedia.com/in/business/healthcare/empowerher24-of-sheleads-on-the-mission-to-transfoming-future-of-women-entrepreneurs",
      logo: "/media/kalkine media logo.png"
    },
    {
      name: "Times Tech",
      url: "https://timestech.in/businesswire/?for=N&Value=vEFxp6Mfc84tqvQIfqcl5QgsAe3llrbC%2fwjjK%2fc81l8bIQhJPPqb97lHYwI%3d",
      logo: "/media/times tech logo.png"
    },
    {
      name: "IANS Wire Service",
      url: "https://www.ians.in/business-wire-detail/empowerher24-of-sheleads-on-the-mission-to-transfoming-future-of-women-entrepreneurs-19-12-2024",
      logo: "/media/ians wire service  logo.png"
    },
    {
      name: "Business News This Week",
      url: "https://businessnewsthisweek.com/business-wire-listing/?for=N&Value=i%2bty63agk4y3eEYhhJ%2fIwAi9%2fjSGNJ6X4gi0UE8CfEgdDwjJIx4JqC6j%2fAI%3d",
      logo: "/media/business news this week logo.jpg"
    }
  ];

  // Auto popup after 3 seconds
  useEffect(() => {
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(popupTimer);
  }, []);

  // Auto-changing logos in popup
  useEffect(() => {
    if (!showPopup) return;
    
    const logoTimer = setInterval(() => {
      setPopupLogoIndex((prev) => (prev + 1) % mediaFeatures.length);
    }, 2000); // Change logo every 2 seconds

    return () => clearInterval(logoTimer);
  }, [showPopup, mediaFeatures.length]);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mediaFeatures.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(timer);
  }, [isAutoPlaying, mediaFeatures.length]);

  // Get visible items for carousel (3 at a time on desktop, middle one changes)
  const getVisibleItems = () => {
    const leftIndex = (currentSlide - 1 + mediaFeatures.length) % mediaFeatures.length;
    const centerIndex = currentSlide;
    const rightIndex = (currentSlide + 1) % mediaFeatures.length;
    
    return [
      mediaFeatures[leftIndex],
      mediaFeatures[centerIndex],
      mediaFeatures[rightIndex]
    ];
  };

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaFeatures.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediaFeatures.length) % mediaFeatures.length);
  };

  return (
    <div className="min-h-screen">
      <style>
        {`
          @keyframes popupSubtle {
            0%, 100% { 
              transform: scale(1) translateY(0px); 
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            50% { 
              transform: scale(1.05) translateY(-5px); 
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(230, 0, 35, 0.2);
            }
          }
          
          .text-shadow-strong {
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 4px rgba(0, 0, 0, 0.5);
          }
          
          .text-shadow-medium {
            text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7), 0px 0px 3px rgba(0, 0, 0, 0.4);
          }
          
          @media (max-width: 768px) {
            .text-shadow-strong {
              text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6), 0px 0px 2px rgba(0, 0, 0, 0.3);
            }
            
            .text-shadow-medium {
              text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5), 0px 0px 2px rgba(0, 0, 0, 0.3);
            }
          }
        `}
      </style>
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="py-16 md:py-24 text-white relative bg-cover bg-center bg-no-repeat min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden"
        style={{ 
          backgroundImage: 'url(/media/market-place.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll',
          margin: 0,
          padding: 0
        }}
      >
        {/* Light overlay for mobile, darker for desktop */}
        <div className="absolute inset-0 bg-black bg-opacity-10 md:bg-opacity-25"></div>
        
        <div className="w-full px-4 relative z-10 flex items-center min-h-[50vh] md:min-h-[60vh]">
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 md:mb-6 drop-shadow-2xl text-shadow-strong">
              About Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-95 font-light leading-relaxed drop-shadow-xl text-shadow-medium max-w-3xl mx-auto">
              Discover the story behind SHELeads India and meet the team dedicated to empowering women entrepreneurs.
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

          {/* Media Carousel */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Carousel Content */}
            <div className="overflow-visible py-8">
              <div className="flex transition-transform duration-500 ease-in-out">
                                 {/* Desktop View - 3 items */}
                 <div className="hidden lg:flex w-full gap-8 items-center justify-center">
                   {getVisibleItems().map((publication, index) => (
                     <a 
                       key={`${currentSlide}-${index}`}
                       href={publication.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex-1 bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 block group border border-gray-100 hover:border-primary/30"
                       style={index === 1 ? {
                         animation: 'popupSubtle 3s ease-in-out infinite'
                       } : {}}
                     >
                       <div className="flex flex-col items-center justify-center h-full">
                         <div className="w-full h-20 mb-4 flex items-center justify-center">
                           <img 
                             src={publication.logo} 
                             alt={publication.name}
                             className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
                           />
                         </div>
                         <div className={`font-medium text-sm transition-colors duration-300 ${
                           index === 1 ? 'text-primary' : 'text-gray-600 group-hover:text-primary'
                         }`}>
                           {publication.name}
                         </div>
                       </div>
                     </a>
                   ))}
                 </div>

                                 {/* Mobile/Tablet View - 1 item */}
                 <div className="lg:hidden flex justify-center w-full py-4">
                   {[mediaFeatures[currentSlide]].map((publication, index) => (
                     <a 
                       key={`mobile-${currentSlide}-${index}`}
                       href={publication.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 block group border border-gray-100 hover:border-primary/30 max-w-md w-full"
                       style={{
                         animation: 'popupSubtle 3s ease-in-out infinite'
                       }}
                     >
                       <div className="flex flex-col items-center justify-center h-full">
                         <div className="w-full h-20 mb-4 flex items-center justify-center">
                           <img 
                             src={publication.logo} 
                             alt={publication.name}
                             className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
                           />
                         </div>
                         <div className="font-medium text-sm text-primary transition-colors duration-300">
                           {publication.name}
                         </div>
                       </div>
                     </a>
                   ))}
                 </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>

            {/* Carousel Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {mediaFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

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

      {/* Auto Popup Modal with Changing Logos */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg mx-4 relative shadow-2xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              {/* Changing Media Logo */}
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 p-3">
                <img 
                  src={mediaFeatures[popupLogoIndex].logo} 
                  alt={mediaFeatures[popupLogoIndex].name}
                  className="max-w-full max-h-full object-contain transition-all duration-500"
                />
              </div>
              
              <p className="text-sm text-primary font-medium mb-2">
                Featured in {mediaFeatures[popupLogoIndex].name}
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Welcome to SHELeads India!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Join 500+ women entrepreneurs transforming their businesses with AI, MarTech, and digital strategies.
              </p>
              
              <div className="space-y-3">
                <Button 
                  className="w-full rounded-xl" 
                  onClick={() => setShowPopup(false)}
                >
                  Explore Our Programs
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl"
                  onClick={() => setShowPopup(false)}
                >
                  Join Free Masterclass
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                ✨ Featured in 15+ publications • 98% success rate
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default About;