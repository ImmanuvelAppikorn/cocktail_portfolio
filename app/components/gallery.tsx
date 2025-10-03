"use client";

import { motion } from "framer-motion";

export default function CircularText() {
  return (
    <div className="relative flex items-center justify-center w-[115px] h-[115px] mt-4 ml-2">
      {/* Center Circle */}
      <div className="absolute w-[62px] h-[62px] rounded-full bg-[#EB235C] z-10"></div>

      {/* Circular Text Ring */}
      <motion.svg
        viewBox="0 0 300 300"
        className="absolute w-[90px] h-[90px]"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      >
        <defs>
          {/* Circle path that acts as border for text */}
          <path
            id="circlePath"
            d="M 150, 150
               m -125, 0
               a 125,125 0 1,1 250,0
               a 125,125 0 1,1 -250,0"
          />
        </defs>
        <text
          fill="black"
          fontSize="40"
          fontWeight="bold"
          letterSpacing="9px"
          fontFamily="montagu"
        >
          <textPath href="#circlePath" startOffset="0%">
            • Click to Open the Gallery
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
}
