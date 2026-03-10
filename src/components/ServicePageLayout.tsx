import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import StickyContactBar from "@/components/StickyContactBar";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, Phone, Mail, Stethoscope, Activity, Smartphone, type LucideIcon } from "lucide-react";
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
  supportItems,
  includedItems,
  ctaLabel,
}: ServicePageProps) => {
  const { pathname } = useLocation();

  return (
    <Layout>
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

              {/* How It Works */}
              {howItWorksSteps.length > 0 && (
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-6">
                    How Our {label} Works
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {howItWorksSteps.map((step, i) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        transition={{ delay: i * 0.1, duration: 0.4, ease: EASE_PROFESSIONAL }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <span className="text-sm text-foreground font-medium leading-relaxed pt-1">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

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
    </Layout>
  );
};

export default ServicePageLayout;
