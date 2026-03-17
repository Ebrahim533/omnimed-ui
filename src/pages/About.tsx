import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Zap, Heart, Cpu, Shield, Activity, Smartphone, ArrowRight, Linkedin } from "lucide-react";
import { fadeUp, cardStagger, scaleIn, slideInLeft, slideInRight, viewportOnce, buttonHover, buttonTap, EASE_PROFESSIONAL } from "@/lib/animations";
import { useTeam, useFeaturedPerson, useSiteSettings } from "@/hooks/useSanity";
import { urlFor, getSanityImageUrl } from "@/lib/sanity";

// Fallback values when Sanity is not available
const values = [
  {
    icon: Zap,
    title: "Efficiency",
    desc: "Streamlined workflows and automated processes that reduce administrative burden and let providers focus on what matters most — patients.",
  },
  {
    icon: Heart,
    title: "Empathy",
    desc: "Technology should enhance the human connection, not replace it. Every tool we build is designed to deepen the patient-provider relationship.",
  },
  {
    icon: Cpu,
    title: "Technology",
    desc: "Cutting-edge AI, real-time data pipelines, and predictive analytics power our platform — transforming raw data into actionable clinical insights.",
  },
];

const techNodes = [
  { icon: Shield, label: "PCM", desc: "Principal Care", x: 0 },
  { icon: Activity, label: "CCM", desc: "Chronic Care", x: 1 },
  { icon: Smartphone, label: "RPM", desc: "Remote Monitoring", x: 2 },
];

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
  const { person: featuredPerson, loading: featuredLoading } = useFeaturedPerson();
  const { settings, loading: settingsLoading } = useSiteSettings();

  return (
    <Layout>
      {/* 1. Hero — "The Vision" */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.p custom={0} variants={fadeUp} className="text-primary font-display font-semibold text-sm tracking-wider uppercase">
                About OmniMed
              </motion.p>
              <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                Redefining the{" "}
                <span className="gradient-text">Standard of Care</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                OmniMed was founded on a simple belief: healthcare should be proactive, not reactive. We integrate advanced monitoring, data analytics, and compassionate coordination to deliver better outcomes for every patient.
              </motion.p>
              <motion.div custom={3} variants={fadeUp}>
                <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                  <Button asChild size="lg" className="rounded-full px-8">
                    <Link to="/contact">Get in Touch <ArrowRight size={16} className="ml-1" /></Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE_PROFESSIONAL, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden aspect-square lg:aspect-[4/3] bg-muted flex items-center justify-center">
                {settings?.aboutImage ? (
                  <img
                    src={urlFor(settings.aboutImage).width(800).height(600).auto("format").url()}
                    alt="Medical technology visualization"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground text-center p-6">
                    <p className="text-sm">About section image</p>
                    <p className="text-xs mt-1">Add image in Sanity Studio</p>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-primary/10 -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-secondary/10 -z-10" />
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
            <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Our Mission</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Built on Three Pillars
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every decision we make is guided by a commitment to efficiency, empathy, and technological excellence.
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

      {/* 3. Leadership & Team */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              The People Behind the Platform
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our team combines decades of healthcare, technology, and operational expertise.
            </p>
          </motion.div>

          {/* Featured Person Card */}
          {!featuredLoading && featuredPerson && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={scaleIn}
              className="card-elevated rounded-2xl overflow-hidden mb-12"
            >
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2">
                  {featuredPerson.image ? (
                    <img
                      src={urlFor(featuredPerson.image).width(500).height(500).auto("format").url()}
                      alt={featuredPerson.name}
                      className="w-full h-full object-cover aspect-square md:aspect-auto"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">No image</div>
                  )}
                </div>
                <div className="md:col-span-3 p-8 lg:p-12 flex flex-col justify-center space-y-5">
                  <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase">President & CEO</p>
                  <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground">{featuredPerson.name}</h3>
                  {featuredPerson.bio && (
                    <blockquote className="text-muted-foreground leading-relaxed border-l-4 border-secondary pl-5 italic">
                      "{featuredPerson.bio}"
                    </blockquote>
                  )}
                  <div className="flex items-center gap-4 pt-2">
                    {settings?.ceoSignature && <SignatureDraw signatureImage={settings.ceoSignature} />}
                    {featuredPerson.social?.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                        aria-label={link.platform}
                      >
                        <Linkedin size={16} className="text-primary" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamLoading ? (
              <div className="col-span-full text-center py-8">Loading team members...</div>
            ) : team && team.length > 0 ? (
              team.filter(member => !member.featured).map((member, i) => (
                <motion.div
                  key={member._id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={cardStagger}
                  className="group relative rounded-2xl overflow-hidden card-elevated"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    {member.image ? (
                      <img
                        src={urlFor(member.image).width(400).height(500).auto("format").url()}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                      <p className="text-background text-sm leading-relaxed mb-3">{member.bio}</p>
                      {member.social && member.social.length > 0 && (
                        <a
                          href={member.social[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-background/20 flex items-center justify-center hover:bg-background/30 transition-colors"
                          aria-label={`${member.name}'s ${member.social[0].platform}`}
                        >
                          <Linkedin size={14} className="text-background" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display font-bold text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">Team Member</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">No team members available</div>
            )}
          </div>
        </div>
      </section>

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
