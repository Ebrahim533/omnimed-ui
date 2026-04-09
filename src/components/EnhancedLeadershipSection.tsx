import { motion } from "framer-motion";
import { Linkedin, Sparkles, Quote, Crown, Award } from "lucide-react";
import { urlFor, getSanityImageUrl } from "@/lib/sanity";
import type { Person } from "@/hooks/useSanity";
import { viewportOnce, EASE_PROFESSIONAL } from "@/lib/animations";

interface EnhancedLeadershipSectionProps {
  featuredPerson: Person | null;
  team: Person[];
  settings?: {
    ceoSignature?: any;
  } | null;
  loading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
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

const imageRevealVariants = {
  hidden: { opacity: 0, scale: 1.1, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE_PROFESSIONAL,
    },
  },
};

const floatingAnimation = {
  y: [-6, 6, -6],
  rotate: [-2, 2, -2],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Animated signature component
const AnimatedSignature = ({ signatureImage }: { signatureImage?: any }) => {
  if (!signatureImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, pathLength: 0 }}
      whileInView={{ opacity: 1, pathLength: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
    >
      <img
        src={getSanityImageUrl(signatureImage, 100)}
        alt="CEO Signature"
        className="h-12 w-auto opacity-70"
      />
    </motion.div>
  );
};

export const EnhancedLeadershipSection = ({ 
  featuredPerson, 
  team, 
  settings,
  loading = false 
}: EnhancedLeadershipSectionProps) => {
  const otherMembers = team?.filter(member => !member.featured) || [];

  const ceoContent = {
    title: "Meet Our Visionary Leader",
    subtitle: "Guided by Experience, Driven by Purpose",
    description: "With over 15 years of healthcare innovation experience, our leadership brings together clinical expertise and technological vision to transform patient care delivery.",
    quote: "The future of healthcare isn't about treating sickness—it's about preventing it. Every patient deserves proactive, personalized care that meets them where they are.",
    achievements: [
      { icon: Crown, label: "15+ Years", sublabel: "Healthcare Innovation" },
      { icon: Award, label: "Healthcare", sublabel: "Technology Pioneer" },
    ]
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48 mx-auto" />
          <div className="h-4 bg-muted rounded w-64 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6"
          >
            <Sparkles size={16} />
            Leadership
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6"
          >
            {ceoContent.title}
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground"
          >
            {ceoContent.subtitle}
          </motion.p>
        </motion.div>

        {/* Featured CEO Card */}
        {featuredPerson && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mb-20"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10">
              <motion.div
                animate={floatingAnimation}
                className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  y: [8, -8, 8],
                  rotate: [2, -2, 2],
                  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"
              />
            </div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Image Column */}
              <motion.div variants={itemVariants} className="lg:col-span-5">
                <div className="relative">
                  {/* Main Image */}
                  <motion.div
                    className="relative rounded-3xl overflow-hidden aspect-[4/5]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    {featuredPerson.image ? (
                      <>
                        <motion.img
                          variants={imageRevealVariants}
                          src={urlFor(featuredPerson.image).width(600).height(750).auto("format").url()}
                          alt={featuredPerson.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No image available</span>
                      </div>
                    )}
                    
                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl border-2 border-primary/20"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    />
                  </motion.div>

                  {/* Floating Achievement Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, x: 20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8"
                  >
                    <div className="bg-card rounded-2xl p-4 shadow-xl border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Crown className="text-primary-foreground" size={24} />
                        </div>
                        <div>
                          <p className="font-display font-bold text-foreground">15+ Years</p>
                          <p className="text-xs text-muted-foreground">Leadership Excellence</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
                {/* Role Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary font-semibold text-sm"
                >
                  <Award size={16} />
                  {featuredPerson.role || "President & CEO"}
                </motion.div>

                {/* Name */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
                  {featuredPerson.name}
                </h3>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="relative"
                >
                  <Quote className="absolute -top-3 -left-2 text-primary/20" size={40} />
                  <blockquote className="text-lg sm:text-xl text-muted-foreground leading-relaxed pl-10 italic">
                    "{featuredPerson.bio || ceoContent.quote}"
                  </blockquote>
                </motion.div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {ceoContent.description}
                </p>

                {/* Achievements */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {ceoContent.achievements.map((achievement, i) => (
                    <motion.div
                      key={achievement.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-border/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <achievement.icon className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">{achievement.label}</p>
                        <p className="text-xs text-muted-foreground">{achievement.sublabel}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Signature & Social */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex items-center justify-between pt-6 border-t border-border"
                >
                  <div className="space-y-2">
                    <AnimatedSignature signatureImage={settings?.ceoSignature} />
                    <p className="text-sm text-muted-foreground">Digital Signature</p>
                  </div>

                  {featuredPerson.social && featuredPerson.social.length > 0 && (
                    <motion.a
                      href={featuredPerson.social[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25"
                      aria-label={`${featuredPerson.name}'s LinkedIn`}
                    >
                      <Linkedin size={22} className="text-primary-foreground" />
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Team Grid */}
        {otherMembers.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h4
              variants={itemVariants}
              className="text-2xl font-display font-bold text-foreground mb-8 text-center"
            >
              Our Leadership Team
            </motion.h4>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherMembers.map((member, i) => (
                <motion.div
                  key={member._id}
                  variants={itemVariants}
                  custom={i}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative rounded-2xl overflow-hidden card-elevated bg-card"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                    {member.image ? (
                      <motion.img
                        src={urlFor(member.image).width(400).height(500).auto("format").url()}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-background text-sm leading-relaxed mb-4 line-clamp-3">
                          {member.bio || "Team member dedicated to transforming healthcare through innovation and compassion."}
                        </p>
                        {member.social && member.social.length > 0 && (
                          <motion.a
                            href={member.social[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex w-10 h-10 rounded-xl bg-background/20 items-center justify-center hover:bg-background/30 transition-colors"
                            aria-label={`${member.name}'s LinkedIn`}
                          >
                            <Linkedin size={18} className="text-background" />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-5">
                    <h5 className="font-display font-bold text-foreground">{member.name}</h5>
                    <p className="text-sm text-muted-foreground">{member.role || "Leadership Team"}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
