import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Stethoscope, Activity, Smartphone, ArrowRight, type LucideIcon } from "lucide-react";
import { cardStagger, viewportOnce, EASE_PROFESSIONAL } from "@/lib/animations";
import servicePcm from "@/assets/service-pcm.jpg";
import serviceCcm from "@/assets/service-ccm.jpg";
import serviceRpm from "@/assets/service-rpm.jpg";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  shortTitle: string;
  desc: string;
  href: string;
  image: string;
  gradient: string;
}

const services: ServiceItem[] = [
  {
    icon: Stethoscope,
    title: "Principal Care Management",
    shortTitle: "PCM",
    desc: "Specialist-led coordination for complex, high-risk chronic conditions.",
    href: "/services/pcm",
    image: servicePcm,
    gradient: "from-primary/80 to-primary/40",
  },
  {
    icon: Activity,
    title: "Chronic Care Management",
    shortTitle: "CCM",
    desc: "Continuous management for patients with two or more chronic conditions.",
    href: "/services/ccm",
    image: serviceCcm,
    gradient: "from-secondary/80 to-secondary/40",
  },
  {
    icon: Smartphone,
    title: "Remote Patient Monitoring",
    shortTitle: "RPM",
    desc: "Real-time health data from connected devices for proactive care.",
    href: "/services/rpm",
    image: serviceRpm,
    gradient: "from-accent/80 to-accent/40",
  },
];

const ServiceHighlightStrip = () => {
  const { pathname } = useLocation();

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: EASE_PROFESSIONAL }}
          className="text-center mb-12"
        >
          <p className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-3">
            Explore Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
            Integrated Care Solutions
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => {
            const isActive = pathname === service.href;

            return (
              <motion.div
                key={service.href}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
              >
                <Link
                  to={service.href}
                  className={`group relative block h-full rounded-2xl overflow-hidden transition-all duration-500 ${
                    isActive
                      ? "ring-2 ring-primary shadow-lg shadow-primary/10"
                      : "hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />
                  </div>

                  {/* Content overlay */}
                  <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end min-h-[260px]">
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                      >
                        Current
                      </motion.div>
                    )}

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center mb-4 border border-primary-foreground/20 transition-colors duration-300 group-hover:bg-primary/80">
                      <service.icon className="text-primary-foreground" size={20} strokeWidth={1.5} />
                    </div>

                    {/* Text */}
                    <h3 className="font-display font-bold text-primary-foreground text-lg sm:text-xl mb-2">
                      {service.title}
                    </h3>
                    <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4 line-clamp-2">
                      {service.desc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 text-primary-foreground/80 text-sm font-medium group-hover:text-primary-foreground transition-colors">
                      <span>{isActive ? "You're here" : "Learn more"}</span>
                      {!isActive && (
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlightStrip;
