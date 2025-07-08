import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProgramsShowcase from "@/components/ProgramsShowcase";
import TestimonialCard from "@/components/TestimonialCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users, Award, TrendingUp, Mic, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  // Podcast carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const podcastEpisodes = [
    {
      id: 1,
      title: "From Atta Chakki to Shark Tank | SHELeads India",
      description: "Sangeeta dives into the ups and downs of entrepreneurship, her experience pitching on a national platform, and the lessons she's learned along the way.",
      embedUrl: "https://www.youtube.com/embed/CfQk2FaS68A"
    },
    {
      id: 2,
      title: "Inspiring journey of a makeup artist | SHELeads India", 
      description: "This episode is a must-watch for anyone seeking inspiration, insights, or the motivation to carve their own path!",
      embedUrl: "https://www.youtube.com/embed/Cjtxwlz4uUI"
    },
    {
      id: 3,
      title: "The twenty year old solopreneur | SHELeads India",
      description: "Meet an inspiring young entrepreneur who's building her empire at just twenty years old. Discover her secrets to success.",
      embedUrl: "https://www.youtube.com/embed/tZxTcIwGpTA"
    },
    {
      id: 4,
      title: "Her Legacy: A Lawyer's Impact on RERA and Entrepreneurship | SHELeads India",
      description: "Meet Adv. Amruta Salunke: Lawyer, RERA Expert, and Women Entrepreneur. A remarkable journey in a male-dominated industry.",
      embedUrl: "https://www.youtube.com/embed/bsgUGK9pQ6U"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % podcastEpisodes.length);
    }, 3000); // 3 seconds per slide
    
    return () => clearInterval(timer);
  }, [podcastEpisodes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % podcastEpisodes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + podcastEpisodes.length) % podcastEpisodes.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  const testimonials = [
    {
      quote: "SHELeadsIndia transformed my small business into a six-figure enterprise in just 8 months. The AI marketing tools alone saved me 20 hours per week!",
      author: "Priya Sharma",
      title: "Founder, Eco-Friendly Home Products",
      city: "Pune"
    },
    {
      quote: "The community support is incredible. I found my business partner through a SHE networking event, and we've since launched two successful ventures together.",
      author: "Anita Desai",
      title: "Co-founder, Tech Solutions",
      city: "Nagpur"
    },
    {
      quote: "From zero digital presence to 50k Instagram followers in 6 months. The strategies taught here actually work in the real world.",
      author: "Meera Patel",
      title: "Fashion Brand Owner",
      city: "Nashik"
    }
  ];

  const leadMagnets = [
    {
      title: "5-Day Business Growth Planner",
      description: "Daily action plans to accelerate your business growth with proven strategies.",
      icon: TrendingUp
    },
    {
      title: "Brand Confidence Quiz",
      description: "Discover your brand personality and get personalized recommendations.",
      icon: Award
    },
    {
      title: "Pre-Launch Success Checklist",
      description: "Everything you need to launch your business or product successfully.",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Programs Section */}
      <ProgramsShowcase />

      {/* Social Proof Section */}
      <motion.section 
        className="py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Real Women,
              <span className="block text-primary">Real Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. See how women entrepreneurs 
              across Maharashtra are transforming their businesses.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div className="text-center" variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="hero" size="xl" className="group">
                Read More Success Stories
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Podcast Section */}
      <motion.section 
        className="py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                <Mic className="h-8 w-8" style={{ color: '#E60023' }} />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Podcast – 
              <span className="block text-primary">Talks That Glow</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Dive into inspiring conversations with successful women entrepreneurs. 
              Real stories, real struggles, and real victories that will ignite your entrepreneurial spirit.
            </p>
          </motion.div>

          {/* Video Carousel */}
          <motion.div 
            className="relative max-w-lg mx-auto mb-12"
            variants={fadeInUp}
          >
            {/* Compact Video Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-background">
              <div className="aspect-video">
                <iframe
                  src={podcastEpisodes[currentSlide].embedUrl}
                  title={podcastEpisodes[currentSlide].title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              {/* Video Info */}
              <div className="p-4 bg-background">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">
                  {podcastEpisodes[currentSlide].title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {podcastEpisodes[currentSlide].description}
                </p>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Episode Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentSlide + 1} / {podcastEpisodes.length}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {podcastEpisodes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>


          </motion.div>

          {/* CTA to Full Podcast Page */}
          <motion.div className="text-center" variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/podcast">
                  <Mic className="h-5 w-5 mr-2" />
                  Explore All Episodes
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Lead Magnets Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your Journey
              <span className="block text-primary">With Free Resources</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant access to our most valuable business-building tools 
              and start seeing results today.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {leadMagnets.map((magnet, index) => {
              const IconComponent = magnet.icon;
              return (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{magnet.title}</h3>
                  <p className="text-muted-foreground mb-6">{magnet.description}</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button variant="outline" className="group">
                      <Download className="h-4 w-4 mr-2" />
                      Download Free
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Final CTA */}
          <motion.div 
            className="text-center bg-background rounded-2xl p-12 shadow-card" 
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of women entrepreneurs who've already taken control of their 
              digital destiny. Your success story starts with a single step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="hero" size="xl" className="group">
                  Start Your Journey Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="outline" size="xl">
                  Book Free Consultation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Index;
