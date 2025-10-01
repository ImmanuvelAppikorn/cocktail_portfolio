"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SlideToggle() {
  const [selected, setSelected] = useState<"story" | "nutrition">("story");

  return (
    <div className="relative bg-[hsl(343,70%,90%)] rounded-[6px] p-1 flex items-center cursor-pointer select-none w-full py-1">
      {/* Animated slider */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 left-1 h-[42px] w-1/2 rounded-[6px] bg-[hsl(343,83%,53%)]"
        style={{
          transform: selected === "story" ? "translateX(0%)" : "translateX(100%)",
        }}
      />

      {/* Options */}
      <div className="relative z-10 flex w-full text-[17px] font-axiforma font-semibold">
        <div
          className={`w-1/2 text-center py-2 transition-colors duration-300 ${
            selected === "story" ? "text-white" : "text-gray-800"
          }`}
          onClick={() => setSelected("story")}
        >
          Story
        </div>
        <div
          className={`w-1/2 text-center py-2 transition-colors duration-300 ${
            selected === "nutrition" ? "text-white" : "text-gray-800"
          }`}
          onClick={() => setSelected("nutrition")}
        >
          Nutrition
        </div>
      </div>
    </div>
  );
}
