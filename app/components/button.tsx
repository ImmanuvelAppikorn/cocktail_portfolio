"use client";
import { motion } from "framer-motion";

export default function SlideToggle({
  selected,
  setSelected,
}: {
  selected: "story" | "nutrition";
  setSelected: (tab: "story" | "nutrition") => void;
}) {
  return (
    <div className="relative bg-pink-100 rounded-[6px] flex items-center select-none w-full py-[2px] px-[2px] cursor-pointer">
      {/* Animated pink slider */}
      <motion.div
        layout
        animate={{ x: selected === "story" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-[2px] h-[32px] w-1/2 rounded-[6px] bg-[#EB235C] border-x-4 border-pink-100"
      />

      {/* Tab Options */}
      <div className="relative z-10 flex w-full text-[15px] font-axiforma font-semibold">
        <div
          className={`w-1/2 text-center py-1 transition-colors duration-300 ${
            selected === "story" ? "text-white" : "text-gray-800"
          }`}
          onClick={() => setSelected("story")}
        >
          Story
        </div>
        <div
          className={`w-1/2 text-center py-1 transition-colors duration-300 ${
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
