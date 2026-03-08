import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

export default PageTransition;
