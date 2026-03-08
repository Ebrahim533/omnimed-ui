import { motion } from "framer-motion";
import { buttonHover, buttonTap } from "@/lib/animations";

interface MotionButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const MotionButton = ({ children, className, ...props }: MotionButtonProps) => (
  <motion.button
    whileHover={buttonHover}
    whileTap={buttonTap}
    className={className}
    {...props}
  >
    {children}
  </motion.button>
);

export default MotionButton;
