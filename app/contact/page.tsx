// app/contact/page.tsx
"use client";
import { motion } from "framer-motion";
import FrostedCard from "@/components/FrostedCard";

export default function Contact(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-6"
    >
      <FrostedCard className="max-w-lg w-full">
        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded bg-platinum/40 dark:bg-charcoal/40 border border-platinum dark:border-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded bg-platinum/40 dark:bg-charcoal/40 border border-platinum dark:border-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 rounded bg-platinum/40 dark:bg-charcoal/40 border border-platinum dark:border-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            className="w-full py-3 rounded bg-gold text-charcoal dark:text-ivory font-semibold hover:bg-gold/90 transition"
          >
            Send Message
          </button>
        </form>
      </FrostedCard>
    </motion.div>
  );
}
