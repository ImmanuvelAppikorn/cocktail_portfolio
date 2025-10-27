"use client";

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
            className="relative cursor-pointer overflow-hidden inline-flex items-center justify-center  px-4 py-2 rounded-[56px] text-white text-[12px] font-montagu font-semibold bg-gradient-to-t border-1 border-[#826026] bg-[linear-gradient(to_top,_#D8CCB4_100%,_#D8CCB4_36%)] hover:opacity-90 transition group"
            onClick={handleScrollToTopAndNavigate}
          >
            <span className="relative flex items-center font-montagu text-[#BF062F]">
              Story
              <Image
                alt="arrow"
                className="ml-2 z-10"
                height={14}
                src="/assets/scapra/button-image/arrow-up-right.svg"
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
                                            LA BOGLIONA
                                        </h2>
                                      </div>

          {/* Wine Info Cards (Top Section) */}
          <div className="flex flex-col gap-4 text-[12px] font-semibold mt-6">
            <div className="flex flex-row w-full justify-between">
              <InfoCard
                half
                icon="/assets/scapra/crimson-reserve-icons/origin.svg"
                title="ORIGIN"
                value="ITALY"
              />
              <InfoCard
                half
                icon="/assets/scapra/crimson-reserve-icons/vintage.svg"
                title="VINTAGE"
                value="2020"
              />
            </div>
            <div className="flex flex-row w-full justify-between">
              <InfoCard
                half
                icon="/assets/scapra/crimson-reserve-icons/region.svg"
                title="REGION"
                value="Acqui Terme, Piedmont"
              />
              <InfoCard
                half
                icon="/assets/scapra/crimson-reserve-icons/variety.svg"
                title="VARIETY"
                value="Barbera"
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
                icon="/assets/scapra/crimson-reserve-icons/alcohol.svg"
                title="ALCOHOL"
                value="14.5%"
              />
              <InfoCard
                half
                icon="/assets/scapra/crimson-reserve-icons/processing.svg"
                title="PROCESSING"
                value="French Allier oak barrels AGED (32mo)"
              />
            </div>

            <InfoCard
              icon="/assets/scapra/crimson-reserve-icons/winery.svg"
              title="WINERY"
              value="Scarpa"
            />
            <InfoCard
              icon="/assets/scapra/crimson-reserve-icons/harvest.svg"
              title="HARVEST"
              value="Late September – October"
            />
            <InfoCard
              icon="/assets/scapra/crimson-reserve-icons/tasting-notes.svg"
              title="TASTING NOTES"
              value="Blackberry, plum, cherry,spice"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Reusable Info Card (Mobile Optimized)
import Image from "next/image";

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
      className={`grid grid-cols-[auto_1fr] gap-2 items-start ${
        half ? "w-full" : "w-full"
      } text-left`}
    >
      {/* Icon Section */}
      <div className="w-[40px] h-[40px] rounded-full border border-[#1E1F1E] flex items-center justify-center">
        <Image
          alt={title}
          className="object-contain"
          height={20}
          src={icon}
          width={20}
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center">
        <div className="text-[10px] text-[#BF062F] font-bold uppercase font-axiforma">
          {title}
        </div>
        <div className="text-[10px] font-normal text-black font-axiforma uppercase">
          {value}
        </div>
      </div>
    </div>
  );
}
