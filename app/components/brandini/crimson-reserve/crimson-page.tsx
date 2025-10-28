"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { scrollToTopAndNavigate } from "@/app/utils/scroll-utils";

export default function CrimsonPage({
  onNextClick,
  onPrevClick,
}: {
  onNextClick: () => void;
  onPrevClick: () => void; 
}) {
  const handleScrollToTopAndNavigate = () => {
    scrollToTopAndNavigate(onNextClick);
  };
  const topVariants = {
    hidden: { y: "-15vh", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { y: "-15vh", opacity: 0, transition: { duration: 0.8 } },
  };

  const bottomVariants = {
    hidden: { y: "15vh", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { y: "15vh", opacity: 0, transition: { duration: 0.8 } },
  };
  const smoothTransition = {
    duration: 1.5,
    ease: [0.88, 0.01, 0.17, 0.99],
  };

  return (
    <div className=" relative flex flex-col pt-2 px-4 h-full  text-black overflow-y-auto w-full max-w-[500px] mx-auto">
      <AnimatePresence>
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]" // centered horizontally
          exit={{ x: 150, opacity: 0 }}
          initial={{ x: 150, opacity: 0 }}
          transition={smoothTransition}
        >
          <button
            className="relative cursor-pointer overflow-hidden inline-flex items-center justify-center  px-4 py-2 rounded-[56px] text-white text-[12px] font-montagu font-semibold bg-gradient-to-t border-1 border-[#582B2B] from-[#252C00] to-[#252c00d0] hover:opacity-90 transition group"
            onClick={handleScrollToTopAndNavigate}
          >
            <span className="relative flex items-center font-montagu ">
              Story
              <Image
                alt="arrow"
                className="ml-2 z-10"
                height={14}
                src="/button-image/arrow-up-right.svg"
                width={14}
              />
            </span>
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-1 flex-col items-start justify-between w-full">
        {/* Top Section */}

        <motion.div
          animate="visible"
          className="space-y-4 w-full"
          exit="exit"
          initial="hidden"
          variants={topVariants}
        >
          {/* Header */}



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
                              <h2 className="w-full text-center text-white text-[19px] font-bold leading-tight font-montagu">
                                  ALTA LANGA
                              </h2>
                            </div>

          {/* Wine Info Cards (Top Section) */}
          <div className="flex flex-col gap-4 text-[12px] font-semibold mt-6">
            <div className="flex flex-row w-full justify-between">
              <InfoCard
                half
                icon="/crimson-reserve-icons/origin.svg"
                title="ORIGIN"
                value="ITALY"
              />
              <InfoCard
                half
                icon="/crimson-reserve-icons/vintage.svg"
                title="VINTAGE"
                value="2018"
              />
            </div>
            <div className="flex flex-row w-full justify-between">
              <InfoCard
                half
                icon="/crimson-reserve-icons/region.svg"
                title="REGION"
                value="Lequio Berria"
              />
              <InfoCard
                half
                icon="/crimson-reserve-icons/variety.svg"
                title="VARIETY"
                value="Chardonnay GRAPES"
              />
            </div>
          </div>
        </motion.div>

        <div className="pb-20">
          {/* CTA Button */}

          {/* Bottom Section */}
          <motion.div
            animate="visible"
            className="flex flex-col space-y-4  w-full mt-6"
            exit="exit"
            initial="hidden"
            variants={bottomVariants}
          >
            <div className="grid grid-cols-2 gap-2 w-full">
              <InfoCard
                half
                icon="/assets/brandini/crimson-reserve-icons/alcohol.svg"
                title="ALCOHOL"
                value="-"
              />
              <InfoCard
                half
                icon="/crimson-reserve-icons/processing.svg"
                title="PROCESSING"
                value="Wooden Barrels-38 MONTHS"
              />
            </div>

            <InfoCard
              icon="/crimson-reserve-icons/winery.svg"
              title="WINERY"
              value="-"
            />
            <InfoCard
              icon="/crimson-reserve-icons/harvest.svg"
              title="HARVEST"
              value="Early September"
            />
            <InfoCard
              icon="/crimson-reserve-icons/tasting-notes.svg"
              title="TASTING NOTES"
              value="toasted hazelnuts, orange blossom, honey, freshly baked bread"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Reusable Info Card (Mobile Optimized)
function InfoCard({
  icon,
  title,
  value,
  half = false,
}: {
  icon: string;
  title: string;
  value: string;
  half?: boolean;
}) {
  return (
    <div
      className={`flex flex-row items-center ${
        half ? "w-full" : "w-full"
      } text-left`}
    >
      <div className="w-[40px] h-[40px] rounded-full border border-white flex items-center justify-center flex-shrink-0">
        <Image
          alt={title}
          className="object-contain"
          height={20}
          src={icon}
          width={20}
        />
      </div>
      <div className="flex flex-col justify-center ml-2">
        <div className="text-[10px] font-bold uppercase font-axiforma">
          {title}
        </div>
        <div className="text-[11px] font-normal uppercase text-white font-axiforma">
          {value}
        </div>
      </div>
    </div>
  );
}
