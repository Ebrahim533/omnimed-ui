import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Activity, Smartphone, Users, TrendingUp, Clock, Linkedin } from "lucide-react";
import Layout from "@/components/Layout";
import { fadeUp, sectionReveal, cardStagger, scaleIn, slideInLeft, slideInRight, viewportOnce, buttonHover, buttonTap } from "@/lib/animations";
import heroBg from "@/assets/hero-bg.jpg";
import ceoPortrait from "@/assets/ceo-portrait.jpg";
import ceoSignature from "@/assets/ceo-signature.png";

const services = [
  {
    icon: Shield,
    title: "Principal Care Management",
    desc: "Specialist-led care coordination for patients with complex conditions requiring focused attention.",
    href: "/services/pcm",
  },
  {
    icon: Activity,
    title: "Chronic Care Management",
    desc: "Comprehensive, ongoing management for patients with two or more chronic conditions.",
    href: "/services/ccm",
  },
  {
    icon: Smartphone,
    title: "Remote Patient Monitoring",
    desc: "Real-time health data from wearable devices, enabling proactive clinical decisions.",
    href: "/services/rpm",
  },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Patients Managed" },
  { icon: TrendingUp, value: "40%", label: "Reduction in ER Visits" },
  { icon: Clock, value: "24/7", label: "Monitoring & Support" },
  { icon: Shield, value: "98%", label: "Patient Satisfaction" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>
      <div className="relative section-container py-24 sm:py-32 lg:py-40">
        <motion.div className="max-w-2xl" initial="hidden" animate="visible">
          <motion.p custom={0} variants={fadeUp} className="text-secondary font-display font-semibold text-sm tracking-wider uppercase mb-4">
            Technology-Enabled Care
          </motion.p>
          <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight text-background mb-6">
            Proactive Care <span className="text-secondary">Management</span> for Better Outcomes
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} className="text-lg text-background/70 leading-relaxed mb-8 max-w-xl">
            OmniMed combines advanced technology with compassionate care to deliver proactive health management that keeps patients healthier, longer.
          </motion.p>
          <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-4">
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/appointment">Book a Consultation <ArrowRight size={16} className="ml-1" /></Link>
              </Button>
            </motion.div>
            <motion.div whileHover={buttonHover} whileTap={buttonTap}>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-background/30 text-background hover:bg-background/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="surface-tint py-16">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={cardStagger}
              className="text-center"
            >
              <stat.icon className="mx-auto mb-3 text-primary" size={28} />
              <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal} className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Comprehensive Care Solutions</h2>
          <p className="text-muted-foreground leading-relaxed">
            From specialist-led care to real-time remote monitoring, our integrated services cover every aspect of modern patient care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={cardStagger}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <Link to={service.href} className="block card-elevated p-8 h-full group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <service.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 gap-1 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Founder Vision Banner */}
    <section className="py-20 lg:py-28 surface-tint">
      <div className="section-container">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={slideInLeft} className="lg:col-span-2">
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0"
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={scaleIn}
            >
              <img src={ceoPortrait} alt="Dr. James Mitchell, CEO & Founder of OmniMed" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={slideInRight} className="lg:col-span-3 space-y-6">
            <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase">A Message from Our Founder</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight">
              Leading the Future of <span className="gradient-text">Proactive Care</span>
            </h2>
            <blockquote className="text-lg sm:text-xl text-muted-foreground leading-relaxed border-l-4 border-secondary pl-6 italic">
              "We aren't just managing health — we're predicting a better quality of life. Every patient deserves care that anticipates their needs, not one that merely reacts to crises."
            </blockquote>
            <p className="text-muted-foreground leading-relaxed">
              At OmniMed, we've built a platform where technology and compassion converge. Our mission is to shift healthcare from reactive to proactive — empowering providers with real-time insights and patients with peace of mind.
            </p>

            <div className="pt-4 space-y-3">
              <motion.img
                src={ceoSignature}
                alt="Dr. James Mitchell's signature"
                className="h-12 w-auto opacity-80"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 0.8, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 120, damping: 20 }}
                loading="lazy"
              />
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-display font-bold text-foreground">Dr. James Mitchell</p>
                  <p className="text-sm text-muted-foreground">CEO & Founder, OmniMed</p>
                </div>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors" aria-label="Dr. James Mitchell's LinkedIn profile">
                  <Linkedin size={15} className="text-primary" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20">
      <div className="section-container">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={scaleIn} className="rounded-2xl p-10 sm:p-14 text-center" style={{ background: "var(--hero-gradient)" }}>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-background mb-4">Ready to Transform Patient Care?</h2>
          <p className="text-background/80 max-w-xl mx-auto mb-8">
            Join thousands of healthcare providers who trust OmniMed for proactive, technology-driven care management.
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

export default Index;
