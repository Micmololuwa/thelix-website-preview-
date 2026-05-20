import { motion, type Variants } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const vp = { once: true, margin: "-72px" as const };

// ---- Variant definitions ----

const fadeUpV: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const fadeInV: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideLeftV: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const slideRightV: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const scaleInV: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1 },
};

// Stagger container — children inherit visible/hidden from parent
const staggerContainerV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// Stagger child — transition lives inside variant so parent controls timing
const staggerItemV: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---- Base props — extends div attrs so style, role, aria-* etc. all pass through ----

type BaseProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
};

// ---- Scroll-triggered wrappers ----

export function FadeUp({ children, className, delay = 0, ...rest }: BaseProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={fadeUpV}
      transition={{ duration: 1.0, ease, delay }}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, className, delay = 0, ...rest }: BaseProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={fadeInV}
      transition={{ duration: 0.9, ease, delay }}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}

export function SlideLeft({ children, className, delay = 0, ...rest }: BaseProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={slideLeftV}
      transition={{ duration: 1.05, ease, delay }}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}

export function SlideRight({ children, className, delay = 0, ...rest }: BaseProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={slideRightV}
      transition={{ duration: 1.05, ease, delay }}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className, delay = 0, ...rest }: BaseProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={scaleInV}
      transition={{ duration: 0.95, ease, delay }}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}

// ---- Stagger grid ----
// Wrap a grid/list container with this; each direct child should be <StaggerItem>

export function StaggerGrid({ children, className, delay = 0, ...rest }: BaseProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={vp}
      variants={staggerContainerV}
      transition={{ delayChildren: delay }}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}

// Inherits animation state from parent StaggerGrid — do NOT add whileInView here
export function StaggerItem({ children, className, ...rest }: Omit<BaseProps, "delay">) {
  return (
    <motion.div className={className} variants={staggerItemV} {...(rest as any)}>
      {children}
    </motion.div>
  );
}

// ---- Page transition wrapper ----
// Wrap each page's root element with this for smooth enter/exit between routes

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.55, ease }}
    >
      {children}
    </motion.div>
  );
}
