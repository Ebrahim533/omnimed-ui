import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Smartphone, Wifi, BarChart3, Bell } from "lucide-react";

const features = [
  "Real-time vitals monitoring via wearable devices",
  "Automated alerts for abnormal readings",
  "Secure data transmission and HIPAA compliance",
  "Integration with major EHR systems",
  "Patient-friendly mobile companion app",
  "Clinical dashboard for provider oversight",
];

const RPMPage = () => (
  <Layout>
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-14">
          <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">Remote Patient Monitoring</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            Real-Time Data, Real-Time Care
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our RPM platform connects patients to their care team through wearable devices and smart sensors, enabling continuous health monitoring and proactive intervention from anywhere.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Platform Features</h2>
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
              { icon: Wifi, title: "Connected Devices", desc: "Compatible with leading health wearables for blood pressure, glucose, SpO2, and more." },
              { icon: Bell, title: "Smart Alerts", desc: "Automated notifications when readings fall outside personalized thresholds." },
              { icon: BarChart3, title: "Analytics Dashboard", desc: "Comprehensive clinical insights with trend analysis and population health views." },
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
            <Link to="/appointment">Explore RPM <ArrowRight size={16} className="ml-1" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default RPMPage;
