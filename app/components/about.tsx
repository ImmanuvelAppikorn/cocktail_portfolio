"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About({ onNextClick }: { onNextClick?: () => void }) {
  return (
    <div className="relative w-full h-screen overflow-hidden px-3 mt-14 flex flex-col items-center">
      {/* Heading */}
      <div className="text-[20px] font-montagu font-extrabold py-2 border-b w-full text-center">
        ABOUT THE WINE
      </div>

      {/* Paragraph */}
      <p className="text-[11px] font-axiforma tracking-[1px] leading-[18px] font-medium mt-6 w-full text-left">
        "Sourced from the mineral-rich soil along the Bhadra River Belt, our
        house espresso is a single-origin specialty Robusta coffee from India,
        considered among the finest in the world. This Robusta is graded as
        'Kaapi Royale,' the highest grade of Indian Robusta. When presented in a
        milk-based drink, it features notes of hazelnut and dark chocolate, with
        an extra caffeine hit unique to Robusta."
      </p>

      {/* Button */}
      {onNextClick && (
        <button
          onClick={onNextClick}
          className="absolute right-3 top-1/2 -translate-y-20 inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--Text-Color,#1C1826)] text-white text-[11px] font-montagu font-semibold hover:bg-gray-800 transition"
        >
          Go to Reviews
          <Image
            src="/button-image/arrow-up-right.svg"
            alt="arrow"
            width={11}
            height={11}
            className="ml-1"
          />
        </button>
      )}
    </div>
  );
}
