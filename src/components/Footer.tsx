import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="section-container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">O</span>
            </div>
            <span className="font-display font-bold text-xl text-background">OmniMed</span>
          </div>
          <p className="text-sm leading-relaxed text-background/60">
            Proactive, technology-enabled care management for better health outcomes.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-background mb-4">Services</h4>
          <div className="space-y-2.5">
            <Link to="/services/pcm" className="block text-sm text-background/60 hover:text-background transition-colors">Principal Care Management</Link>
            <Link to="/services/ccm" className="block text-sm text-background/60 hover:text-background transition-colors">Chronic Care Management</Link>
            <Link to="/services/rpm" className="block text-sm text-background/60 hover:text-background transition-colors">Remote Patient Monitoring</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-background mb-4">Company</h4>
          <div className="space-y-2.5">
            <Link to="/about" className="block text-sm text-background/60 hover:text-background transition-colors">About Us</Link>
            <Link to="/contact" className="block text-sm text-background/60 hover:text-background transition-colors">Contact</Link>
            <Link to="/appointment" className="block text-sm text-background/60 hover:text-background transition-colors">Book Appointment</Link>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-background mb-4">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-background/60">
              <Phone size={14} /> <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-background/60">
              <Mail size={14} /> <span>info@omnimed.com</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-background/60">
              <MapPin size={14} className="mt-0.5" /> <span>123 Healthcare Ave, Suite 100<br />New York, NY 10001</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-background/40">© 2026 OmniMed. All rights reserved.</p>
        <div className="flex items-center gap-1 text-sm text-background/40">
          Made with <Heart size={14} className="text-destructive mx-1" /> for better healthcare
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
