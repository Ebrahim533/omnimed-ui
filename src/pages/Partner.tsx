import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plug, ShieldCheck, HeartHandshake, Building2, Cpu, ArrowRight, CheckCircle2, Send } from "lucide-react";
import { fadeUp, sectionReveal, cardStagger, viewportOnce, buttonHover, buttonTap } from "@/lib/animations";
import partnerHero from "@/assets/partner-hero.jpg";

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
  { icon: Plug, title: "Turnkey Integration", badge: "Plug & Play", desc: "Seamlessly integrate our RPM and CCM workflows into your existing practice — zero disruption, immediate value." },
  { icon: ShieldCheck, title: "Compliance & Revenue", badge: "HIPAA Ready", desc: "Automated billing codes (99490, 99457, 99491) and HIPAA-compliant data handling that maximizes reimbursement." },
  { icon: HeartHandshake, title: "Patient Retention", badge: "Engagement", desc: "Tech-enabled touchpoints — from wearable alerts to care-plan reminders — that keep patients engaged and loyal." },
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
const FloatingDashboard = () => {
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

  return (
    <motion.div
      style={{ y: smoothY, rotateZ: rotate }}
      className="relative"
    >
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/30">
        <img src={partnerHero} alt="OmniMed SaaS medical dashboard" className="w-full h-auto" loading="eager" />
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
    <Layout>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible">
              <motion.div custom={0} variants={fadeUp}>
                <Badge variant="secondary" className="mb-5 bg-primary/8 text-primary border-0 font-medium text-xs tracking-wide">
                  Partnership Program
                </Badge>
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[3.25rem] font-display font-bold text-foreground leading-tight mb-6">
                Scale Your Practice with OmniMed's <span className="gradient-text">Proactive Care Infrastructure.</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Join our network of healthcare innovators and leverage our RPM, CCM, and PCM technology to improve patient outcomes and clinic revenue.
              </motion.p>
              <motion.div custom={3} variants={fadeUp}>
                <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
                  <Button size="lg" className="rounded-full px-8" asChild>
                    <a href="#partner-form">Apply for Partnership <ArrowRight size={16} className="ml-1.5" /></a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <FloatingDashboard />
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
            <p className="text-muted-foreground leading-relaxed">Everything your practice needs to deliver proactive, technology-driven care management.</p>
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
                    {/* Progress bar */}
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
    </Layout>
  );
};

export default Partner;
