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
          <button
            className="absolute left-0"
                    onClick={onPrevClick}
          >
            <Image
              alt="Back Icon"
              height={26}
              src="/button-image/black-back.svg"
              width={26}
            />
          </button>
          <h2 className="w-full text-center text-[#5E7ECC] text-[19px] font-bold leading-tight font-montagu">
             VERMOUTH ROSSO
          </h2>
        </div>

        <div className="flex flex-row justify-start items-center w-full px-2">
          <p className="text-[16px] text-[#1A2042] font-extrabold tracking-[2px] w-full pb-0 mt-3 font-montagu">
            About The Wine
          </p>
        </div>

        {/* Paragraph */} 
        <p className="text-[12px] w-full font-axiforma tracking-[2] font-medium mt-1 text-justify leading-6  px-2 pt-2">
          An exceptional artisanal Vermouth from Turin, mixed with 25 botanical ingredients on a Piedmont wine base. The taste is of good structure and uses notes of vanilla, rhubarb, juniper, toasted wood and Christmas spices (cloves, cinnamon and dried orange). Extraordinarily balanced with an aftertaste of medicinal herbs. Perfect for a Negroni, Americano, Manhattan or simply served alone with ice and a slice of orange.
          <span>
            <button
              className="cursor-pointer font-axiforma relative overflow-hidden hover:text-[#5E7ECC] inline-flex items-center justify-center px-[2px]  text-[#0052B4] text-[12px] font-montagu font-semibold transition group"
              onClick={handleScrollToTopAndNavigate}
            >
              Read More...
            </button>
          </span>
        </p>
      </motion.div>
    </div>
  );
}
