"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CrimsonPage({
  onNextClick,
  onPrevClick,
}: {
  onNextClick: () => void;
  onPrevClick: () => void;
}) {
  const topVariants = {
    hidden: { y: -15 + "vh", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { y: -15 + "vh", opacity: 0, transition: { duration: 0.8 } },
  };

  const bottomVariants = {
    hidden: { y: 15 + "vh", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { y: 15 + "vh", opacity: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="flex flex-col pt-2 h-[88%] px-4 text-black overflow-y-auto max-w-[500px] mx-auto">
      <div className="flex flex-1 flex-col  items-center justify-between">
        {/* Top Section */}
        <motion.div
          variants={topVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="space-y-4 w-full"
        >
          <div className="flex flex-row w-full pt-2 pb-2 items-center justify-center border-b border-black">
            <button onClick={onPrevClick} className="flex-shrink-0">
              <Image
                src="/button-image/white_back.svg"
                alt="Back Icon"
                height={30}
                width={30}
              />
            </button>
            <h2 className="flex-1 text-center text-[28px] font-bold">
              CRIMSON RESERVE
            </h2>
          </div>

          {/* Wine Info Cards */}
          <div className="flex flex-col gap-4 text-[12px] font-semibold mt-6">
            <div className="flex flex-row w-full justify-between">
              <InfoCard icon="/crimson-reserve-icons/origin.svg" title="ORIGIN" value="FRANCE" />
              <InfoCard icon="/crimson-reserve-icons/vintage.svg" title="VINTAGE" value="2018" />
            </div>
            <div className="flex flex-row w-full justify-between">
              <InfoCard icon="/crimson-reserve-icons/region.svg" title="REGION" value="BORDEAUX" />
              <InfoCard icon="/crimson-reserve-icons/variety.svg" title="VARIETY" value="CABERNET SAUVIGNON" />
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <div className="mt-8 w-full flex items-end justify-end">
          <button
            onClick={onNextClick}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--Text-Color,#1C1826)] text-white text-[14px] font-montagu font-medium hover:bg-gray-800 transition"
          >
            More
            <Image
              src="/button-image/arrow-up-right.svg"
              alt="arrow"
              width={14}
              height={14}
              className="ml-2"
            />
          </button>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={bottomVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col space-y-4 px-2 w-full"
        >
          <div className="flex flex-row gap-2 w-full justify-between">
            <InfoCard icon="/crimson-reserve-icons/alcohol.svg" title="ALCOHOL" value="13.5%" half />
            <InfoCard icon="/crimson-reserve-icons/processing.svg" title="PROCESSING" value="OAK BARREL AGED (18 MONTHS)" half />
          </div>

          <InfoCard icon="/crimson-reserve-icons/winery.svg" title="WINERY" value="CHÂTEAU LUMIÈRE" />
          <InfoCard icon="/crimson-reserve-icons/harvest.svg" title="HARVEST" value="SEPTEMBER – OCTOBER" />
          <InfoCard icon="/crimson-reserve-icons/tasting-notes.svg" title="TASTING NOTES" value="BLACKBERRY, VANILLA, TOBACCO" />
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Info Card
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
    <div className={`flex flex-row items-start ${half ? "w-[48%]" : "w-full"} text-left`}>
      <div className="w-[48px] h-[48px] rounded-full border border-white flex items-center justify-center flex-shrink-0">
        <Image src={icon} alt={title} width={20} height={20} className="object-contain" />
      </div>
      <div className="flex flex-col justify-center ml-3">
        <div className="text-[11px] font-bold uppercase">{title}</div>
        <div className="text-[13px] font-normal">{value}</div>
      </div>
    </div>
  );
}
