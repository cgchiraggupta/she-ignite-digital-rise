import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Play, 
  ExternalLink, 
  Youtube, 
  Clock, 
  Eye, 
  Calendar,
  Star,
  Headphones,
  TrendingUp,
  Heart,
  Share2
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";

const Podcast = () => {
  const [hoveredEpisode, setHoveredEpisode] = useState<number | null>(null);
  const featuredRef = useRef(null);
  const allEpisodesRef = useRef(null);
  const isInViewFeatured = useInView(featuredRef, { once: true, margin: "-10%" });
  const isInViewAll = useInView(allEpisodesRef, { once: true, margin: "-10%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const episodes = [
    {
      id: 1,
      title: "From Atta Chakki to Shark Tank | SHELeads India",
      description: "Sangeeta dives into the ups and downs of entrepreneurship, her experience pitching on a national platform, and the lessons she's learned along the way. Her story is a testament to the power of passion and hard work in achieving success.",
      embedUrl: "https://www.youtube.com/embed/CfQk2FaS68A",
      featured: true,
      duration: "15:42",
      views: "2.5K",
      date: "Dec 15, 2024",
      tags: ["Entrepreneurship", "Shark Tank", "Success Story"],
      category: "Business Journey"
    },
    {
      id: 2,
      title: "Inspiring journey of a makeup artist | SHELeads India",
      description: "This episode is a must-watch for anyone seeking inspiration, insights, or the motivation to carve their own path in the beauty industry!",
      embedUrl: "https://www.youtube.com/embed/Cjtxwlz4uUI",
      featured: true,
      duration: "12:18",
      views: "1.8K",
      date: "Dec 12, 2024",
      tags: ["Beauty", "Creative", "Inspiration"],
      category: "Creative Journey"
    },
    {
      id: 3,
      title: "The twenty year old solopreneur | SHELeads India",
      description: "Meet an inspiring young entrepreneur who's building her empire at just twenty years old. Discover her secrets to success and how she's navigating the challenges of being a solopreneur.",
      embedUrl: "https://www.youtube.com/embed/tZxTcIwGpTA",
      featured: false,
      duration: "18:25",
      views: "3.2K",
      date: "Dec 10, 2024",
      tags: ["Young Entrepreneur", "Solo Business", "Gen Z"],
      category: "Youth Leadership"
    },
    {
      id: 4,
      title: "Her Legacy: A Lawyer's Impact on RERA and Entrepreneurship | SHELeads India",
      description: "Meet Adv. Amruta Salunke: Lawyer, RERA Expert, and Women Entrepreneur. A remarkable journey navigating a male-dominated industry while building her own YouTube channel.",
      embedUrl: "https://www.youtube.com/embed/bsgUGK9pQ6U",
      featured: false,
      duration: "22:15",
      views: "890",
      date: "Dec 13, 2024",
      tags: ["Legal", "RERA", "Professional Growth"],
      category: "Professional Excellence"
    },
    {
      id: 5,
      title: "In conversation with SHELeadsIndia Member - Pallavi Godbole - HR Consultant",
      description: "An inspiring conversation with Pallavi Godbole, HR Consultant and SHELeadsIndia member, sharing her professional journey and insights.",
      embedUrl: "https://www.youtube.com/embed/4-WmPejONCo",
      featured: false,
      duration: "16:30",
      views: "650",
      date: "Dec 8, 2024",
      tags: ["HR", "Consulting", "Professional Growth"],
      category: "Professional Excellence"
    },
    {
      id: 6,
      title: "The story of Eclassopedia: online learning Platform by Savita garg | SHELeads India",
      description: "Discover the journey of creating Eclassopedia, an innovative online learning platform, with founder Savita Garg.",
      embedUrl: "https://www.youtube.com/embed/-RSTaEH8irU",
      featured: false,
      duration: "19:45",
      views: "1.1K",
      date: "Dec 5, 2024",
      tags: ["EdTech", "Online Learning", "Platform"],
      category: "Tech Innovation"
    },
    {
      id: 7,
      title: "homemade goods baked with love | SHELeads India",
      description: "Meet a passionate entrepreneur who turned her love for baking into a thriving homemade goods business.",
      embedUrl: "https://www.youtube.com/embed/3vXcX4WPRsE",
      featured: false,
      duration: "14:20",
      views: "780",
      date: "Dec 3, 2024",
      tags: ["Food Business", "Homemade", "Baking"],
      category: "Food & Lifestyle"
    },
    {
      id: 8,
      title: "Scale your buisness | SHELeads India",
      description: "Learn effective strategies and proven methods to scale your business and achieve sustainable growth.",
      embedUrl: "https://www.youtube.com/embed/flImN-c8_pQ",
      featured: false,
      duration: "17:30",
      views: "1.2K",
      date: "Dec 1, 2024",
      tags: ["Business Scaling", "Growth", "Strategy"],
      category: "Business Growth"
    },
    {
      id: 9,
      title: "How Women Can Lead with Voice, Vision & Visibility | Leadership Podcast India",
      description: "Discover how women can step into leadership roles with confidence, vision, and visibility in today's business world.",
      embedUrl: "https://www.youtube.com/embed/kQUNxGxMWmA",
      featured: false,
      duration: "21:45",
      views: "950",
      date: "Nov 28, 2024",
      tags: ["Leadership", "Women Empowerment", "Vision"],
      category: "Leadership"
    }
  ];

  const stats = [
    { icon: Play, label: "Total Episodes", value: "9", color: "text-blue-600" },
    { icon: Eye, label: "Total Views", value: "6,023", color: "text-green-600" },
    { icon: Heart, label: "Subscribers", value: "109", color: "text-red-600" },
    { icon: TrendingUp, label: "Growth Rate", value: "+150%", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-10 right-1/3 w-32 h-32 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                <div className="relative p-6 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Headphones className="h-12 w-12 text-white" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Stories of Courage,
              <span className="block bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                Voices of Transformation
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Listen to the heartfelt journeys of Indian women entrepreneurs who dared to dream, 
              faced their fears, and created businesses that honor both their values and their vision.
            </motion.p>

            {/* Stats Cards */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Episodes Section */}
      <motion.section 
        ref={featuredRef}
        className="py-24 bg-background relative"
        initial="hidden"
        animate={isInViewFeatured ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <Badge variant="secondary" className="mb-4 text-sm font-medium px-4 py-2">
              ⭐ Featured Content
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Featured Episodes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our most inspiring conversations that have touched thousands of hearts and minds
            </p>
          </motion.div>

          <div className="space-y-24">
            {episodes.filter(ep => ep.featured).map((episode, index) => (
              <motion.div 
                key={episode.id}
                className="grid lg:grid-cols-2 gap-12 items-center"
                variants={itemVariants}
                onMouseEnter={() => setHoveredEpisode(episode.id)}
                onMouseLeave={() => setHoveredEpisode(null)}
              >
                <motion.div 
                  className={`${index % 2 === 1 ? 'lg:order-2' : ''} relative group`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
                    <iframe
                      src={episode.embedUrl}
                      title={episode.title}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    
                    {/* Video Overlay Info */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
                      <Clock className="h-4 w-4" />
                      <span className="bg-black/50 px-2 py-1 rounded-full">{episode.duration}</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-6`}
                  initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="space-y-3">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      {episode.category}
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {episode.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {episode.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {episode.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs px-3 py-1">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {episode.views} views
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {episode.date}
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="ghost" size="sm" className="group">
                        <Share2 className="h-4 w-4 group-hover:text-primary transition-colors" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* All Episodes Section */}
      <motion.section 
        ref={allEpisodesRef}
        className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        initial="hidden"
        animate={isInViewAll ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              All Episodes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every conversation is a journey. Explore all our episodes and find the story that resonates with you.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={containerVariants}
          >
            {episodes.map((episode) => (
              <motion.div 
                key={episode.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredEpisode(episode.id)}
                onMouseLeave={() => setHoveredEpisode(null)}
              >
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <div className="relative">
                    <div className="aspect-video rounded-t-lg overflow-hidden bg-black">
                      <iframe
                        src={episode.embedUrl}
                        title={episode.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    
                    {/* Video Duration Badge */}
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white border-0 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {episode.duration}
                      </Badge>
                    </div>
                    
                    {episode.featured && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-primary/90 text-white border-0">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4 space-y-3">
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs font-medium">
                        {episode.category}
                      </Badge>
                      
                      <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {episode.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                        {episode.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {episode.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-gray-100 hover:bg-primary/10 transition-colors">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {episode.views}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {episode.date}
                        </div>
                      </div>
                      
                      <motion.button
                        className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="h-3 w-3" />
                        <span>Watch</span>
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* YouTube Channel CTA */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-pink-500/10 rounded-3xl blur-xl"></div>
            <motion.div 
              className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center space-y-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  <Youtube className="h-20 w-20 text-red-600 mx-auto" />
                </motion.div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Want More Inspiring Stories?
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Subscribe to our YouTube channel for more empowering conversations with women entrepreneurs 
                    who are changing the game, one story at a time.
                  </p>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button asChild variant="hero" size="xl" className="group shadow-lg">
                    <a href="https://youtube.com/@sheleadsindia" target="_blank" rel="noopener noreferrer">
                      <Youtube className="h-5 w-5 mr-2" />
                      Subscribe Now
                      <ExternalLink className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Podcast; 