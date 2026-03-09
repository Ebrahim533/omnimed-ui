import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Stethoscope, Activity, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cardStagger, sectionReveal, viewportOnce, buttonHover, buttonTap } from "@/lib/animations";
import servicePcm from "@/assets/service-pcm.jpg";
import serviceCcm from "@/assets/service-ccm.jpg";
import serviceRpm from "@/assets/service-rpm.jpg";

const services = [
  {
    icon: Stethoscope,
    title: "Principal Care Management",
    badge: "Specialist-Led",
    desc: "Specialist-led care coordination for patients with complex, high-risk conditions requiring focused, ongoing clinical attention.",
    href: "/services/pcm",
    image: servicePcm,
  },
  {
    icon: Activity,
    title: "Chronic Care Management",
    badge: "Long-Term",
    desc: "Comprehensive, continuous management for patients living with two or more chronic conditions — reducing complications and ER visits.",
    href: "/services/ccm",
    image: serviceCcm,
  },
  {
    icon: Smartphone,
    title: "Remote Patient Monitoring",
    badge: "Real-Time",
    desc: "Real-time health data from connected wearable devices, enabling proactive clinical decisions and early intervention.",
    href: "/services/rpm",
    image: serviceRpm,
  },
];

const ServiceTrilogy = () => (
  <section className="py-20 lg:py-28">
    <div className="section-container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={sectionReveal}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">
          Our Services
        </p>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
          Integrated Care Management Solutions
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Proactive health monitoring powered by advanced technology.
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
          >
            <Link
              to={service.href}
              className="group block h-full rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md p-8 transition-shadow duration-300 hover:shadow-2xl"
            >
              <Badge
                variant="secondary"
                className="mb-5 bg-primary/8 text-primary border-0 font-medium text-xs tracking-wide"
              >
                {service.badge}
              </Badge>

              <div className="w-12 h-12 rounded-xl bg-muted/60 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-primary/10">
                <service.icon
                  className="text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                  size={24}
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="font-display font-semibold text-lg text-foreground mb-3 whitespace-nowrap">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {service.desc}
              </p>

              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Button
                  variant="ghost"
                  className="px-0 text-primary font-medium group-hover:gap-2 gap-1 transition-all"
                >
                  Learn More <ArrowRight size={14} />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceTrilogy;
