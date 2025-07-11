import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProgramsShowcase from "@/components/ProgramsShowcase";
import TestimonialCard from "@/components/TestimonialCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users, Award, TrendingUp, Mic, Play, ChevronLeft, ChevronRight, Camera, Calendar } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  // Podcast carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Media carousel state
  const [mediaCurrentSlide, setMediaCurrentSlide] = useState(0);
  const [isMediaAutoPlaying, setIsMediaAutoPlaying] = useState(true);
  
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

  // Media carousel auto-rotation
  useEffect(() => {
    if (!isMediaAutoPlaying) return;
    
    const mediaTimer = setInterval(() => {
      setMediaCurrentSlide((prev) => (prev + 1) % mediaFeatures.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(mediaTimer);
  }, [isMediaAutoPlaying, mediaFeatures.length]);

  // Get visible media items for carousel (3 at a time on desktop, middle one changes)
  const getVisibleMediaItems = () => {
    const leftIndex = (mediaCurrentSlide - 1 + mediaFeatures.length) % mediaFeatures.length;
    const centerIndex = mediaCurrentSlide;
    const rightIndex = (mediaCurrentSlide + 1) % mediaFeatures.length;
    
    return [
      mediaFeatures[leftIndex],
      mediaFeatures[centerIndex],
      mediaFeatures[rightIndex]
    ];
  };

  // Media navigation functions
  const goToMediaSlide = (index: number) => {
    setMediaCurrentSlide(index);
  };

  const nextMediaSlide = () => {
    setMediaCurrentSlide((prev) => (prev + 1) % mediaFeatures.length);
  };

  const prevMediaSlide = () => {
    setMediaCurrentSlide((prev) => (prev - 1 + mediaFeatures.length) % mediaFeatures.length);
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
      quote: "From running a traditional atta chakki to pitching on Shark Tank India - SHELeadsIndia helped me transform my business and navigate entrepreneurship challenges. This incredible journey taught me that with passion and determination, dreams truly have no limits!",
      author: "Sangeeta",
      title: "From Atta Chakki to Shark Tank",
      city: "Mumbai"
    },
    {
      quote: "Building my makeup artistry brand in the competitive beauty industry was challenging until SHELeadsIndia showed me how to blend creativity with smart business strategies. Now I'm living my passion while inspiring the next generation of artists!",
      author: "Payaal Jain",
      title: "Professional Makeup Artist & Entrepreneur",
      city: "Pune"
    },
    {
      quote: "Breaking into the male-dominated legal industry while building my YouTube presence felt impossible until SHELeadsIndia showed me the path forward. Now I successfully balance my RERA expertise with content creation, empowering women through legal education every single day!",
      author: "Adv. Amruta Salunke",
      title: "RERA Expert, Lawyer & YouTuber",
      city: "Pune"
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
        `}
      </style>
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Programs Section */}
      <ProgramsShowcase />

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/success-stories">
                  Read More Success Stories
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
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
                  <p className="text-gray-600 text-sm line-clamp-2">
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

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

      {/* SHELeads Platform Section */}
      <motion.section 
        className="py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={fadeInUp}>
              <div className="mb-6">
                <img 
                  src="/she-leads-logo.png" 
                  alt="SHELeads" 
                  className="h-16 md:h-20 w-auto"
                />
              </div>
              <p className="text-lg text-gray-700 mb-8">
                SHELeads has created a business solution specially designed for women entrepreneurs 
                and professionals with an offering that aims to help them set up their businesses 
                in the digital world.
              </p>
              
              <h3 className="text-2xl font-semibold mb-6">What makes it different?</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-foreground text-xs font-bold">✓</span>
                  </div>
                  <span className="text-foreground">Created Exclusively for Women to grow in business</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <span className="text-primary-foreground text-xs font-bold">✓</span>
                  </div>
                  <span className="text-foreground">Empowering Women To Take their Business to the next level and help them create great Success Stories</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                This solution and platform is a Win-Win situation for all women entrepreneurs that gives 
                women entrepreneurs an independent platform to manage and develop their online E-commerce 
                business under the guidance and training of expert professionals while also giving them 
                their own e-commerce web store to do business and direct interact with customers without 
                any third party involvement.
              </p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4">The platform provides access to:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>A Networking Platform with other entrepreneurs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>A Digital Market Place exclusively for women entrepreneurs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Website Development at a Nominal Charge</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Features Grid */}
            <motion.div variants={fadeInUp}>
              <div className="grid grid-cols-2 gap-6">
                {/* Mentoring */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-48 rounded-xl mb-3 overflow-hidden bg-gray-50">
                    <img 
                      src="/media/Mentoring.JPG" 
                      alt="Mentoring" 
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: 'brightness(0.75) contrast(1.15) saturate(1.1)',
                        imageRendering: 'crisp-edges',
                        transition: 'none'
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Mentoring</h3>
                  <p className="text-sm text-gray-800">Expert guidance to accelerate your business growth</p>
                </motion.div>

                {/* Networking */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-48 rounded-xl mb-3 overflow-hidden bg-gray-50">
                    <img 
                      src="/media/networking.JPG" 
                      alt="Networking" 
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: 'brightness(0.7) contrast(1.2) saturate(1.1)',
                        imageRendering: 'crisp-edges',
                        transition: 'none'
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Networking</h3>
                  <p className="text-sm text-gray-800">Connect with like-minded women entrepreneurs</p>
                </motion.div>

                {/* Building Website */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mb-3 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Building Website</h3>
                  <p className="text-sm text-gray-800">Create your professional online presence</p>
                </motion.div>

                {/* Market Place */}
                <motion.div 
                  className="bg-white rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-48 rounded-xl mb-3 overflow-hidden bg-gray-50">
                    <img 
                      src="/media/market-place.JPG" 
                      alt="Market Place" 
                      className="w-full h-full object-cover object-center"
                      style={{
                        filter: 'brightness(0.75) contrast(1.15) saturate(1.1)',
                        imageRendering: 'crisp-edges',
                        transition: 'none'
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Market Place</h3>
                  <p className="text-sm text-gray-800">Exclusive platform for women-led businesses</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

      {/* Media Coverage & Recognition */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Media Coverage & Recognition
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our work has been recognized by leading publications and organizations 
              across India.
            </p>
          </motion.div>

          {/* Media Carousel */}
          <motion.div 
            className="relative"
            variants={fadeInUp}
            onMouseEnter={() => setIsMediaAutoPlaying(false)}
            onMouseLeave={() => setIsMediaAutoPlaying(true)}
          >
            {/* Carousel Content */}
            <div className="overflow-visible py-8">
              <div className="flex transition-transform duration-500 ease-in-out">
                {/* Desktop View - 3 items */}
                <div className="hidden lg:flex w-full gap-8 items-center justify-center">
                  {getVisibleMediaItems().map((publication, index) => (
                    <motion.a 
                      key={`${mediaCurrentSlide}-${index}`}
                      href={publication.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 block group border border-gray-100 hover:border-primary/30"
                      style={index === 1 ? {
                        animation: 'popupSubtle 3s ease-in-out infinite'
                      } : {}}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.3 }}
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
                    </motion.a>
                  ))}
                </div>

                {/* Mobile/Tablet View - 1 item */}
                <div className="lg:hidden flex justify-center w-full py-4">
                  {[mediaFeatures[mediaCurrentSlide]].map((publication, index) => (
                    <motion.a 
                      key={`mobile-${mediaCurrentSlide}-${index}`}
                      href={publication.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 block group border border-gray-100 hover:border-primary/30 max-w-md w-full"
                      style={{
                        animation: 'popupSubtle 3s ease-in-out infinite'
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.3 }}
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
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevMediaSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={nextMediaSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>

            {/* Carousel Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {mediaFeatures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToMediaSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === mediaCurrentSlide 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Thin black line divider */}
      <div className="w-full h-px bg-black opacity-20"></div>

      {/* Event Gallery Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Photos of Our Events
              <span className="block text-primary">Creating Memories Together</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Glimpses from our inspiring workshops, networking events, and community gatherings
            </p>
          </motion.div>

          {/* Gallery Grid - 4 photos + Join Event CTA */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {/* Photo 1 */}
            <motion.div 
              className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <img
                src="/media/DSC02058.JPG"
                alt="Event photo 1"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Photo 2 */}
            <motion.div 
              className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <img
                src="/media/DSC02132.JPG"
                alt="Event photo 2"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Photo 3 */}
            <motion.div 
              className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <img
                src="/media/IMG_0013.JPG"
                alt="Event photo 3"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Photo 4 */}
            <motion.div 
              className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <img
                src="/media/DSC02233.JPG"
                alt="Event photo 4"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>

            {/* Join Next Event CTA */}
            <motion.div 
              className="aspect-square bg-gradient-to-br from-primary to-primary/80 rounded-lg flex flex-col items-center justify-center text-white shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => window.location.href = '/events-gallery'}
            >
              <Calendar className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <p className="text-center text-sm font-medium px-4 leading-tight">
                Join Our
                <br />
                <span className="font-bold">Next Event</span>
              </p>
              <ArrowRight className="h-4 w-4 mt-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </motion.div>

          {/* Watch All Photos Button */}
          <motion.div className="text-center" variants={fadeInUp}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/events-gallery">
                  <Camera className="h-5 w-5 mr-2" />
                  Watch All Photos
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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                    <p className="text-gray-600 mb-8 flex-1">{magnet.description}</p>
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
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
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
