import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProgramsShowcase from "@/components/ProgramsShowcase";
import TestimonialCard from "@/components/TestimonialCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users, Award, TrendingUp, Mic, Play } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  // Podcast carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const podcastEpisodes = [
    {
      id: 1,
      title: "From Atta Chakki to Shark Tank | SHELeads India",
      description: "Sangeeta dives into the ups and downs of entrepreneurship, her experience pitching on a national platform, and the lessons she's learned along the way.",
      embedUrl: "https://www.youtube.com/embed/CfQk2FaS68A",
      thumbnail: "https://img.youtube.com/vi/CfQk2FaS68A/maxresdefault.jpg"
    },
    {
      id: 2,
      title: "Inspiring journey of a makeup artist | SHELeads India", 
      description: "This episode is a must-watch for anyone seeking inspiration, insights, or the motivation to carve their own path!",
      embedUrl: "https://www.youtube.com/embed/Cjtxwlz4uUI",
      thumbnail: "https://img.youtube.com/vi/Cjtxwlz4uUI/maxresdefault.jpg"
    },
    {
      id: 3,
      title: "The twenty year old solopreneur | SHELeads India",
      description: "Meet an inspiring young entrepreneur who's building her empire at just twenty years old. Discover her secrets to success.",
      embedUrl: "https://www.youtube.com/embed/tZxTcIwGpTA",
      thumbnail: "https://img.youtube.com/vi/tZxTcIwGpTA/maxresdefault.jpg"
    },
    {
      id: 4,
      title: "Her Legacy: A Lawyer's Impact on RERA and Entrepreneurship | SHELeads India",
      description: "Meet Adv. Amruta Salunke: Lawyer, RERA Expert, and Women Entrepreneur. A remarkable journey in a male-dominated industry.",
      embedUrl: "https://www.youtube.com/embed/bsgUGK9pQ6U",
      thumbnail: "https://img.youtube.com/vi/bsgUGK9pQ6U/maxresdefault.jpg"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % podcastEpisodes.length);
      setIsPlaying(false); // Reset play state when slide changes
    }, 3000); // 3 seconds per slide
    
    return () => clearInterval(timer);
  }, [podcastEpisodes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % podcastEpisodes.length);
    setIsPlaying(false); // Reset play state
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + podcastEpisodes.length) % podcastEpisodes.length);
    setIsPlaying(false); // Reset play state
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false); // Reset play state
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
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

  // Podcast slide animation variants
  const slideVariants = {
    enter: {
      scale: 0.95,
      opacity: 0,
    },
    center: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        opacity: { duration: 0.4 }
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const testimonials = [
    {
      quote: "SHELeadsIndia didn't just teach me digital marketing—they helped me rediscover my confidence as an Indian woman in business. Today, my home-grown brand reaches families across Maharashtra, staying true to our values while embracing innovation.",
      author: "Priya Sharma",
      title: "Founder, Eco-Friendly Home Products",
      city: "Pune"
    },
    {
      quote: "Here, I found more than business strategies—I found a sisterhood. The woman sitting beside me at our first meetup became my business partner, and together we're creating solutions that make our community proud.",
      author: "Anita Desai",
      title: "Co-founder, Tech Solutions",
      city: "Nagpur"
    },
    {
      quote: "As a young mother from Nashik, I thought my entrepreneurial dreams would have to wait. SHELeadsIndia showed me how to build a thriving business from home, honoring both my family values and my ambitions.",
      author: "Meera Patel",
      title: "Fashion Brand Owner",
      city: "Nashik"
    }
  ];

  const leadMagnets = [
    {
      title: "5-Day Sacred Business Journey",
      description: "Transform your business dreams into reality with daily intention-setting practices designed by inspiring Indian women entrepreneurs.",
      icon: TrendingUp
    },
    {
      title: "Discover Your Authentic Brand Heart",
      description: "Uncover your unique brand essence and receive personalized guidance for expressing your truth with confidence.",
      icon: Award
    },
    {
      title: "Mindful Launch Success Ritual",
      description: "Everything you need to birth your venture with grace, ensuring every sacred step is honored in your business journey.",
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
              Stories of Courage,
              <span className="block text-primary">Journeys of Triumph</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every success story here represents a brave woman who chose to believe in herself. 
              These are the voices of determination, the proof that your dreams are not just possible—they're inevitable.
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
              Heartfelt Conversations – 
              <span className="block text-primary">Voices That Inspire</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Listen to the authentic stories of Indian women entrepreneurs who turned their dreams into reality. 
              Real journeys, genuine struggles, and beautiful victories that will touch your heart and fuel your courage.
            </p>
          </motion.div>

          {/* Video Carousel */}
          <motion.div 
            className="relative max-w-lg mx-auto mb-12"
            variants={fadeInUp}
          >
            {/* Animated Video Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-background"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div 
                  className="aspect-video relative bg-cover bg-center bg-no-repeat rounded-t-3xl overflow-hidden cursor-pointer"
                  style={{ 
                    backgroundImage: `url(${podcastEpisodes[currentSlide].thumbnail})` 
                  }}
                  onClick={handlePlayClick}
                >
                  {/* Show iframe only when playing */}
                  {isPlaying ? (
                    <iframe
                      src={`${podcastEpisodes[currentSlide].embedUrl}?autoplay=1`}
                      title={podcastEpisodes[currentSlide].title}
                      className="w-full h-full absolute inset-0"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    /* Play button overlay */
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
                      </motion.div>
                    </motion.div>
                  )}
                </div>
                
                {/* Video Info */}
                <motion.div 
                  className="p-4 bg-background"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {podcastEpisodes[currentSlide].title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {podcastEpisodes[currentSlide].description}
                  </p>
                </motion.div>

                {/* Episode Counter */}
                <motion.div 
                  className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  {currentSlide + 1} / {podcastEpisodes.length}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-1">
              {podcastEpisodes.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentSlide === index 
                      ? 'bg-primary scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
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
              Sacred Tools to Begin
              <span className="block text-primary">Your Beautiful Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Embrace these carefully crafted resources designed to honor your dreams 
              and guide your first steps toward entrepreneurial success.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16 items-stretch"
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
                  className="bg-background rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 flex flex-col h-full group"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    y: -4
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center flex-1 flex flex-col">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors" style={{ backgroundColor: 'rgba(230, 0, 35, 0.1)' }}>
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{magnet.title}</h3>
                    <p className="text-muted-foreground mb-8 flex-1">{magnet.description}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="mt-auto"
                    >
                      <Button variant="outline" className="group w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Free
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  </div>
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
              Ready to Honor Your Entrepreneurial Dreams?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join a growing sisterhood of Indian women entrepreneurs who've chosen courage over comfort 
              and are building businesses that celebrate both success and values. Your transformation begins with one brave step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="hero" size="xl" className="group">
                  Begin Your Sacred Journey
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="outline" size="xl">
                  Connect with Your Sister Guide
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
