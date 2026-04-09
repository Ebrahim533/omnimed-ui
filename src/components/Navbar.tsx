import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettings } from "@/hooks/useSanity";
import { getSanityImageUrl } from "@/lib/sanity";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services/pcm", children: [
    { label: "Principal Care (PCM)", href: "/services/pcm" },
    { label: "Chronic Care (CCM)", href: "/services/ccm" },
    { label: "Remote Monitoring (RPM)", href: "/services/rpm" },
  ]},
  { label: "Partner", href: "/partner" },
  { label: "Contact", href: "/contact" },
];

const Logo = ({ logo }: { logo?: any }) => {
  const logoUrl = logo ? getSanityImageUrl(logo, 200, 60) : null;
  
  if (logoUrl) {
    return (
      <img 
        src={logoUrl} 
        alt="OmniMed" 
        className="h-10 w-auto object-contain"
      />
    );
  }
  
  // Fallback SVG logo
  return (
    <svg viewBox="0 0 300 60" className="h-10 w-auto">
      {/* Medical Kit Icon */}
      <g transform="translate(0, 5)">
        <rect x="2" y="12" width="46" height="40" rx="6" fill="none" stroke="#14B8A6" strokeWidth="3"/>
        <path d="M16 12V8a4 4 0 014-4h12a4 4 0 014 4v4" stroke="#14B8A6" strokeWidth="3" fill="none"/>
        <rect x="19" y="25" width="12" height="16" rx="1" fill="#14B8A6"/>
        <rect x="15" y="29" width="20" height="8" rx="2" fill="#14B8A6"/>
      </g>
      <text x="58" y="40" fontFamily="Georgia, serif" fontSize="35" fontWeight="bold" fill="#0F172A">OmniMed</text>
      
      <text x="58" y="55" fontFamily="Arial, sans-serif" fontSize="8" letterSpacing="2.5" fill="#64748B">ENHANCE PATIENT OUTCOMES</text>
    </svg>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const { settings, loading } = useSiteSettings();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="section-container flex items-center justify-between h-16 lg:h-18">
        <Link to="/" className="flex items-center gap-2">
          <Logo logo={settings?.logo} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              <Link
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.href || (link.children && link.children.some(c => c.href === location.pathname))
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-card rounded-xl border border-border shadow-lg p-2 min-w-[220px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                          location.pathname === child.href
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/contact">Get in Touch</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/appointment">Book Appointment</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="section-container py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground"
                      >
                        {link.label}
                      </button>
                      {servicesOpen && link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block pl-8 pr-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-3 space-y-2">
                <Button asChild className="w-full" size="sm">
                  <Link to="/appointment" onClick={() => setMobileOpen(false)}>Book Appointment</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
