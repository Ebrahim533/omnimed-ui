import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import StickyContactBar from "@/components/StickyContactBar";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, Phone, Mail, Stethoscope, Activity, Smartphone, Calendar, FileText, PhoneCall, Folder, type LucideIcon } from "lucide-react";
import { fadeUp, viewportOnce, buttonHover, buttonTap, EASE_PROFESSIONAL } from "@/lib/animations";

/* ─── Types ─── */
interface ServicePageProps {
  label: string;
  headline: string;
  subheadline: string;
  heroImage?: string;
  heroStats: { value: string; label: string }[];
  featureHighlights: string[];
  howItWorksSteps: string[];
  howItWorksImage?: string;
  supportItems: { title: string; description: string }[];
  includedItems: { title: string; content: string }[];
  ctaLabel: string;
}

/* ─── Sidebar service links ─── */
const serviceLinks: { icon: LucideIcon; title: string; href: string }[] = [
  { icon: Stethoscope, title: "Principal Care Management", href: "/services/pcm" },
  { icon: Activity, title: "Chronic Care Management", href: "/services/ccm" },
  { icon: Smartphone, title: "Remote Patient Monitoring", href: "/services/rpm" },
];

/* ─── Component ─── */
const ServicePageLayout = ({
  label,
  headline,
  subheadline,
  heroImage,
  heroStats,
  featureHighlights,
  howItWorksSteps,
  howItWorksImage,
  supportItems,
  includedItems,
  ctaLabel,
}: ServicePageProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* ── Breadcrumb Hero Banner ── */}
      <section className="relative overflow-hidden text-primary-foreground py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="section-container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_PROFESSIONAL }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3"
          >
            {label}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center justify-center gap-2 text-sm text-primary-foreground/70"
          >
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <span>›</span>
            <Link to="/" className="hover:text-primary-foreground transition-colors">Our Services</Link>
            <span>›</span>
            <span className="text-primary-foreground">{label}</span>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content with Sidebar ── */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">

            {/* ── Left Sidebar ── */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE_PROFESSIONAL }}
              className="space-y-8 lg:sticky lg:top-28 lg:self-start"
            >
              {/* Services Nav */}
              <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                <h3 className="font-display font-bold text-foreground text-base mb-4">Our Services</h3>
                <nav className="space-y-1">
                  {serviceLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <link.icon size={16} strokeWidth={1.5} />
                          <span>{link.title}</span>
                        </div>
                        <ArrowRight size={14} className={`transition-transform ${isActive ? "" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"}`} />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Contact Card */}
              <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                <h3 className="font-display font-bold text-foreground text-base mb-4">Get in Touch</h3>
                <div className="space-y-3 text-sm">
                  <a href="tel:9177447308" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone size={14} className="text-primary" />
                    </div>
                    (917) 744-7308
                  </a>
                  <a href="mailto:Info@Omnimedhealth.org" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail size={14} className="text-primary" />
                    </div>
                    Info@Omnimedhealth.org
                  </a>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-primary rounded-xl p-5 text-primary-foreground">
                <h3 className="font-display font-bold text-base mb-4">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-xl font-display font-bold">{stat.value}</p>
                      <p className="text-xs text-primary-foreground/70 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>

            {/* ── Right Content ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_PROFESSIONAL }}
              className="space-y-12"
            >
              {/* Hero Image */}
              {heroImage && (
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
                  <img
                    src={heroImage}
                    alt={headline}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                </div>
              )}

              {/* Title & Description */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                  {headline}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg max-w-3xl">
                  {subheadline}
                </p>
              </div>

              {/* Feature Highlights Tags */}
              {featureHighlights.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {featureHighlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <hr className="border-border" />

              {/* How It Works - Enhanced with Image */}
              {howItWorksSteps.length > 0 && (
                <div className="relative">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, ease: EASE_PROFESSIONAL }}
                    className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-8"
                  >
                    How Our {label} Works
                  </motion.h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Image Column */}
                    {howItWorksImage && (
                      <motion.div
                        initial={{ opacity: 0, x: -30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.7, ease: EASE_PROFESSIONAL }}
                        className="relative order-2 lg:order-1"
                      >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                          <motion.img
                            src={howItWorksImage}
                            alt={`${label} Process`}
                            className="w-full h-64 lg:h-80 object-cover"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.4 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                        </div>
                        
                        {/* Floating decorative elements */}
                        <motion.div
                          animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"
                        />
                        <motion.div
                          animate={{ y: [6, -6, 6], rotate: [3, -3, 3] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"
                        />
                      </motion.div>
                    )}
                    
                    {/* Steps Column */}
                    <div className={`space-y-4 ${howItWorksImage ? 'order-1 lg:order-2' : ''}`}>
                      {howItWorksSteps.map((step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={viewportOnce}
                          transition={{ delay: i * 0.15, duration: 0.5, ease: EASE_PROFESSIONAL }}
                          whileHover={{ x: 8, transition: { duration: 0.2 } }}
                          className="group flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-card to-card/80 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                        >
                          {/* Animated Step Number */}
                          <div className="relative">
                            <motion.div
                              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/25"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              {i + 1}
                            </motion.div>
                            
                            {/* Connection line between steps (except for last) */}
                            {i < howItWorksSteps.length - 1 && (
                              <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={viewportOnce}
                                transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
                                className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary to-transparent origin-top"
                              />
                            )}
                          </div>
                          
                          {/* Step Content */}
                          <div className="flex-1 pt-1">
                            <p className="text-foreground font-medium leading-relaxed group-hover:text-primary transition-colors">
                              {step}
                            </p>
                          </div>
                          
                          {/* Hover indicator */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ArrowRight className="text-primary" size={20} />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Divider */}
              <hr className="border-border" />

              {/* Consultation Cards Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                }}
                className="grid sm:grid-cols-3 gap-6"
              >
                {/* Schedule Consultation Card */}
                <motion.div
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-8 border-2 border-primary shadow-lg shadow-primary/10 text-center"
                >
                  <h4 className="text-xl font-display font-bold text-foreground mb-3">Schedule Consultation</h4>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Book a free consultation to learn how our care management programs can help your practice</p>
                  <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full px-8 bg-primary text-white hover:bg-primary/90 shadow-lg"
                    >
                      <Link to="/contact">
                        Book Appointment
                        <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-4">Free 30-minute consultation</p>
                </motion.div>

                {/* Speak With Us Card */}
                <motion.div
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-8 border border-border shadow-sm text-center"
                >
                  <h4 className="text-xl font-display font-bold text-foreground mb-3">Speak With Us</h4>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Have questions? Call us to discuss PCM, CCM, RPM and how we can support your patients</p>
                  <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 border-primary text-primary hover:bg-primary/10"
                    >
                      <a href="tel:9177447308">
                        <Phone size={18} className="mr-2" />
                        Get Call
                      </a>
                    </Button>
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-4">(917) 744-7308</p>
                </motion.div>

                {/* View Services Card */}
                <motion.div
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-8 border border-border shadow-sm text-center"
                >
                  <h4 className="text-xl font-display font-bold text-foreground mb-3">Explore Our Services</h4>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">Learn about Principal Care, Chronic Care Management, and Remote Patient Monitoring</p>
                  <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 border-foreground text-foreground hover:bg-foreground hover:text-background"
                    >
                      <Link to="/services">
                        Our Service
                        <ArrowRight size={18} className="ml-2" />
                      </Link>
                    </Button>
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-4">PCM • CCM • RPM</p>
                </motion.div>
              </motion.div>

              {/* Divider */}
              <hr className="border-border" />

              {/* Support Framework */}
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-6">
                  Our Support Includes
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {supportItems.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: i * 0.08, duration: 0.4, ease: EASE_PROFESSIONAL }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="p-5 rounded-xl bg-card border border-border shadow-sm group cursor-default"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <CheckCircle2 className="text-primary" size={18} />
                      </div>
                      <h4 className="font-display font-semibold text-foreground text-sm mb-1.5">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-border" />

              {/* What's Included Accordion */}
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
                  Everything You Need for Better Outcomes
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Explore the comprehensive features built into our care management platform.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  {includedItems.map((item, i) => (
                    <AccordionItem key={item.title} value={`item-${i}`} className="border-border">
                      <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-4 text-sm sm:text-base">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: EASE_PROFESSIONAL }}
                className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-primary-foreground text-center"
              >
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-primary-foreground/80 text-sm mb-6 max-w-lg mx-auto">
                  Partner with OmniMed to deliver exceptional care outcomes for your patients.
                </p>
                <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                  <Button asChild size="lg" variant="secondary" className="rounded-full px-8 font-semibold">
                    <Link to="/appointment">{ctaLabel} <ArrowRight size={16} className="ml-2" /></Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <StickyContactBar />
    </>
  );
};

export default ServicePageLayout;
