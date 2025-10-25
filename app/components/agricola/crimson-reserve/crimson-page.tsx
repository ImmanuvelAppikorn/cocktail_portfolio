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
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]" // centered horizontally
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 150, opacity: 0 }}
          transition={smoothTransition}
        >
          <button
            onClick={handleScrollToTopAndNavigate}
            className="relative cursor-pointer overflow-hidden inline-flex items-center justify-center  px-4 py-2 rounded-[56px] text-white text-[12px] font-montagu font-semibold bg-gradient-to-t border-1 border-[#DCBC7F] from-[#dcbb7f9b] to-[#443A3B] hover:opacity-90 transition group"
          >
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
      </AnimatePresence>

      <div className="flex flex-1 flex-col items-center justify-between w-full">
        {/* Top Section */}

        <motion.div
          variants={topVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-4 w-full"
        >
          {/* Header */}
          <div className="flex flex-row w-full pt-2 pb-2 items-center justify-center border-b border-black">
            <button onClick={onPrevClick} className="flex-shrink-0 cursor-pointer hover:bg-black/10 rounded-full">
              <Image
                src="/button-image/white_back.svg"
                alt="Back Icon"
                height={28}
                width={28}
              />
            </button>
            <h2 className="flex-1 text-center text-white text-[19px] font-bold leading-tight font-montagu">
              CLÀSIC
            </h2>
          </div>

          {/* Wine Info Cards (Top Section) */}
          <div className="flex flex-col gap-4 text-[12px] font-semibold mt-6">
            <div className="flex flex-row w-full justify-between">
              <InfoCard
                icon="/crimson-reserve-icons/origin.svg"
                title="ORIGIN"
                value="ITALY"
                half
              />
              <InfoCard
                icon="/crimson-reserve-icons/vintage.svg"
                title="VINTAGE"
                value="-"
                half
              />
            </div>
            <div className="flex flex-row w-full justify-between">
              <InfoCard
                icon="/crimson-reserve-icons/region.svg"
                title="REGION"
                value="CASTAGNOLE MONF., ASTI"
                half
              />
              <InfoCard
                icon="/crimson-reserve-icons/variety.svg"
                title="VARIETY"
                value="RUCHE"
                half
              />
            </div>
          </div>
        </motion.div>

        <div className="pb-22">
          {/* CTA Button */}

          {/* Bottom Section */}
          <motion.div
            variants={bottomVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col space-y-4 px-1 w-full mt-6"
          >
            <div className="grid grid-cols-2 gap-2 w-full">
              <InfoCard
                icon="assets/agricola/crimson-reserve-icons/alcohol.svg"
                title="ALCOHOL"
                value="13.5%"
                half
              />
              <InfoCard
                icon="/crimson-reserve-icons/processing.svg"
                title="PROCESSING"
                value="REFINED IN BOTTLE (3MO)"
                half
              />
            </div>

            <InfoCard
              icon="/crimson-reserve-icons/winery.svg"
              title="WINERY"
              value="FERRARIS AGRICOLA"
            />
            <InfoCard
              icon="/crimson-reserve-icons/harvest.svg"
              title="HARVEST"
              value="SEPTEMBER – OCTOBER"
            />
            <InfoCard
              icon="/crimson-reserve-icons/tasting-notes.svg"
              title="TASTING NOTES"
              value="FRESH,LIGHT TANNIN,FRESHLY PICKED CHERRIES"
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
          src={icon}
          alt={title}
          width={20}
          height={20}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-center ml-3">
        <div className="text-[10px] font-bold uppercase font-axiforma">
          {title}
        </div>
        <div className="text-[10px] font-normal text-white font-axiforma">
          {value}
        </div>
      </div>
    </div>
  );
}
