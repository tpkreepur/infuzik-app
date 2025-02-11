// app/page.tsx
"use client";
import { motion } from "framer-motion";
import Hero from "@/components/sections/hero/default";

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <Hero />
    </motion.div>
  );
}
