"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface AboutPageProps {
  onNextClick: () => void;
  onPrevClick: () => void;
}

export default function AboutPage({
  onNextClick,
  onPrevClick,
}: AboutPageProps) {
  // Scroll to top and navigate helper
  const scrollToTopAndNavigate = (callback: () => void) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => callback(), 150);
  };

  const smoothTransition = {
    duration: 1.5,
    ease: [0.88, 0.01, 0.17, 0.99],
  };

  const handleScrollToTopAndNavigate = () => {
    scrollToTopAndNavigate(onNextClick);
  };

  const topVariants = {
    hidden: { y: "-25vh", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { y: "-15vh", opacity: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden mt-[5px] flex flex-col items-center max-h-screen max-w-[500px] mx-auto"
      style={{ touchAction: "none", overscrollBehavior: "none" }}
    >
      {/* Heading */}
      <motion.div
        animate="visible"
        exit="exit"
        initial="hidden"
        variants={topVariants}
      >
        <div className="relative border-b border-black w-[95%] mx-auto flex items-center py-2">
          <button onClick={onPrevClick} className="flex-shrink-0">
            <Image
              src="/button-image/black-back.svg"
              alt="Back Icon"
              height={28}
              width={28}
            />
          </button>

          <p className="absolute left-1/2 -translate-x-1/2 text-[#EB235C] text-[24px] font-bold text-center pb-1 font-montagu whitespace-nowrap">
            CRIMSON RESERVE
          </p>
        </div>

        <div className="flex flex-row justify-start items-center w-full px-4">
          <p className="text-[16px] text-[#EB235C] font-extrabold tracking-[2px] w-full pb-0 mt-6 font-montagu">
            About The Wine
          </p>
        </div>

        {/* Paragraph */}
        <p className="text-[12px] w-[95%] font-axiforma tracking-[1px] font-medium mt-1 leading-7 text-left px-5 pt-2">
          Sourced from the mineral-rich soil along the Bhadra River Belt, our
          house espresso is a single-origin specialty Robusta coffee from India,
          considered among the finest in the world. This Robusta is graded as
          'Kaapi Royale,' the highest grade of Indian Robusta. When presented in
          a milk-based drink, it features notes of hazelnut and dark chocolate,
          with an extra caffeine hit unique to Robusta.
        </p>
      </motion.div>
      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50" // centered horizontally
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 150, opacity: 0 }}
        transition={smoothTransition}
      >
        <button
          onClick={handleScrollToTopAndNavigate}
          className="relative overflow-hidden inline-flex items-center justify-center px-[14px] py-[9px] rounded-[56px] bg-[var(--Text-Color,#1C1826)] text-white text-[11px] font-montagu font-semibold hover:bg-gray-800 transition group"
        >
          <span className="absolute w-30 h-30 bg-[#EB235C] rounded-full -top-20 -left-32 transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:-bottom-20 group-hover:-left-11"></span>

          <span className="relative flex items-center font-montagu">
            More
            <Image
              src="/button-image/arrow-up-right.svg"
              alt="arrow"
              width={14}
              height={14}
              className="ml-2 z-10"
            />
          </span>
        </button>
      </motion.div>
    </div>
  );
}
