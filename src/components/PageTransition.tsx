"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Home and project URLs share one persistent screen (Showcase changes the URL in place).
  const key = pathname === "/" || pathname.startsWith("/projects/") ? "showcase" : pathname;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
