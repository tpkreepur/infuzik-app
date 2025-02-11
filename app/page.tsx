// app/page.tsx
"use client";
import { motion } from "framer-motion";
import Hero from "@/components/sections/hero/default";
// import FrostedCard from "@/components/FrostedCard";

export default function Landing(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <Hero />
      {/* <FrostedCard className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Your Modern Site</h1>
        <p className="text-lg">
          Elegant, stylish, and inspired by Apple’s design philosophy.
        </p>
      </FrostedCard> */}
    </motion.div>
  );
}
