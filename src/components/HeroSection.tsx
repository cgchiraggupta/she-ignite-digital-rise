import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedCounter from "@/components/AnimatedCounter";
// Using direct path to media folder image

const HeroSection = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const headlineWords = ["Transform", "Your"];
  const highlightWords = ["Business", "Dreams"];
  const finalWords = ["Into", "Digital", "Success"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const subheadingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 1.4 }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 1.8 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/media/IMG_0011.JPG"
          alt="Empowering Women Entrepreneurs"
          className="w-full h-full object-cover"
          style={{
            objectPosition: isMobile ? 'center 15%' : 'center center',
            height: '100vh',
            width: '100%',
            maxWidth: '100vw'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="max-w-2xl text-background">
          {/* Location Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
                          className="inline-flex items-center gap-2 backdrop-blur-sm text-background px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(230, 0, 35, 0.2)' }}
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Pune • Nagpur • Nashik</span>
          </motion.div>

          {/* Main Headline with Staggered Animation */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap gap-x-4">
              <motion.span variants={wordVariants}>Every</motion.span>
              <motion.span variants={wordVariants}>Indian</motion.span>
            </div>
            <motion.div className="block" variants={wordVariants}>
              <span className="text-primary mr-4">Woman</span>
              <span className="text-primary">Deserves</span>
            </motion.div>
            <div className="flex flex-wrap gap-x-4">
              <motion.span variants={wordVariants}>Digital</motion.span>
              <motion.span variants={wordVariants}>Success</motion.span>
            </div>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-background/90"
            variants={subheadingVariants}
            initial="hidden"
            animate="visible"
          >
            From your dreams to digital reality - we walk alongside ambitious Indian women entrepreneurs 
            as they master AI, build authentic brands, and create businesses that honor both tradition and innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(230, 0, 35, 0.4)"
              }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                Start Your Journey
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <Button asChild variant="white" size="xl" className="w-full sm:w-auto">
                <Link to="/success-stories">
                  Watch Success Stories
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-background/20"
            ref={sectionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <div>
              <AnimatedCounter 
                target={500} 
                suffix="+" 
                className="text-2xl font-bold text-primary" 
              />
              <div className="text-sm text-background/80">Women Empowered</div>
            </div>
            <div>
              <AnimatedCounter 
                target={3} 
                className="text-2xl font-bold text-primary" 
              />
              <div className="text-sm text-background/80">Cities & Growing</div>
            </div>
            <div>
              <AnimatedCounter 
                target={98} 
                suffix="%" 
                className="text-2xl font-bold text-primary" 
              />
              <div className="text-sm text-background/80">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;