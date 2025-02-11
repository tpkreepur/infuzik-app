// Example: Wrapping the background image in an animated container
"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";

const waveVariants = cva("absolute w-full", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

const Wave = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof waveVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(waveVariants({ variant }), className)}
    {...props}
  >
    <Image
      src="/static/images/theta.svg"
      alt="Waveform background"
      fill
      className="absolute object-fill"
    />
  </div>
));
Wave.displayName = "Wave";

function BackgroundSVG() {
  return (
    <motion.div
      className="absolute inset-0 z-[-1] top-0"
      initial={{ filter: "blur(10px)" }}
      animate={{ filter: "blur(0px)" }}
      exit={{ filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src="/static/images/theta.svg"
        alt="Waveform background"
        fill
        className="absolute object-fill top-0"
      />
    </motion.div>
  );
}

// export default Wave;
export default BackgroundSVG;
