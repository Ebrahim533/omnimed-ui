import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Stethoscope, Activity, Smartphone, ArrowRight, type LucideIcon } from "lucide-react";
import { useServices } from "@/hooks/useSanity";
import { getSanityImageUrl } from "@/lib/sanity";
import { cardStagger, viewportOnce, EASE_PROFESSIONAL } from "@/lib/animations";

const gradientMap: Record<number, string> = {
  0: "from-primary/80 to-primary/40",
  1: "from-secondary/80 to-secondary/40",
  2: "from-accent/80 to-accent/40",
};

const ServiceHighlightStrip = () => {
  const { pathname } = useLocation();
  const { services, loading, error } = useServices();

  // Map service title/slug to correct route
  const getServiceSlug = (service: any): string => {
    const title = service.title?.toLowerCase() || "";
    const slug = service.slug?.current?.toLowerCase() || "";
    
    // Check title first
    if (title.includes("principal") || title.includes("pcm") || slug.includes("pcm")) return "pcm";
    if (title.includes("chronic") || title.includes("ccm") || slug.includes("ccm")) return "ccm";
    if (title.includes("remote") || title.includes("rpm") || slug.includes("rpm")) return "rpm";
    
    // Fallback to slug if title doesn't match
    if (slug) return slug;
    
    return "";
  };
  const getIconForService = (title: string): LucideIcon => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("principal") || lowerTitle.includes("pcm")) return Stethoscope;
    if (lowerTitle.includes("chronic") || lowerTitle.includes("ccm")) return Activity;
    if (lowerTitle.includes("remote") || lowerTitle.includes("rpm") || lowerTitle.includes("monitor")) return Smartphone;
    return Stethoscope;
  };

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
          {loading ? (
            <div className="col-span-3 text-center py-8">Loading services...</div>
          ) : error ? (
            <div className="col-span-3 text-center py-8 text-red-500">Error: {error}</div>
          ) : services.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-muted-foreground">No services found. Check Sanity connection.</div>
          ) : (
            services.map((service, i) => {
              const serviceSlug = getServiceSlug(service);
              const href = `/services/${serviceSlug}`;
              const isActive = pathname === href;
              const IconComponent = getIconForService(service.title);
              
              // Debug logging
              console.log(`[ServiceHighlight] ${service.title} → slug: "${service.slug?.current}" → mapped: "${serviceSlug}" → href: "${href}"`);

              return (
              <motion.div
                key={service._id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={cardStagger}
                >
                  <Link
                    to={href}
                    className={`group block h-full rounded-2xl overflow-hidden bg-card border border-border/50 transition-all duration-500 ${
                      isActive
                        ? "ring-2 ring-primary shadow-lg shadow-primary/10"
                        : "hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {service.icon ? (
                        <img
                          src={getSanityImageUrl(service.icon, 600, 375)}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <IconComponent className="text-primary/40" size={48} />
                        </div>
                      )}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                        >
                          Current
                        </motion.div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                        <IconComponent className="text-primary" size={20} strokeWidth={1.5} />
                      </div>

                      <h3 className="font-display font-bold text-foreground text-lg sm:text-xl mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
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
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlightStrip;
