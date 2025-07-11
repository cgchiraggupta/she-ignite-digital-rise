"use client"

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Download, MapPin, Users, CheckCircle, MessageCircle, Star, Clock, TrendingUp } from "lucide-react"

const StartHere = () => {
  const cities = [
    {
      name: "Pune",
      description: "Tech Hub Programs",
      programs: 3,
      whatsappLink: "https://digitalstepup.kit.com/d00ef39749",
      buttonText: "Join Pune Group",
      backgroundImage: "/media/DSC02132.JPG",
    },
    {
      name: "Nagpur",
      description: "Business Growth Focus",
      programs: 2,
      whatsappLink: "#",
      buttonText: "Coming Soon",
      backgroundImage: "/media/DSC02211.JPG",
    },
    {
      name: "Nashik",
      description: "Startup Accelerator",
      programs: 2,
      whatsappLink: "https://rebrand.ly/SHELeadsNashik",
      buttonText: "Join Nashik Group",
      backgroundImage: "/media/DSC02233.JPG",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Discover Your Tribe",
      description:
        "Connect with your regional sister circle and access resources crafted specifically for your community.",
      image: "/media/networking.JPG",
    },
    {
      number: "02",
      title: "Embrace Your Tools",
      description: "Download proven resources that honor your values while accelerating your business dreams.",
      image: "/media/IMG-20231220-WA0023.jpg",
    },
    {
      number: "03",
      title: "Begin Your Transformation",
      description: "Step into a supportive sisterhood where your success is celebrated and your journey is honored.",
      image: "/media/Mentoring.JPG",
    },
  ]

  const whatsappBenefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Daily Engagement & Learning",
      description: "Participate in interactive discussions before 4 PM",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Post Your Promotions",
      description: "Share your business offers, services, or products after 4 PM",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Marketing Tips & Hacks",
      description: "Gain valuable insights into digital marketing",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Weekly FREE Training & Networking Events",
      description: "Build skills and connections",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section
        className="py-20 text-white relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 4, 42, 0.27), rgba(255, 0, 38, 0.17)), url('https://i.ibb.co/pjkp6PCQ/DSC02066.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height:600
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Your Beautiful Journey
              <span className="block">Begins Right Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-md">
              Every great transformation starts with a single, brave step. Find your community, embrace resources
              created just for you, and begin writing your success story.
            </p>
          </div>
        </div>

        {/* Floating elements for visual appeal */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </section>

      {/* City Selection with Transparent Cards */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Find Your Sister Circle
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with the incredible women in your city who share your dreams and understand your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {cities.map((city, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:rotate-1"
                style={{
                  backgroundImage: `url('${city.backgroundImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Transparent overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-primary/80 group-hover:via-primary/30 transition-all duration-500"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="transform transition-all duration-300 group-hover:translate-y-[-10px]">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-300">
                      <MapPin className="h-6 w-6" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{city.name}</h3>
                    <p className="text-white/90 mb-3 drop-shadow-md">{city.description}</p>

                    <div className="mb-4">
                      <span className="text-2xl font-bold">{city.programs}</span>
                      <span className="text-white/80 ml-2">Active Programs</span>
                    </div>

                    {city.whatsappLink !== "#" ? (
                      <Button
                        variant="secondary"
                        className="w-full group/btn bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm"
                        onClick={() => window.open(city.whatsappLink, "_blank")}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {city.buttonText}
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    ) : (
                      <Button variant="secondary" className="w-full bg-white/50 text-gray-700" disabled>
                        {city.buttonText}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Group Benefits */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(230, 0, 35, 0.05), rgba(230, 0, 35, 0.1)), url('/media/she-leads-hero-section.JPG')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-primary/20">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">WhatsApp Community</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Why Join Our WhatsApp Group?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of an exclusive community of ambitious women entrepreneurs who support each other's growth and
              success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {whatsappBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-md hover:bg-white/95 transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-pink-600/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110">
                    {benefit.icon}
                  </div>
                  <div className="flex items-center justify-center mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-lg">{benefit.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="xl"
                className="group shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open("https://rebrand.ly/SHELeadsNashik", "_blank")}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Join Nashik Group
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="group bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.open("https://digitalstepup.kit.com/d00ef39749", "_blank")}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Join Pune Group
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Steps with Images */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
              Your Sacred Path to Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these gentle yet powerful steps to begin your entrepreneurial transformation with grace and
              intention.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative group">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-32 left-1/2 w-full h-0.5 transform translate-x-8 bg-gradient-to-r from-primary/30 to-pink-600/30" />
                )}
                <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {/* Step Image */}
                  <div
                    className="w-full h-48 rounded-xl mb-6 bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: `url('${step.image}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources CTA */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(230, 0, 35, 0.9), rgba(204, 0, 31, 0.9)), url('/assets/founder-portrait.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="rounded-2xl p-8 md:p-12 text-center bg-white/10 backdrop-blur-md border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white drop-shadow-lg">
              Ready to Honor Your Dreams?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Download your complete business transformation kit and join thousands of inspiring Indian women who chose
              courage over comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="xl" className="group bg-white text-primary hover:bg-white/90 shadow-lg">
                <Download className="h-5 w-5 mr-2" />
                Claim Your Free Resources
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Your Sister Circle
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default StartHere
