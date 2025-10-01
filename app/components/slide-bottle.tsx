"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bottles = [
  {
    id: 1,
    name: "Blossom Rose",
    price: 179,
    img: "/vinea/Rose.svg",
    color: "#EB235C", // rose pink
  },
  {
    id: 2,
    name: "Verdant Grove",
    price: 189,
    img: "/vinea/Green.svg",
    color: "#22C55E", // green
  },
  {
    id: 3,
    name: "Purple Malbe",
    price: 149,
    img: "/vinea/Purple.svg",
    color: "#9333EA", // purple
  },
  {
    id: 4,
    name: "Golden Chard",
    price: 129,
    img: "/vinea/Gold.svg",
    color: "#EAB308", // gold yellow
  },
  {
    id: 5,
    name: "Scarlet Merlot",
    price: 149,
    img: "/vinea/Red.svg",
    color: "#DC2626", // red
  },
];

export default function BottleCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // track direction for left/right anim

  const nextBottle = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % bottles.length);
  };
  const prevBottle = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + bottles.length) % bottles.length);
  };

  const activeBottle = bottles[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Navigation buttons */}
      <div className="flex flex-col items-center justify-between w-full max-w-sm px-6 z-20">
        <div className="flex items-center justify-between w-full absolute bottom-90 px-8">
        {/* Left button */}
        <button onClick={prevBottle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="49"
            viewBox="0 0 25 29"
            fill="none"
          >
            <path
              d="M22.7311 0.0612061C23.9016 0.0150191 24.874 0.952818 24.874 2.12421V26.8727C24.874 28.4743 23.1263 29.4666 21.7529 28.6426L1.1266 16.2684C-0.210433 15.4663 -0.210433 13.5306 1.1266 12.7285L21.7529 0.35429C22.0494 0.176363 22.3856 0.0748284 22.7311 0.0612061Z"
              fill={activeBottle.color}
            />
          </svg>
        </button>

        {/* Text animation */}
        <div className="flex flex-col items-center justify-center min-w-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBottle.id + "-text"}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h2
                className="font-bold text-2xl mb-1 font-axiforma"
                style={{ color: activeBottle.color }}
              >
                ${activeBottle.price}
              </h2>
              <h3 className="text-xl font-axiforma mb-4">
                {activeBottle.name}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right button */}
        <button onClick={nextBottle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="49"
            viewBox="0 0 25 29"
            fill="none"
          >
            <path
              d="M2.26892 0.0612061C1.09842 0.0150191 0.125977 0.952818 0.125977 2.12421V26.8727C0.125977 28.4743 1.87369 29.4666 3.24713 28.6426L23.8734 16.2684C25.2104 15.4663 25.2104 13.5306 23.8734 12.7285L3.24713 0.35429C2.95062 0.176363 2.61442 0.0748284 2.26892 0.0612061Z"
              fill={activeBottle.color}
            />
          </svg>
        </button>
        </div>


        {/* Bottle animation */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-20 w-full flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={activeBottle.id + "-img"}
            src={activeBottle.img}
            alt={activeBottle.name}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 120 : -120, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 1, x: direction > 0 ? -120 : 120, y: 40, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-[288px] object-contain drop-shadow-xl"
          />
        </AnimatePresence>
      </div>
      </div>

      
    </div>
  );
}
