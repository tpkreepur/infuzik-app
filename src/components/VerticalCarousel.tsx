'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

const slides = [
  <div
    key="slide1"
    className="bg-red-300 h-full flex items-center justify-center"
  >
    Slide 1
  </div>,
  <div
    key="slide2"
    className="bg-green-300 h-full flex items-center justify-center"
  >
    Slide 2
  </div>,
  <div
    key="slide3"
    className="bg-blue-300 h-full flex items-center justify-center"
  >
    Slide 3
  </div>,
];

export default function VerticalCarousel() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[300px] overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlideIndex}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
          }}
          className="absolute w-full h-full"
        >
          {slides[currentSlideIndex]}
        </motion.div>
      </AnimatePresence>
      <button
        onClick={nextSlide}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded"
      >
        Next
      </button>
    </div>
  );
}
