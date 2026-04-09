import { motion } from "framer-motion";
import { Linkedin, Quote, Sparkles, Target, Heart, Lightbulb } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { getSanityImageUrl } from "@/lib/sanity";
import type { Person } from "@/hooks/useSanity";
import { viewportOnce, EASE_PROFESSIONAL } from "@/lib/animations";

interface FounderSectionProps {
  featuredPerson: Person;
  settings?: {
    ceoSignature?: any;
  } | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, x: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: EASE_PROFESSIONAL,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_PROFESSIONAL,
    },
  },
};

const quoteVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.3,
      ease: EASE_PROFESSIONAL,
    },
  },
};

const floatingAnimation = {
  y: [-8, 8, -8],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const EnhancedFounderSection = ({ featuredPerson, settings }: FounderSectionProps) => {
  if (!featuredPerson) return null;

  const ceoContent = {
    tagline: "Visionary Leadership",
    headline: "Transforming Healthcare Through Innovation & Compassion",
    quote: "Healthcare isn't just about treating illness—it's about anticipating needs, preventing crises, and empowering every patient to live their healthiest life. At OmniMed, we're not just building technology; we're rebuilding trust in healthcare.",
    bio: [
      {
        icon: Target,
        title: "Our Mission",
        text: "To shift healthcare from reactive to proactive, ensuring every patient receives personalized, continuous care that prevents crises before they occur."
      },
      {
        icon: Heart,
        title: "Patient-First Philosophy",
        text: "Technology should serve people, not the other way around. Every feature we build puts patient wellbeing and provider efficiency at its core."
      },
      {
        icon: Lightbulb,
        title: "Innovation Driven",
        text: "We're pioneering the future of remote care management, combining cutting-edge monitoring with genuine human connection."
      }
    ],
    closing: "Together, we're not just managing care—we're transforming lives."
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Image Column */}
          <motion.div variants={imageVariants} className="lg:col-span-5 relative">
            {/* Decorative Elements */}
            <motion.div
              animate={floatingAnimation}
              className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                y: [8, -8, 8],
                transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"
            />
            
            {/* Image Container */}
            <div className="relative">
              <motion.div
                className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-primary/5 to-secondary/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {featuredPerson.image ? (
                  <>
                    <motion.img
                      src={urlFor(featuredPerson.image).width(600).height(750).auto("format").url()}
                      alt={featuredPerson.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={viewportOnce}
                      transition={{ duration: 1.2, ease: EASE_PROFESSIONAL }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                    
                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-primary/20"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <p>Portrait image not available</p>
                  </div>
                )}
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-8"
              >
                <div className="bg-card rounded-2xl p-4 shadow-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Sparkles className="text-primary-foreground" size={24} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-foreground">15+ Years</p>
                      <p className="text-xs text-muted-foreground">Healthcare Innovation</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header */}
            <motion.div variants={contentVariants} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm"
              >
                <Sparkles size={16} />
                {ceoContent.tagline}
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
                {ceoContent.headline.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                    className={word === "Innovation" || word === "Compassion" ? "gradient-text" : ""}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </h2>
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={quoteVariants}
              className="relative"
            >
              <Quote className="absolute -top-4 -left-2 text-primary/20" size={48} />
              <blockquote className="text-lg sm:text-xl text-muted-foreground leading-relaxed pl-12 italic">
                "{featuredPerson.bio || ceoContent.quote}"
              </blockquote>
            </motion.div>

            {/* Bio Points */}
            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-3 gap-4"
            >
              {ceoContent.bio.map((point, i) => (
                <motion.div
                  key={point.title}
                  variants={contentVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <point.icon className="text-primary" size={20} />
                  </div>
                  <h4 className="font-display font-semibold text-foreground text-sm mb-2">{point.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{point.text}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Closing Statement */}
            <motion.p
              variants={contentVariants}
              className="text-foreground font-medium text-lg"
            >
              {ceoContent.closing}
            </motion.p>

            {/* Signature Area */}
            <motion.div
              variants={contentVariants}
              className="pt-4 flex flex-col sm:flex-row sm:items-center gap-6"
            >
              <div className="space-y-2">
                {settings?.ceoSignature && (
                  <motion.img
                    src={getSanityImageUrl(settings.ceoSignature, 120)}
                    alt="CEO Signature"
                    className="h-14 w-auto opacity-70"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.7, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                  />
                )}
                <div>
                  <p className="font-display font-bold text-xl text-foreground">{featuredPerson.name}</p>
                  <p className="text-primary font-medium">{featuredPerson.role}</p>
                </div>
              </div>

              {featuredPerson.social && featuredPerson.social.length > 0 && (
                <motion.a
                  href={featuredPerson.social[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                  aria-label={`${featuredPerson.name}'s LinkedIn`}
                >
                  <Linkedin size={22} className="text-primary-foreground" />
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
