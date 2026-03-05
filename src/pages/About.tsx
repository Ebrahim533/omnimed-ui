import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Heart, Cpu, Users, Target } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const values = [
  { icon: Heart, title: "Patient-Centered", desc: "Every decision starts with what's best for the patient." },
  { icon: Cpu, title: "Tech-Forward", desc: "We leverage cutting-edge technology to deliver smarter care." },
  { icon: Users, title: "Collaborative", desc: "Seamless coordination between providers, patients, and families." },
  { icon: Target, title: "Proactive", desc: "We anticipate needs before they become emergencies." },
];

const About = () => (
  <Layout>
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto text-center mb-16">
          <motion.p custom={0} variants={fadeUp} className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">About OmniMed</motion.p>
          <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            Redefining Care Through Technology
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
            OmniMed was founded on a simple belief: healthcare should be proactive, not reactive. By integrating advanced monitoring, data analytics, and compassionate care coordination, we empower providers to deliver better outcomes for every patient.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-elevated p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <v.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6 text-center">Our Mission</h2>
          <div className="card-elevated p-8 lg:p-10">
            <p className="text-muted-foreground leading-relaxed mb-4">
              At OmniMed, we bridge the gap between traditional healthcare and modern technology. Our platform enables healthcare providers to monitor patients continuously, identify risks early, and intervene before conditions escalate.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that every patient deserves access to proactive, personalized care—regardless of their location or condition. Through our comprehensive suite of care management services, we're making that vision a reality for thousands of patients and hundreds of healthcare organizations across the country.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default About;
