"use client";
import React, { useState } from "react";

const ToggleButton = () => {
  const [selected, setSelected] = useState("Nutrition");

  return (
    <div className="flex h-[38px] w-[405px] bg-pink-100 rounded-full mx-auto">
      {/* Story */}
      <div
        className={`flex-1 flex items-center justify-center cursor-pointer rounded-full transition-colors duration-200 ${
          selected === "Story" ? "bg-pink-500 text-white py-2" : "text-black"
        }`}
        onClick={() => setSelected("Story")}
      >
        <p className="font-semibold text-[14px]">Story</p>
      </div>

      {/* Nutrition */}
      <div
        className={`flex-1 flex items-center justify-center cursor-pointer rounded-full transition-colors duration-200 ${
          selected === "Nutrition"
            ? "bg-pink-500 text-white py-2"
            : "text-black"
        }`}
        onClick={() => setSelected("Nutrition")}
      >
        <p className="font-semibold text-[14px]">Nutrition</p>
      </div>
    </div>
  );
};

export default ToggleButton;
