import type { Transition, Variants } from "framer-motion";

// ─── Global easing & spring presets ───
export const EASE_PROFESSIONAL: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 1,
};

// ─── Page transition wrapper ───
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_PROFESSIONAL } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE_PROFESSIONAL } },
};

// ─── Staggered fade-up for children ───
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE_PROFESSIONAL },
  }),
};

// ─── Scroll-triggered section reveal ───
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_PROFESSIONAL },
  },
};

// ─── Slide variants ───
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_PROFESSIONAL },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_PROFESSIONAL },
  },
};

// ─── Card stagger for service pages ───
export const cardStagger: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE_PROFESSIONAL },
  }),
};

// ─── Scale-in for hero elements ───
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_PROFESSIONAL },
  },
};

// ─── Map blur reveal ───
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", scale: 0.97 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.6, ease: EASE_PROFESSIONAL },
  },
};

// ─── Button micro-interactions (use as props) ───
export const buttonHover = { scale: 1.02 };
export const buttonTap = { scale: 0.98 };

// ─── Viewport config ───
export const viewportOnce = { once: true, margin: "-50px" as const };
