"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bottles = [
  {
    id: 1,
    name: "Blossom Rose",
    price: 179,
    img: "/vinea/Rose.svg",
    color: "#EB235C",
  },
  {
    id: 2,
    name: "Verdant Grove",
    price: 189,
    img: "/vinea/Green.svg",
    color: "#22C55E",
  },
  {
    id: 3,
    name: "Purple Malbe",
    price: 149,
    img: "/vinea/Purple.svg",
    color: "#9333EA",
  },
  {
    id: 4,
    name: "Golden Chard",
    price: 129,
    img: "/vinea/Gold.svg",
    color: "#EAB308",
  },
  {
    id: 5,
    name: "Scarlet Merlot",
    price: 149,
    img: "/vinea/Red.svg",
    color: "#DC2626",
  },
];

export default function BottleCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextBottle = () => {
    const newIndex = (index + 1) % bottles.length;

    setDirection(1);
    setIndex(newIndex);
  };

  const prevBottle = () => {
    const newIndex = (index - 1 + bottles.length) % bottles.length;

    setDirection(-1);
    setIndex(newIndex);
  };

  const activeBottle = bottles[index];

  return (
    <div>
      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
        {/* Navigation + Text */}
        <div className="absolute top-0 w-[80%] flex items-center justify-center mb-4 ">
          {/* Prev Button */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 z-20">
            <button onClick={prevBottle}>
              <svg
                fill="none"
                height="26"
                viewBox="0 0 25 29"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7311 0.0612061C23.9016 0.0150191 24.874 0.952818 24.874 2.12421V26.8727C24.874 28.4743 23.1263 29.4666 21.7529 28.6426L1.1266 16.2684C-0.210433 15.4663 -0.210433 13.5306 1.1266 12.7285L21.7529 0.35429C22.0494 0.176363 22.3856 0.0748284 22.7311 0.0612061Z"
                  fill={activeBottle.color}
                />
              </svg>
            </button>
          </div>

          {/* Text Info */}
          <div className="relative w-full h-full flex items-center justify-center z-10 ">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBottle.id + "-text"}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex flex-col items-center"
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                initial={{ opacity: 0, y: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h3 className="text-[18px] font-bold text-black font-montagu">
                  {activeBottle.name}
                </h3>
                <h2
                  className="font-bold text-[27px] font-montagu"
                  style={{ color: activeBottle.color }}
                >
                  ${activeBottle.price}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 z-20">
            <button onClick={nextBottle}>
              <svg
                fill="none"
                height="26"
                viewBox="0 0 25 29"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.26892 0.0612061C1.09842 0.0150191 0.125977 0.952818 0.125977 4.12421V26.8727C0.125977 28.4743 1.87369 29.4666 3.24713 28.6426L23.8734 16.2684C25.2104 15.4663 25.2104 13.5306 23.8734 12.7285L3.24713 0.35429C2.95062 0.176363 2.61442 0.0748284 2.26892 0.0612061Z"
                  fill={activeBottle.color}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottle + Fixed Circles */}
        <div className="relative top-23 w-full">
          {/* Bottle */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={activeBottle.id}
              alt={activeBottle.name}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              className="h-[35%] object-contain drop-shadow-xl z-10 absolute -top-8 left-1/2 -translate-x-1/2"
              custom={direction}
              exit={{ opacity: 0, x: direction > 0 ? 120 : -120, scale: 0.8 }}
              initial={{
                opacity: 0,
                x: direction > 0 ? -120 : 120,
                scale: 0.8,
              }}
              src={activeBottle.img}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </AnimatePresence>
        <div className="relative top-2 w-full h-[600px] flex items-center justify-center overflow-visible max-w-[500px]">
          {/* Outer Circle (border) */}
          <motion.div
            animate={{
              borderColor: activeBottle.color,
              scale: [0.95, 1, 0.95],
            }}
            className="absolute w-[130%] aspect-square p-5 rounded-full border flex items-center justify-center"
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Inner Circle (filled) */}
            <motion.div
              animate={{ backgroundColor: activeBottle.color }}
              className="w-full h-full  rounded-full"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.div>

          
        </div>
        </div>

      </div>
    </div>
  );
}
