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
      className="relative pt-2 px-4 w-full h-screen overflow-hidden  flex flex-col items-center max-h-screen max-w-[500px] mx-auto"
      style={{ touchAction: "none", overscrollBehavior: "none" }}
    >
      {/* Heading */}
      <motion.div
        animate="visible"
        exit="exit"
        initial="hidden"
        variants={topVariants}
      >
        <div className="flex flex-row w-full pt-2 pb-2 items-center justify-center border-b border-black">
          <button
            onClick={onPrevClick}
            className="flex-shrink-0 cursor-pointer"
          >
            <Image
              src="/button-image/black-back.svg"
              alt="Back Icon"
              height={26}
              width={26}
            />
          </button>
          <h2 className="flex-1 text-center text-[#58660C] text-[19px] font-bold leading-tight font-montagu">
            ALTA LANGA
          </h2>
        </div>

        <div className="flex flex-row justify-start items-center w-full px-2">
          <p className="text-[16px] text-[#58660C] font-extrabold tracking-[2px] w-full pb-0 mt-6 font-montagu">
            About The Wine
          </p>
        </div>

        {/* Paragraph */}
        <p className="text-[12px] w-full font-axiforma tracking-[1px] font-medium mt-1 text-justify leading-6 pt-2 px-2">
          Our Blanc de Blancs is made from 100% Chardonnay grapes harvested in
          early September. The grapes are gently pressed in a state-of-the-art
          Alta Langa machine under controlled temperature and vacuum to preserve
          freshness and aromas. Fermentation occurs in used wooden barrels until
          tirage in late spring. After 38 months “sur-lie,” the wine is
          disgorged and ready to taste.
          <span>
            <button
              onClick={handleScrollToTopAndNavigate}
              className="cursor-pointer font-axiforma relative overflow-hidden hover:text-[#58660C] inline-flex items-center justify-center px-[4px]  text-[#787878] text-[12px] font-montagu font-semibold transition group"
            >
              View More....
            </button>
          </span>
        </p>
      </motion.div>
    </div>
  );
}
