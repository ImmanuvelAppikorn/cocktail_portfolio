"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About({ onNextClick }: { onNextClick?: () => void }) {
  return (
    <div className="relative w-full h-screen overflow-hidden px-4 mt-12">
      <div className="text-[26px] font-montagu font-extrabold px-auto py-2 border-b-2 text-center w-full mt-6">
        ABOUT THE WINE
      </div>

      <p className="text-[12px] font-axiforma tracking-[1.5px] leading-[24px] font-bold mt-8 w-[80%]">
        "Sourced From The Mineral-Rich Soil Along The Bhadra River Belt, Our
        House Espresso Is A Single-Origin Specialty Robusta Coffee From India,
        Considered Among The Finest In The World. This Robusta Is Graded As
        'Kaapi Royale,' The Highest Grade Of Indian Robusta Possible When
        Presented In A Milk-Based Drink, It Features Notes Of Hazelnut And Dark
        Chocolate, With An Extra Caffeine Hit Unique To Robusta."
      </p>

      {onNextClick && (
        <button
          onClick={onNextClick}
          className="absolute right-4 mt-6 inline-flex items-center justify-center px-[18px] py-[13px] rounded-[56px] bg-[var(--Text-Color,#1C1826)] text-white text-[11px] font-montagu font-semibold hover:bg-gray-800 transition"
        >
          Go to Reviews
          <Image
            src="/button-image/arrow-up-right.svg"
            alt="arrow"
            width={12}
            height={12}
            className="ml-1"
          />
        </button>
      )}
    </div>
  );
}
