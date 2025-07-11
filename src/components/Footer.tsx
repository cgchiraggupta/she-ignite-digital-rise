import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Instagram, Linkedin, Youtube } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      {/* Contact Form Section */}
      <section className="bg-black py-16 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Start Your Journey Together
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to transform your dreams into reality? Get in touch and let's create something beautiful together.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-4">
            {/* Logo */}
            <div className="mb-4">
              <img 
                src="/she-leads-logo.png" 
                alt="SHE Leads India" 
                className="h-16 w-auto object-contain brightness-0 invert opacity-80"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white text-sm">
                <Phone className="h-3 w-3" />
                <span>+918806661434</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3 w-3" />
                <a href="mailto:info@shelladsindia.in" className="hover:underline" style={{ color: '#E60023' }}>
                  info@shelladsindia.in
                </a>
              </div>
              <div className="text-sm">
                <div className="font-medium text-white text-sm">Femme Fusion Business Solutions</div>
                <div className="text-xs mt-1">
                  <a 
                    href="https://g.co/kgs/1PiYFqt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-300 hover:text-white"
                  >
                    Address : Gateway, Opp. Agent Jack, Balewadi, Pune
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white text-base mb-2">For More Information</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  Blog
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 transition-colors hover:text-[#E60023] text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white text-base mb-2">Our Offerings</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/blog" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  About
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 transition-colors hover:text-[#E60023] text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white text-base mb-2">Connect</h4>
            <div className="flex space-x-2 mb-3">
              <a 
                href="https://www.linkedin.com/company/sheleadsindia/?originalSubdomain=in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="ghost" size="sm" className="rounded-full border border-gray-600 hover:bg-blue-600 hover:border-blue-600 text-gray-300 hover:text-white h-8 w-8 p-0 transition-colors duration-300">
                  <Linkedin className="h-3 w-3" />
                </Button>
              </a>
              <a 
                href="https://www.instagram.com/sheleadsofficial2023/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="ghost" size="sm" className="rounded-full border border-gray-600 hover:bg-pink-600 hover:border-pink-600 text-gray-300 hover:text-white h-8 w-8 p-0 transition-colors duration-300">
                  <Instagram className="h-3 w-3" />
                </Button>
              </a>
              <a 
                href="https://www.youtube.com/@SHELeadsIndia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="ghost" size="sm" className="rounded-full border border-gray-600 hover:bg-red-600 hover:border-red-600 text-gray-300 hover:text-white h-8 w-8 p-0 transition-colors duration-300">
                  <Youtube className="h-3 w-3" />
                </Button>
              </a>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              The sacred mission of SHELeads is to nurture and celebrate the dreams of Indian women entrepreneurs, creating a sisterhood where tradition meets innovation and success honors our roots.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black border-t border-gray-700 py-2">
        <div className="container mx-auto px-4">
          <div className="text-center text-xs text-gray-300">
            © Copyright Sheleads 2024 All rights reserved. Professional Website Developed & Digital Marketing by{" "}
            <a href="mailto:work.ankit2@gmail.com" style={{ color: '#E60023' }} className="hover:underline">
              work.ankit2@gmail.com
            </a>
            {" & "}
            <a href="mailto:cg077593@gmail.com" style={{ color: '#E60023' }} className="hover:underline">
              cg077593@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;