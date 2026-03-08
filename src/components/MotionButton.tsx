import { motion } from "framer-motion";
import { buttonHover, buttonTap } from "@/lib/animations";
import { Button, type ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

const MotionButtonInner = motion.create(Button);

const MotionButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <MotionButtonInner
    ref={ref}
    whileHover={buttonHover}
    whileTap={buttonTap}
    {...props}
  />
));

MotionButton.displayName = "MotionButton";

export default MotionButton;
