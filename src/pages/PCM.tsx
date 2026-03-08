import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, CheckCircle2, Stethoscope, ClipboardList, HeartPulse } from "lucide-react";
import { fadeUp, sectionReveal, cardStagger, slideInLeft, slideInRight, viewportOnce, buttonHover, buttonTap } from "@/lib/animations";

const features = [
  "Specialist-led comprehensive care plans",
  "Longitudinal management for complex conditions",
  "Care coordination across multiple providers",
  "Monthly patient wellness check-ins",
  "Medication management and reconciliation",
  "24/7 access to care team resources",
];

const highlights = [
  { icon: Stethoscope, title: "Dedicated Specialist", desc: "Each patient is assigned a specialist who oversees their complete care journey." },
  { icon: ClipboardList, title: "Personalized Care Plans", desc: "Evidence-based plans tailored to each patient's unique condition and goals." },
  { icon: HeartPulse, title: "Continuous Monitoring", desc: "Regular assessments ensure early detection of any changes in condition." },
];

const PCMPage = () => (
  <Layout>
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mb-14">
          <motion.p custom={0} variants={fadeUp} className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Principal Care Management</motion.p>
          <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">Specialist-Led Care for Complex Patients</motion.h1>
          <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
            Our Principal Care Management program provides focused, specialist-led coordination for patients with a single high-risk chronic condition, ensuring they receive the dedicated attention their health demands.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={slideInLeft}>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">What's Included</h2>
            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div key={f} custom={i} initial="hidden" whileInView="visible" viewport={viewportOnce} variants={cardStagger} className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary mt-0.5 shrink-0" size={20} />
                  <span className="text-foreground">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={slideInRight} className="space-y-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="card-elevated p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={sectionReveal} className="text-center">
          <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/appointment">Get Started with PCM <ArrowRight size={16} className="ml-1" /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default PCMPage;
