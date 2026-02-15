"use client";
import { motion } from "framer-motion";

export function GlassCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`backdrop-blur-xl bg-white/40 dark:bg-black/40 border border-white/20 dark:border-white/10 shadow-xl rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}