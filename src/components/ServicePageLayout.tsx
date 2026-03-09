import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import StickyContactBar from "@/components/StickyContactBar";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Users, RefreshCw, type LucideIcon } from "lucide-react";
import { fadeUp, cardStagger, viewportOnce, buttonHover, buttonTap, EASE_PROFESSIONAL } from "@/lib/animations";

/* ─── Types ─── */
interface ServicePageProps {
  label: string;
  headline: string;
  subheadline: string;
  heroStats: { value: string; label: string }[];
  supportItems: { title: string; description: string }[];
  includedItems: { title: string; content: string }[];
  ctaLabel: string;
}

/* ─── Why Partner Pillars (shared) ─── */
const pillars: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Sparkles, title: "Turnkey Implementation", desc: "Full program setup with plug-and-play RPM/CCM workflows — no disruption to your practice." },
  { icon: Shield, title: "HIPAA-Compliant Technology", desc: "End-to-end encrypted, audit-ready infrastructure that meets the highest compliance standards." },
  { icon: Users, title: "Dedicated Care Team", desc: "A specialized team of care coordinators and clinicians assigned to your patient population." },
  { icon: RefreshCw, title: "Zero Workflow Disruption", desc: "Seamlessly integrates with your existing EHR and clinical processes from day one." },
];

/* ─── Component ─── */
const ServicePageLayout = ({
  label,
  headline,
  subheadline,
  heroStats,
  supportItems,
  includedItems,
  ctaLabel,
}: ServicePageProps) => {
  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground py-24 lg:py-32">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Typography */}
            <motion.div initial="hidden" animate="visible">
              <motion.p custom={0} variants={fadeUp} className="text-secondary-foreground/80 font-display font-semibold text-sm tracking-wider uppercase mb-4">
                {label}
              </motion.p>
              <motion.h1
                custom={1}
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-6"
              >
                {headline}
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-primary-foreground/80 leading-relaxed max-w-xl mb-8">
                {subheadline}
              </motion.p>
              <motion.div custom={3} variants={fadeUp}>
                <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                  <Button asChild size="lg" variant="secondary" className="rounded-full px-8 font-semibold text-base">
                    <Link to="/appointment">Request Consultation <ArrowRight size={16} className="ml-2" /></Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right: Glassmorphism stat card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE_PROFESSIONAL, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="bg-primary-foreground/10 backdrop-blur-xl rounded-2xl border border-primary-foreground/20 p-8 shadow-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-sm font-medium text-primary-foreground/70">Patient Monitoring — Live</span>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {heroStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease: EASE_PROFESSIONAL }}
                      className="text-center"
                    >
                      <p className="text-3xl font-display font-bold">{stat.value}</p>
                      <p className="text-xs text-primary-foreground/60 mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Support Framework Grid ── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center max-w-2xl mx-auto mb-14">
            <motion.p custom={0} variants={fadeUp} className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">
              The Support Framework
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Our Support Includes
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportItems.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="card-elevated p-6 group cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <CheckCircle2 className="text-primary" size={20} />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Partner Section ── */}
      <section className="py-20 lg:py-28 surface-tint">
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center max-w-2xl mx-auto mb-14">
            <motion.p custom={0} variants={fadeUp} className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">
              Built for Scale
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Why Partner With OmniMed?
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
                whileHover={{ y: -4 }}
                className="card-elevated p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included Accordion ── */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <motion.p custom={0} variants={fadeUp} className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">
                What's Included
              </motion.p>
              <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                Everything You Need for Better Outcomes
              </motion.h2>
              <motion.p custom={2} variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8">
                Explore the comprehensive features built into our care management platform — from specialist-led plans to 24/7 care team access.
              </motion.p>
              <motion.div custom={3} variants={fadeUp}>
                <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                  <Button asChild size="lg" className="rounded-full px-8">
                    <Link to="/appointment">{ctaLabel} <ArrowRight size={16} className="ml-2" /></Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASE_PROFESSIONAL }}
            >
              <Accordion type="single" collapsible className="w-full">
                {includedItems.map((item, i) => (
                  <AccordionItem key={item.title} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary hover:no-underline py-5 text-base">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sticky Contact Bar ── */}
      <StickyContactBar />
    </Layout>
  );
};

export default ServicePageLayout;
