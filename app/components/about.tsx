"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About({
  onNextClick,
  onPrevClick,
}: {
  onNextClick?: () => void;
  onPrevClick?: () => void;
}) {
  return (
    <div className="relative w-full h-screen overflow-hidden px-3 mt-14 flex flex-col items-center">
      {/* Heading */}
      <div className="flex flex-row justify-start items-center w-full">
        <button onClick={onPrevClick}>
          <Image
            src="/button-image/back.svg"
            alt="Back Icon"
            height={30}
            width={30}
          />
        </button>

        <div className="text-[20px] font-montagu font-extrabold py-2 w-full text-center">
          ABOUT THE WINE
        </div>
      </div>

      {/* Paragraph */}
      <p className="text-[14px] font-axiforma tracking-[1px] leading-[18px] font-medium mt-6 w-full text-left px-3">
        "Sourced from the mineral-rich soil along the Bhadra River Belt, our
        house espresso is a single-origin specialty Robusta coffee from India,
        considered among the finest in the world. This Robusta is graded as
        'Kaapi Royale,' the highest grade of Indian Robusta. When presented in a
        milk-based drink, it features notes of hazelnut and dark chocolate, with
        an extra caffeine hit unique to Robusta."
      </p>
      <div className="absolute right-3 top-1/2 -translate-y-20">
        {onNextClick && (
          <button
            onClick={onNextClick}
            className="relative overflow-hidden inline-flex items-center justify-center px-[14px] py-[9px] rounded-[56px] bg-[var(--Text-Color,#1C1826)] text-white text-[11px] font-montagu font-semibold hover:bg-gray-800 transition group  "
          >
            {/* Expanding Circle */}
            <span className="absolute w-40 h-40 bg-pink-500 rounded-full -bottom-20 -left-90 transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:-bottom-20 group-hover:-left-14" />

            <span className="relative flex items-center">
              Go to Reviews
              <Image
                src="/button-image/arrow-up-right.svg"
                alt="arrow"
                width={12}
                height={12}
                className="ml-1"
              />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
