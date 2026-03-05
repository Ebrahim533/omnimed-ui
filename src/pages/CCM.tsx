import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Activity, Calendar, Phone, LineChart } from "lucide-react";

const features = [
  "Comprehensive care for 2+ chronic conditions",
  "Monthly care plan development and revision",
  "Continuous communication with care team",
  "Medication adherence tracking",
  "Health education and self-management support",
  "Preventive care and wellness planning",
];

const CCMPage = () => (
  <Layout>
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-14">
          <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Chronic Care Management</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            Long-Term Health Stability
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our Chronic Care Management program provides ongoing, coordinated care for patients managing multiple chronic conditions, reducing hospitalizations and improving quality of life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Program Benefits</h2>
            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary mt-0.5 shrink-0" size={20} />
                  <span className="text-foreground">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {[
              { icon: Calendar, title: "Structured Follow-ups", desc: "Regular check-ins ensure care plans stay on track and patients feel supported." },
              { icon: Phone, title: "Always Connected", desc: "Patients have direct access to their care coordinator for questions and concerns." },
              { icon: LineChart, title: "Data-Driven Insights", desc: "We track outcomes and adjust plans based on real health data, not guesswork." },
            ].map((item) => (
              <div key={item.title} className="card-elevated p-6 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/appointment">Start CCM Program <ArrowRight size={16} className="ml-1" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default CCMPage;
