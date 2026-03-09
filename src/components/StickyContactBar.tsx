import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const StickyContactBar = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-primary text-primary-foreground"
  >
    <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
        <span className="font-display font-semibold text-base">Giash Ahmed, President & CEO</span>
        <span className="hidden sm:block w-px h-5 bg-primary-foreground/30" />
        <a href="tel:9177447308" className="flex items-center gap-1.5 hover:underline">
          <Phone size={14} /> (917) 744-7308
        </a>
        <a href="mailto:Info@Omnimedhealth.org" className="flex items-center gap-1.5 hover:underline">
          <Mail size={14} /> Info@Omnimedhealth.org
        </a>
      </div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button asChild variant="secondary" size="sm" className="rounded-full px-6 font-semibold">
          <Link to="/appointment">Let's improve outcomes together</Link>
        </Button>
      </motion.div>
    </div>
  </motion.section>
);

export default StickyContactBar;
