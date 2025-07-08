import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
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
                <a 
                  href="https://g.co/kgs/1PiYFqt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors hover:text-[#E60023]"
                >
                  Contact
                </a>
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
                <Link to="/contact" className="text-gray-300 transition-colors hover:text-[#E60023]">
                  Contact
                </Link>
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
              <Button variant="ghost" size="sm" className="rounded-full border border-gray-600 hover:bg-gray-800 text-gray-300 hover:text-white h-8 w-8 p-0">
                <Facebook className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full border border-gray-600 hover:bg-gray-800 text-gray-300 hover:text-white h-8 w-8 p-0">
                <Youtube className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full border border-gray-600 hover:bg-gray-800 text-gray-300 hover:text-white h-8 w-8 p-0">
                <Instagram className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full border border-gray-600 hover:bg-gray-800 text-gray-300 hover:text-white h-8 w-8 p-0">
                <Linkedin className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              The passion behind SHELeads is immense...to work together as a team to empower and uplift women entrepreneurs.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black border-t border-gray-700 py-2">
        <div className="container mx-auto px-4">
          <div className="text-center text-xs text-gray-300">
            © Copyright Sheleads 2024 All rights reserved. Professional Website Developed & Digital Marketing by{" "}
            <span style={{ color: '#E60023' }}>Dexcel Digital Hub Pvt Ltd.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;