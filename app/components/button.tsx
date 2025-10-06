"use client";
import { motion } from "framer-motion";

export default function SlideToggle({
  selected,
  setSelected,
  color = "#EB235C", // default color if not provided
}: {
  selected: "story" | "nutrition";
  setSelected: (tab: "story" | "nutrition") => void;
  color?: string;
}) {
  return (
    <div className="relative bg-white/40 border-white/50 rounded-[6px] px-[1px] flex items-center select-none w-full py-[2px] cursor-pointer">
      {/* Animated slider */}
      <motion.div
        layout
        animate={{ x: selected === "story" ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        className="absolute top-[2px] h-[30px] w-[49.7%] rounded-[6px] p"
        style={{ backgroundColor: color }}
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
