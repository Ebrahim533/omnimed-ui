import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Zap, Heart, Cpu, Shield, Activity, Smartphone, ArrowRight, Linkedin, Sparkles, ChevronRight } from "lucide-react";
import { fadeUp, cardStagger, scaleIn, slideInLeft, slideInRight, viewportOnce, buttonHover, buttonTap, EASE_PROFESSIONAL } from "@/lib/animations";
import { useTeam, useSiteSettings, useAboutPage } from "@/hooks/useSanity";
import { urlFor, getSanityImageUrl } from "@/lib/sanity";

import { EnhancedLeadershipSection } from "@/components/EnhancedLeadershipSection";

// ─── SVG Draw Line Component ───

const ConnectLine = ({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.line
      ref={ref}
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      strokeDasharray="200"
      strokeDashoffset={isInView ? 0 : 200}
      style={{ transition: `stroke-dashoffset 0.8s ${delay}s ease` }}
      opacity={0.3}
    />
  );
};

// ─── Signature Draw Animation ───

const SignatureDraw = ({ signatureImage }: { signatureImage?: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (!signatureImage) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
    >
      <img
        src={urlFor(signatureImage).width(80).auto("format").url()}
        alt="CEO Signature"
        className="h-12 w-auto"
        loading="lazy"
      />
    </motion.div>
  );
};

// ─── Page ───

const About = () => {
  const { team, loading: teamLoading } = useTeam();
  const { about, loading: aboutLoading, error: aboutError } = useAboutPage();
  const { settings, loading: settingsLoading } = useSiteSettings();

  // Debug logging
  console.log("About data:", about);
  console.log("About landing:", about?.landing);
  console.log("About aboutSection:", about?.landing?.aboutSection);
  console.log("About error:", aboutError);

  const featuredPerson = about?.featuredPerson || null;

  // Values (value cards) — prefer landing.statsSection, fallback to hard-coded
  const values = about?.landing?.statsSection?.map((s: any, i: number) => ({
    icon: [Zap, Heart, Cpu][i] || Zap,
    title: s.label || `Value ${i + 1}`,
    desc: s.value || "",
  })) ?? [
    { icon: Zap, title: "Efficiency", desc: "Streamlined workflows and automated processes that reduce administrative burden and let providers focus on what matters most — patients." },
    { icon: Heart, title: "Empathy", desc: "Technology should enhance the human connection, not replace it. Every tool we build is designed to deepen the patient-provider relationship." },
    { icon: Cpu, title: "Technology", desc: "Cutting-edge AI, real-time data pipelines, and predictive analytics power our platform — transforming raw data into actionable clinical insights." },
  ];

  // Tech nodes — prefer featuredServices from the landing page, fallback to static
  const featuredServices = about?.landing?.featuredServices;
  const techNodes = featuredServices && featuredServices.length > 0 ? featuredServices.map((svc: any, i: number) => ({
    icon: [Shield, Activity, Smartphone][i] || Shield,
    label: svc.title,
    desc: svc.description,
    x: i,
  })) : [ { icon: Shield, label: "PCM", desc: "Principal Care", x: 0 }, { icon: Activity, label: "CCM", desc: "Chronic Care", x: 1 }, { icon: Smartphone, label: "RPM", desc: "Remote Monitoring", x: 2 } ];

  return (
    <Layout>
      {/* 1. Hero — "The Vision" - Enhanced with Modern Animations */}
      <section className="py-20 lg:py-28 overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/3 to-secondary/3 rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content - Enhanced Text Animations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              {/* Animated Label Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_PROFESSIONAL } }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary font-display font-semibold text-sm tracking-wider uppercase">
                  {about?.landing?.aboutSection?.label || "About OmniMed"}
                </span>
              </motion.div>

              {/* Animated Headline with Character Reveal Effect */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03, delayChildren: 0.2 }
                  }
                }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight"
              >
                {about?.landing?.aboutSection?.headline ? (
                  about?.landing?.aboutSection?.highlightedText ? (
                    <>
                      {about.landing.aboutSection.headline.split(about.landing.aboutSection.highlightedText).map((part, i) => (
                        <span key={i}>
                          <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                          >
                            {part}
                          </motion.span>
                          {i === 0 && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                              className="gradient-text inline-block"
                            >
                              {about.landing.aboutSection.highlightedText}
                            </motion.span>
                          )}
                        </span>
                      ))}
                    </>
                  ) : (
                    about.landing.aboutSection.headline
                  )
                ) : (
                  <>
                    Redefining the <span className="gradient-text">Standard of Care</span>
                  </>
                )}
              </motion.h1>

              {/* Animated Description with Fade Up */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, ease: EASE_PROFESSIONAL }}
                className="text-lg text-muted-foreground leading-relaxed max-w-lg"
              >
                {about?.landing?.aboutSection?.description || settings?.companyDescription || "OmniMed was founded on a simple belief: healthcare should be proactive, not reactive. We integrate advanced monitoring, data analytics, and compassionate coordination to deliver better outcomes for every patient."}
              </motion.p>

              {/* Animated CTA Button with Glow Effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow duration-300 group"
                  >
                    <Link to={about?.landing?.aboutSection?.ctaButtonLink || "/contact"}>
                      {about?.landing?.aboutSection?.ctaButtonText || "Get in Touch"}
                      <motion.span
                        className="inline-block ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        <ChevronRight size={18} />
                      </motion.span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Content - Enhanced Image with Floating Animations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE_PROFESSIONAL, delay: 0.2 }}
              className="relative"
            >
              {/* Main Image Container with Hover Effects */}
              <motion.div
                className="rounded-3xl overflow-hidden aspect-square lg:aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 shadow-2xl shadow-primary/10"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.4 }}
              >
                {about?.landing?.aboutSection?.image?.asset?.url ? (
                  <motion.img
                    src={about.landing.aboutSection.image.asset.url}
                    alt={about?.landing?.aboutSection?.headline || "About OmniMed"}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE_PROFESSIONAL }}
                  />
                ) : about?.landing?.aboutSection?.image ? (
                  <img
                    src={urlFor(about.landing.aboutSection.image).width(800).height(600).auto("format").url()}
                    alt={about?.landing?.aboutSection?.headline || "About OmniMed"}
                    className="w-full h-full object-cover"
                  />
                ) : settings?.aboutImage ? (
                  <img
                    src={urlFor(settings.aboutImage).width(800).height(600).auto("format").url()}
                    alt="Medical technology visualization"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground text-center p-6 flex flex-col items-center justify-center h-full">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="w-12 h-12 text-primary/30 mb-4" />
                    </motion.div>
                    <p className="text-sm">About section image</p>
                    <p className="text-xs mt-1 text-muted-foreground/60">Add image in Sanity Studio</p>
                  </div>
                )}

                {/* Overlay Gradient on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>

              {/* Floating Decorative Elements */}
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 -z-10 backdrop-blur-sm border border-primary/10"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 -z-10 backdrop-blur-sm border border-secondary/10"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/2 -right-12 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-400/10 -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              {/* Stats Badge - Floating */}
              <motion.div
                className="absolute -bottom-4 left-8 bg-white rounded-2xl shadow-xl shadow-primary/10 p-4 border border-primary/5"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">15+</p>
                    <p className="text-xs text-muted-foreground">Years of Care</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Mission — Value Cards */}
      <section className="py-20 lg:py-28 surface-tint">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">{about?.landing?.title || "Our Mission"}</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {about?.landing?.title || "Built on Three Pillars"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {about?.settings?.companyDescription || "Every decision we make is guided by a commitment to efficiency, empathy, and technological excellence."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
                whileHover={{ y: -10, transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 20 } }}
                className="bg-card rounded-2xl border border-border p-8 lg:p-10"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <v.icon className="text-primary" size={26} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Leadership & Team - Enhanced */}
      <EnhancedLeadershipSection 
        featuredPerson={featuredPerson}
        team={team || []}
        settings={settings}
        loading={aboutLoading || teamLoading}
      />

      {/* 4. Technology Integration — "The OmniMed Difference" */}
      <section className="py-20 lg:py-28 surface-tint">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Our Technology</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              The OmniMed Difference
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our integrated platform connects all three care management services into a unified, intelligent ecosystem.
            </p>
          </motion.div>

          {/* Tech Flowchart */}
          <div className="relative max-w-3xl mx-auto">
            {/* Center Hub */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={scaleIn}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-16 relative z-10"
              style={{ boxShadow: "var(--glow-primary)" }}
            >
              <span className="text-primary-foreground font-display font-bold text-lg">OM</span>
            </motion.div>

            {/* SVG Connecting Lines */}
            <svg className="absolute top-10 left-0 w-full h-32 pointer-events-none" viewBox="0 0 600 100" preserveAspectRatio="xMidYMid meet">
              <ConnectLine x1={300} y1={10} x2={100} y2={90} delay={0.3} />
              <ConnectLine x1={300} y1={10} x2={300} y2={90} delay={0.5} />
              <ConnectLine x1={300} y1={10} x2={500} y2={90} delay={0.7} />
            </svg>

            {/* Service Nodes */}
            <div className="grid grid-cols-3 gap-6 lg:gap-10">
              {techNodes.map((node, i) => (
                <motion.div
                  key={node.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={cardStagger}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="text-center"
                >
                  <Link to={`/services/${node.label.toLowerCase()}`} className="block">
                    <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-4" style={{ boxShadow: "var(--card-shadow)" }}>
                      <node.icon className="text-primary" size={28} />
                    </div>
                    <h4 className="font-display font-bold text-foreground mb-1">{node.label}</h4>
                    <p className="text-sm text-muted-foreground">{node.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={scaleIn}
            className="rounded-2xl p-10 sm:p-14 text-center"
            style={{ background: "var(--hero-gradient)" }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-background mb-4">
              Ready to Join the Future of Care?
            </h2>
            <p className="text-background/80 max-w-xl mx-auto mb-8">
              Partner with OmniMed and see how proactive care management can transform your practice and patient outcomes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Button asChild size="lg" variant="secondary" className="rounded-full px-8 bg-background text-foreground hover:bg-background/90">
                  <Link to="/appointment">Schedule a Demo</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-background/30 text-background hover:bg-background/10">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
