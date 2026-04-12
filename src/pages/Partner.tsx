import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plug, ShieldCheck, HeartHandshake, Building2, Cpu, ArrowRight, CheckCircle2, Send,
  Settings, Users, Stethoscope, FileCheck, BarChart3, Quote, TrendingUp, DollarSign, Activity
} from "lucide-react";
import { fadeUp, sectionReveal, cardStagger, viewportOnce, buttonHover, buttonTap, EASE_PROFESSIONAL } from "@/lib/animations";
import { usePartnerPage } from "@/hooks/useSanity";
import partnerHero from "@/assets/partner-hero.jpg";
import ceoPortrait from "@/assets/ceo-portrait.jpg";

/* ─── Partner form schema ─── */
const partnerSchema = z.object({
  orgName: z.string().trim().min(1, "Organization name is required").max(200),
  contactPerson: z.string().trim().min(1, "Contact person is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  npi: z.string().trim().optional(),
  patientVolume: z.string().min(1, "Please select patient volume"),
  interest: z.string().min(1, "Please select partnership interest"),
});
type PartnerFormValues = z.infer<typeof partnerSchema>;

const REQUIRED_FIELDS: (keyof PartnerFormValues)[] = ["orgName", "contactPerson", "email", "patientVolume", "interest"];

/* ─── Data ─── */
const valuePillars = [
  {
    icon: Activity,
    title: "Clinical Impact",
    badge: "Patient Outcomes",
    desc: "Improve chronic disease management, increase quality scores, and reduce hospitalizations and ER visits through proactive, technology-enabled care."
  },
  {
    icon: DollarSign,
    title: "Financial Growth",
    badge: "Revenue",
    desc: "Generate additional, compliant reimbursement revenue with automated billing codes (99490, 99457, 99491) and optimized care coordination workflows."
  },
  {
    icon: TrendingUp,
    title: "Scalable Infrastructure",
    badge: "Plug & Play",
    desc: "Seamlessly integrate our RPM, CCM, and PCM workflows into your existing practice — zero disruption, immediate value, HIPAA-compliant from day one."
  },
];

const managedServices = [
  {
    icon: Settings,
    title: "Full Program Setup",
    desc: "End-to-end workflow design tailored to your practice's existing systems, EHR integrations, and patient population."
  },
  {
    icon: Users,
    title: "Patient Onboarding",
    desc: "Complete enrollment and tech-enablement — from eligibility verification to device deployment and patient education."
  },
  {
    icon: Stethoscope,
    title: "Clinical Monitoring",
    desc: "Professional care coordination with licensed clinicians managing patient alerts, care plans, and monthly touchpoints."
  },
  {
    icon: FileCheck,
    title: "Compliance & Billing",
    desc: "Full documentation and billing support ensuring accurate coding, audit readiness, and maximized reimbursement."
  },
  {
    icon: BarChart3,
    title: "Insights & Reporting",
    desc: "Monthly performance analytics with actionable dashboards covering enrollment rates, clinical outcomes, and revenue impact."
  },
];

const partnerPaths = [
  { icon: Building2, title: "Clinic Partners", sub: "Healthcare Providers & Practices", features: ["White-label patient portal", "Dedicated onboarding specialist", "Revenue-share model", "Priority support SLA"] },
  { icon: Cpu, title: "Technology Partners", sub: "EHR Vendors & Health-Tech Companies", features: ["Open API & FHIR integration", "Co-marketing opportunities", "Joint product development", "Technical sandbox access"] },
];

const ehrLogos = [
  "Epic Systems", "Cerner", "Athenahealth", "eClinicalWorks", "Allscripts",
  "NextGen", "DrChrono", "Greenway", "Meditech", "Practice Fusion",
];

/* ─── Floating dashboard component ─── */
const FloatingDashboard = ({ heroImage }: { heroImage?: any }) => {
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 40, damping: 20 });
  const rotate = useTransform(smoothY, [-20, 20], [-2, 2]);

  useEffect(() => {
    let direction = 1;
    let current = 0;
    const interval = setInterval(() => {
      current += direction * 0.4;
      if (current > 15 || current < -15) direction *= -1;
      y.set(current);
    }, 50);
    return () => clearInterval(interval);
  }, [y]);

  // Use Sanity image if available, fallback to local asset
  const imageUrl = heroImage?.asset?.url || partnerHero;
  const imageAlt = heroImage?.alt || "OmniMed SaaS medical dashboard";

  return (
    <motion.div style={{ y: smoothY, rotateZ: rotate }} className="relative">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/30">
        <img src={imageUrl} alt={imageAlt} className="w-full h-auto" loading="eager" />
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-secondary/20 backdrop-blur-sm border border-secondary/30" />
      <div className="absolute -top-3 -left-3 w-16 h-16 rounded-lg bg-primary/20 backdrop-blur-sm border border-primary/30" />
    </motion.div>
  );
};

/* ─── Logo Cloud with infinite scroll ─── */
const LogoCloud = () => {
  const doubled = [...ehrLogos, ...ehrLogos];
  return (
    <section className="py-16 lg:py-20 overflow-hidden">
      <div className="section-container mb-10">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal} className="text-center">
          <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Trusted Ecosystem</p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Compatible EHRs & Current Partners</h2>
        </motion.div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex gap-12 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map((name, i) => (
            <div key={i} className="flex-shrink-0 px-6 py-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm">
              <span className="text-muted-foreground font-display font-semibold text-sm whitespace-nowrap opacity-60">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Main Page ─── */
const Partner = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { partner, loading: partnerLoading, error: partnerError } = usePartnerPage();

  // Debug logging
  console.log("Partner data:", partner);
  console.log("Partner loading:", partnerLoading);
  console.log("Partner error:", partnerError);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { orgName: "", contactPerson: "", email: "", npi: "", patientVolume: "", interest: "" },
    mode: "onChange",
  });

  const watched = form.watch();
  const progress = useMemo(() => {
    const filled = REQUIRED_FIELDS.filter((f) => watched[f]?.trim().length > 0).length;
    return Math.round((filled / REQUIRED_FIELDS.length) * 100);
  }, [watched]);

  const onSubmit = (data: PartnerFormValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log("Partner inquiry submitted:", data);
    }, 1400);
  };

  return (
    <>
      {/* Debug Error Display */}
      {partnerError && (
        <div className="bg-red-50 border border-red-200 p-4 m-4 rounded-lg">
          <p className="text-red-700 font-semibold">Error loading partner page:</p>
          <p className="text-red-600 text-sm">{partnerError}</p>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible">
              <motion.div custom={0} variants={fadeUp}>
                <Badge variant="secondary" className="mb-5 bg-primary/8 text-primary border-0 font-medium text-xs tracking-wide">
                  {partner?.landing?.partnershipSection?.label || "Partnership Program"}
                </Badge>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[3.25rem] font-display font-bold text-foreground leading-tight mb-6">
                {partner?.landing?.partnershipSection?.headline ? (
                  partner?.landing?.partnershipSection?.highlightedText ? (
                    <>
                      {partner.landing.partnershipSection.headline.split(partner.landing.partnershipSection.highlightedText)[0]}
                      <span className="gradient-text">{partner.landing.partnershipSection.highlightedText}</span>
                      {partner.landing.partnershipSection.headline.split(partner.landing.partnershipSection.highlightedText)[1]}
                    </>
                  ) : (
                    partner.landing.partnershipSection.headline
                  )
                ) : (
                  <>Proactive, Technology-Enabled <span className="gradient-text">Care Management</span> for Your Practice.</>
                )}
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-xl">
                {partner?.landing?.partnershipSection?.description || "Enhance patient outcomes, reduce hospitalizations and ER visits, and unlock new revenue streams with OmniMed's integrated RPM, CCM, and PCM infrastructure."}
              </motion.p>
              <motion.ul custom={2} variants={fadeUp} className="space-y-2 mb-8 max-w-xl">
                {(partner?.landing?.partnershipSection?.benefits || ["Reduce hospitalizations & ER visits", "Improve chronic disease management", "Generate compliant reimbursement revenue"]).map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>
              <motion.div custom={3} variants={fadeUp}>
                <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                  <Button size="lg" className="rounded-full px-8" asChild>
                    <a href={partner?.landing?.partnershipSection?.ctaButtonLink || "#partner-form"}>
                      {partner?.landing?.partnershipSection?.ctaButtonText || "Apply for Partnership"}
                      <ArrowRight size={16} className="ml-1.5" />
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <FloatingDashboard heroImage={partner?.landing?.partnershipSection?.heroImage} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Value Proposition Grid ── */}
      <section className="py-20 lg:py-28 surface-tint">
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Why Partner?</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Built for Scale, Designed for Care</h2>
            <p className="text-muted-foreground leading-relaxed">Everything your practice needs to deliver proactive, technology-driven care management and generate sustainable growth.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {valuePillars.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
                className="group rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <Badge variant="secondary" className="mb-5 bg-primary/8 text-primary border-0 font-medium text-xs tracking-wide">{v.badge}</Badge>
                <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-primary/10">
                  <v.icon className="text-muted-foreground transition-colors duration-300 group-hover:text-primary" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Offer RPM & CCM - Enhanced with Image & Animations ── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content - Enhanced Text with Staggered Animations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
              }}
            >
              {/* Animated Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_PROFESSIONAL } }
                }}
              >
                <Badge variant="secondary" className="mb-5 bg-secondary/10 text-secondary border-0 font-medium text-xs tracking-wide inline-flex items-center gap-2 px-4 py-2 rounded-full">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  {partner?.landing?.clinicalImpactSection?.badge || "Clinical Impact"}
                </Badge>
              </motion.div>

              {/* Animated Headline */}
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PROFESSIONAL } }
                }}
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight"
              >
                {partner?.landing?.clinicalImpactSection?.headline ? (
                  partner?.landing?.clinicalImpactSection?.highlightedText ? (
                    <>
                      {partner.landing.clinicalImpactSection.headline.split(partner.landing.clinicalImpactSection.highlightedText)[0]}
                      <span className="gradient-text">{partner.landing.clinicalImpactSection.highlightedText}</span>
                      {partner.landing.clinicalImpactSection.headline.split(partner.landing.clinicalImpactSection.highlightedText)[1]}
                    </>
                  ) : (
                    partner.landing.clinicalImpactSection.headline
                  )
                ) : (
                  <>Why Offer <span className="gradient-text">RPM &amp; CCM?</span></>
                )}
              </motion.h2>

              {/* Animated Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: EASE_PROFESSIONAL } }
                }}
                className="text-muted-foreground leading-relaxed mb-8 text-lg"
              >
                {partner?.landing?.clinicalImpactSection?.description || "Partner with us to deliver proactive, technology-enabled care management that transforms patient outcomes while strengthening your practice's financial health."}
              </motion.p>

              {/* Animated CTA Button */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: EASE_PROFESSIONAL } }
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px -10px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button asChild size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
                    <a href={partner?.landing?.clinicalImpactSection?.ctaButtonLink || "#partner-form"}>
                      {partner?.landing?.clinicalImpactSection?.ctaButtonText || "Start Your Partnership"}
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={18} />
                      </motion.span>
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image Container - Moved below CTA button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: EASE_PROFESSIONAL, delay: 0.3 }}
                className="relative mt-10"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                  <motion.div
                    className="aspect-[4/3] bg-gradient-to-br from-slate-900 to-slate-800 relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Use Sanity Image or Fallback to Dashboard Visualization */}
                    {partner?.landing?.clinicalImpactSection?.heroImage?.asset?.url ? (
                      <motion.img
                        src={partner.landing.clinicalImpactSection.heroImage.asset.url}
                        alt={partner?.landing?.clinicalImpactSection?.headline || "Clinical Impact"}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE_PROFESSIONAL }}
                      />
                    ) : (
                    /* Medical Dashboard Visualization */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-blue-900/40 via-cyan-900/30 to-teal-900/40 relative overflow-hidden">
                        {/* Animated Grid Lines */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                                              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                          }} />
                        </div>

                        {/* Floating UI Elements */}
                        <motion.div
                          className="absolute top-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                            <div className="h-2 bg-white/30 rounded-full flex-1" />
                            <div className="h-2 w-20 bg-white/20 rounded-full" />
                          </div>
                        </motion.div>

                        {/* Heart Rate Monitor Animation */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                        >
                          <svg width="200" height="60" viewBox="0 0 200 60">
                            <motion.path
                              d="M0,30 Q20,30 25,30 T35,30 L40,10 L50,50 L55,30 L200,30"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="2"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 2, delay: 0.6 }}
                            />
                          </svg>
                        </motion.div>

                        {/* Floating Stats Cards */}
                        <motion.div
                          className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                          initial={{ x: -30, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7, type: "spring" }}
                          animate={{ y: [0, -5, 0] }}
                        >
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-green-500" />
                            <span className="text-xs font-semibold text-slate-700">98% Patient Engagement</span>
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                          initial={{ x: 30, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8, type: "spring" }}
                          animate={{ y: [0, -5, 0] }}
                        >
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold text-slate-700">+40% Revenue Growth</span>
                          </div>
                        </motion.div>

                        {/* Animated Circles */}
                        <motion.div
                          className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full border-2 border-blue-400/30"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute bottom-1/4 left-1/4 w-12 h-12 rounded-full border-2 border-cyan-400/30"
                          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    )}

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                    />
                  </motion.div>
                </div>

                {/* Floating Decorative Elements */}
                <motion.div
                  className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 -z-10"
                  animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 -z-10"
                  animate={{ rotate: [0, -10, 0], y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </motion.div>
            </motion.div>

            {/* Right Content - Benefit Cards Only */}
            <div className="relative">
              {/* Benefit Cards - Floating List */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
                }}
                className="space-y-3"
              >
                {(partner?.landing?.clinicalImpactSection?.benefits || [
                  { icon: "Activity", text: "Improve chronic disease management" },
                  { icon: "ShieldCheck", text: "Reduce hospitalizations and ER visits" },
                  { icon: "Users", text: "Strengthen patient engagement" },
                  { icon: "BarChart3", text: "Increase quality scores" },
                  { icon: "DollarSign", text: "Generate reimbursement revenue" }
                ]).map((item, i) => {
                  const iconMap: { [key: string]: any } = {
                    Activity, ShieldCheck, Users, BarChart3, DollarSign, HeartHandshake, TrendingUp, FileCheck, Settings, Stethoscope, Cpu, Building2
                  };
                  const IconComponent = iconMap[item.icon] || Activity;
                  const colorMap: { [key: string]: string } = {
                    Activity: "text-green-500",
                    ShieldCheck: "text-blue-500",
                    Users: "text-purple-500",
                    BarChart3: "text-orange-500",
                    DollarSign: "text-emerald-500",
                    HeartHandshake: "text-pink-500",
                    TrendingUp: "text-primary",
                    FileCheck: "text-yellow-500",
                    Settings: "text-gray-500",
                    Stethoscope: "text-red-500",
                    Cpu: "text-indigo-500",
                    Building2: "text-cyan-500"
                  };
                  const bgMap: { [key: string]: string } = {
                    Activity: "bg-green-500/10",
                    ShieldCheck: "bg-blue-500/10",
                    Users: "bg-purple-500/10",
                    BarChart3: "bg-orange-500/10",
                    DollarSign: "bg-emerald-500/10",
                    HeartHandshake: "bg-pink-500/10",
                    TrendingUp: "bg-primary/10",
                    FileCheck: "bg-yellow-500/10",
                    Settings: "bg-gray-500/10",
                    Stethoscope: "bg-red-500/10",
                    Cpu: "bg-indigo-500/10",
                    Building2: "bg-cyan-500/10"
                  };
                  return (
                  <motion.div
                    key={item.text}
                    variants={{
                      hidden: { opacity: 0, x: 30, scale: 0.95 },
                      visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: EASE_PROFESSIONAL } }
                    }}
                    whileHover={{ x: -8, scale: 1.02, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-white/80 backdrop-blur-sm shadow-sm cursor-default"
                  >
                    <motion.div
                      className={`w-10 h-10 rounded-xl ${bgMap[item.icon] || "bg-primary/10"} flex items-center justify-center shrink-0`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className={colorMap[item.icon] || "text-primary"} size={20} />
                    </motion.div>
                    <p className="text-foreground font-medium text-sm">{item.text}</p>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      <CheckCircle2 className="text-primary" size={18} />
                    </motion.div>
                  </motion.div>
                );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Partner With Us ── */}
      <section className="py-20 lg:py-28 surface-tint">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={sectionReveal}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Partner Benefits</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Why Partner With Us</h2>
            <p className="text-muted-foreground leading-relaxed">Experience the OmniMed difference — comprehensive support, proven technology, and a commitment to your success.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Turnkey implementation", desc: "Seamless integration with minimal disruption" },
              { title: "HIPAA-compliant technology", desc: "Enterprise-grade security and compliance" },
              { title: "Dedicated care management team", desc: "Licensed clinicians supporting your patients" },
              { title: "No disruption to workflow", desc: "Designed to enhance, not interrupt" }
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
                className="group p-6 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                  <ShieldCheck className="text-primary" size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Managed Services / What's Included ── */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Managed Services</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">What's Included</h2>
            <p className="text-muted-foreground leading-relaxed">Our end-to-end operational support covers every stage — from setup to ongoing performance optimization.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {managedServices.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
                className="group card-elevated p-7 rounded-2xl flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-secondary/20">
                  <s.icon className="text-secondary" size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CEO Message ── */}
      <section className="py-20 lg:py-28 surface-tint">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={sectionReveal}
            className="max-w-4xl mx-auto"
          >
            <div className="card-elevated rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg">
                  <img src={ceoPortrait} alt="Giash Ahmed, President & CEO" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <Quote className="text-primary/30 mb-3" size={32} />
                <p className="text-foreground leading-relaxed mb-4 italic">
                  "At OmniMed Health, we believe that proactive, technology-enabled care management is the future of healthcare. Our mission is to empower providers with the tools and support they need to enhance patient outcomes, reduce hospitalizations, and build sustainable revenue — all while keeping the focus where it belongs: on the patient."
                </p>
                <div>
                  <p className="font-display font-bold text-foreground">Giash Ahmed</p>
                  <p className="text-sm text-muted-foreground">President & CEO, OmniMed Health</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start text-sm text-muted-foreground">
                  <a href="tel:9177447308" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <HeartHandshake size={14} /> (917) 744-7308
                  </a>
                  <a href="mailto:Info@Omnimedhealth.org" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Plug size={14} /> Info@Omnimedhealth.org
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Partnership Tiers ── */}
      <section className="py-20 lg:py-28 bg-foreground text-background">
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-secondary font-display font-semibold text-sm tracking-wider uppercase mb-3">Partnership Pathways</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Choose Your Path</h2>
            <p className="text-background/60 leading-relaxed">Whether you're a clinical practice or a technology company, we have a partnership model built for you.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {partnerPaths.map((path, i) => (
              <motion.div
                key={path.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
                className="group relative rounded-2xl border border-background/10 bg-background/5 backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]"
              >
                <div className="w-14 h-14 rounded-xl bg-background/10 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary/20">
                  <path.icon className="text-background/70 transition-colors duration-300 group-hover:text-secondary" size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-xl mb-1">{path.title}</h3>
                <p className="text-background/50 text-sm mb-6">{path.sub}</p>
                <ul className="space-y-3">
                  {path.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-background/70">
                      <CheckCircle2 size={16} className="text-secondary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                    <Button variant="outline" className="rounded-full border-background/20 text-background hover:bg-background/10" asChild>
                      <a href="#partner-form">Get Started <ArrowRight size={14} className="ml-1.5" /></a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Logo Cloud ── */}
      <LogoCloud />

      {/* ── Partner Inquiry Form ── */}
      <section id="partner-form" className="py-20 lg:py-28 surface-tint scroll-mt-20">
        <div className="section-container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Apply Now</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Partner Inquiry</h2>
            <p className="text-muted-foreground leading-relaxed">Tell us about your organization and we'll reach out within 48 hours.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal} className="max-w-2xl mx-auto">
            <div className="card-elevated p-8 sm:p-10 rounded-2xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="text-center py-14">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 150, damping: 20 }} className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="text-secondary" size={32} />
                    </motion.div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">Application Received!</h3>
                    <p className="text-muted-foreground mb-6">Thank you for your interest. Our partnerships team will contact you within 48 hours.</p>
                    <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                      <Button variant="outline" onClick={() => { setSubmitted(false); form.reset(); }} className="rounded-full">Submit Another Inquiry</Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">Form Progress</span>
                        <span className="text-xs font-semibold text-primary">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField control={form.control} name="orgName" render={({ field }) => (
                            <FormItem><FormLabel>Organization Name</FormLabel><FormControl><Input placeholder="Acme Health Systems" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="contactPerson" render={({ field }) => (
                            <FormItem><FormLabel>Contact Person</FormLabel><FormControl><Input placeholder="Dr. Jane Smith" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Business Email</FormLabel><FormControl><Input type="email" placeholder="jane@acmehealth.com" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="npi" render={({ field }) => (
                            <FormItem><FormLabel>NPI Number <span className="text-muted-foreground font-normal">(optional)</span></FormLabel><FormControl><Input placeholder="1234567890" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField control={form.control} name="patientVolume" render={({ field }) => (
                            <FormItem><FormLabel>Estimated Patient Volume</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select volume" /></SelectTrigger></FormControl>
                                <SelectContent>
                                  <SelectItem value="1-100">1 – 100 patients</SelectItem>
                                  <SelectItem value="101-500">101 – 500 patients</SelectItem>
                                  <SelectItem value="501-2000">501 – 2,000 patients</SelectItem>
                                  <SelectItem value="2000+">2,000+ patients</SelectItem>
                                </SelectContent>
                              </Select>
                            <FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="interest" render={({ field }) => (
                            <FormItem><FormLabel>Partnership Interest</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select interest" /></SelectTrigger></FormControl>
                                <SelectContent>
                                  <SelectItem value="clinic">Clinic Partner</SelectItem>
                                  <SelectItem value="technology">Technology Partner</SelectItem>
                                  <SelectItem value="both">Both</SelectItem>
                                  <SelectItem value="other">Other / Exploring</SelectItem>
                                </SelectContent>
                              </Select>
                            <FormMessage /></FormItem>
                          )} />
                        </div>

                        <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block pt-2">
                          <Button type="submit" disabled={loading} className="rounded-full px-8" size="lg">
                            {loading ? (
                              <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                Submitting...
                              </span>
                            ) : (
                              <>Submit Inquiry <Send size={16} className="ml-1.5" /></>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Partner;
