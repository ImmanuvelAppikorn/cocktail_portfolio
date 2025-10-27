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
        <div className="relative flex w-full pt-2 pb-2 items-center justify-center border-b border-black">
          <button className="absolute left-0" onClick={onPrevClick}>
            <Image
              alt="Back Icon"
              height={26}
              src="/button-image/black-back.svg"
              width={26}
            /> 
          </button>
          <h2 className="w-full text-center text-[#58660C] text-[19px] font-bold leading-tight font-montagu">
            ALTA LANGA
          </h2>
        </div>

        <div className="flex flex-row justify-start items-center w-full px-2">
          <p className="text-[16px] text-[#58660C] font-extrabold tracking-[2px] w-full pb-0 mt-3 font-montagu">
            About The Wine
          </p>
        </div>

        {/* Paragraph */}
        <p className="text-[12px] w-full font-axiforma tracking-[1px] font-medium mt-1 text-justify leading-6 pt-2 px-2">
          Our Blanc de Blancs is made exclusively from 100% Chardonnay grapes,
          carefully handpicked in early September to capture the perfect balance
          of ripeness and acidity. The grapes are gently pressed using a modern
          Alta Langa machine under controlled temperature and vacuum, ensuring
          the preservation of their natural freshness and delicate aromas. The
          wine ferments in used wooden barrels, which add subtle layers of
          flavor while maintaining the purity of the Chardonnay.
          <span>
            <button
              className="cursor-pointer font-axiforma relative overflow-hidden hover:text-[#58660C] inline-flex items-center justify-center px-[4px]  text-[#0052B4] text-[12px] font-montagu font-semibold transition group"
              onClick={handleScrollToTopAndNavigate}
            >
              Read More....
            </button>
          </span>
        </p>
      </motion.div>
    </div>
  );
}
