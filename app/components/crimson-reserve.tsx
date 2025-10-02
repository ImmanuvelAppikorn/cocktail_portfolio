"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CrimsonReserveCard({
  onNextClick,
}: {
  onNextClick: () => void;
}) {
  const topVariants = {
    hidden: { y: -300, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { y: -300, opacity: 0, transition: { duration: 1 } },
  };

  const bottomVariants = {
    hidden: { y: 300, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1 } },
    exit: { y: 300, opacity: 0, transition: { duration: 1 } },
  };

  return (
    <div className="px-2 max-w-2xl text-white text-center h-screen overflow-hidden relative mt-8">
      {/* Top Content */}
      <motion.div
        variants={topVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-4"
      >
        <div className="mt-4 w-full py-2 px-2 flex items-center justify-center border-b border-black">
          <h2 className="text-xl font-bold">CRIMSON RESERVE</h2>
        </div>

        {/* Wine Info Cards */}
        <div className="grid grid-cols-2  gap-2 text-xs font-semibold mt-4 px-2">
          <InfoCard
            icon="/crimson-reserve-icons/origin.svg"
            title="ORIGIN"
            value="FRANCE"
          />
          <InfoCard
            icon="/crimson-reserve-icons/vintage.svg"
            title="VINTAGE"
            value="2018"
          />
          <InfoCard
            icon="/crimson-reserve-icons/region.svg"
            title="REGION"
            value="BORDEAUX"
          />
          <InfoCard
            icon="/crimson-reserve-icons/variety.svg"
            title="VARIETY"
            value="CABERNET SAUVIGNON"
          />
        </div>
      </motion.div>

      {/* Bottom Content */}
      <motion.div
        variants={bottomVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col space-y-2 text-xs mt-9 px-2 absolute top-1/2 translate-y-10 w-full"
      >
        <div className="flex flex-row gap-2 w-full">
          <InfoCard
            icon="/crimson-reserve-icons/alcohol.svg"
            title="ALCOHOL"
            value="13.5%"
            half
          />
          <InfoCard
            icon="/crimson-reserve-icons/processing.svg"
            title="PROCESSING"
            value="OAK BARREL AGED (18 MONTHS)"
            half
          />
        </div>
        <InfoCard
          icon="/crimson-reserve-icons/winery.svg"
          title="WINERY"
          value="CHÂTEAU LUMIÈRE"
        />
        <InfoCard
          icon="/crimson-reserve-icons/harvest.svg"
          title="HARVEST"
          value="SEPTEMBER – OCTOBER"
        />
        <InfoCard
          icon="/crimson-reserve-icons/tasting-notes.svg"
          title="TASTING NOTES"
          value="BLACKBERRY, VANILLA, TOBACCO"
        />
      </motion.div>




      {/* Button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[85%]">
        <button
          onClick={onNextClick}
          className="inline-flex items-center justify-center px-3 py-2 rounded-full w-full bg-[var(--Text-Color,#1C1826)] text-white text-[10px] font-montagu font-medium hover:bg-gray-800 transition"
        >
          Go to story page
          <Image
            src="/button-image/arrow-up-right.svg"
            alt="arrow"
            width={10}
            height={10}
            className="ml-1"
          />
        </button>
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
    <div
      className={`flex flex-row items-start ${
        half ? "w-[48%]" : "w-full"
      } text-left`}
    >
      <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center flex-shrink-0">
        <Image
          src={icon}
          alt={title}
          width={14}
          height={14}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-center ml-2">
        <div className="text-black font-bold text-[9px] uppercase">
          {title}
        </div>
        <div className="text-[11px] font-normal">{value}</div>
      </div>
    </div>
  );
}
