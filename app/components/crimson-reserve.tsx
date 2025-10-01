"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CrimsonReserveCard() {
  const [clicked, setClicked] = useState(true);

  const topVariants = {
    hidden: { y: -400, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.2 } },
  };

  const bottomVariants = {
    hidden: { y: 400, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.2 } },
  };

  return (
    <div className="px-4  max-w-4xl text-white text-center h-screen overflow-hidden ">
      {clicked && (
        <div className="relative h-full">
          {/* Top Content */}
          <motion.div
            variants={topVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Header */}
            <div className="mt-6 w-full py-[14px] px-[10px] flex items-center justify-between border-b border-black">
              <h2 className="text-3xl font-bold">CRIMSON RESERVE</h2>
              <div className="w-[45px] h-[45px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Image
                  src="/button-image/next-button.svg"
                  alt="Logo"
                  width={15}
                  height={13}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Wine Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 space-y-4 text-sm font-semibold mt-14 px-4">
              {/* ORIGIN */}
              <InfoCard icon="/crimson-reserve-icons/origin.svg" title="ORIGIN" value="FRANCE" />
              {/* VINTAGE */}
              <InfoCard icon="/crimson-reserve-icons/vintage.svg" title="VINTAGE" value="2018" />
              {/* REGION */}
              <InfoCard icon="/crimson-reserve-icons/region.svg" title="REGION" value="BORDEAUX" />
              {/* VARIETY */}
              <InfoCard icon="/crimson-reserve-icons/variety.svg" title="VARIETY" value="CABERNET SAUVIGNON" />
            </div>
          </motion.div>

          {/* Bottom Content */}
          <motion.div
            variants={bottomVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-4 text-sm font-semibold mt-10 px-4 absolute bottom-0 mb-14 w-full"
          >
            {/* Top Row - ALCOHOL & PROCESSING */}
            <div className="flex flex-row gap-1 w-full">
              <InfoCard icon="/crimson-reserve-icons/alcohol.svg" title="ALCOHOL" value="13.5%" half />
              <InfoCard icon="/crimson-reserve-icons/processing.svg" title="PROCESSING" value="OAK BARREL AGED (18 MONTHS)" half />
            </div>

            {/* Column Items */}
            <InfoCard icon="/crimson-reserve-icons/winery.svg" title="WINERY" value="CHÂTEAU LUMIÈRE" />
            <InfoCard icon="/crimson-reserve-icons/harvest.svg" title="HARVEST" value="SEPTEMBER – OCTOBER" />
            <InfoCard icon="/crimson-reserve-icons/tasting-notes.svg" title="TASTING NOTES" value="BLACKBERRY, VANILLA, TOBACCO" />
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Reusable Card Component
function InfoCard({ icon, title, value, half = false }: { icon: string; title: string; value: string; half?: boolean }) {
  return (
    <div className={`flex flex-row items-start ${half ? "w-[48%]" : "w-full"}`}>
      <div className="w-[45px] h-[45px] rounded-full border border-white flex items-center justify-center flex-shrink-0">
        <Image src={icon} alt={title} width={20} height={20} className="object-contain" />
      </div>
      <div className="flex flex-col justify-center ml-2 text-left">
        <div className="text-black font-extrabold font-axiforma text-[11px] uppercase">{title}</div>
        <div className="text-[13px] font-normal">{value}</div>
      </div>
    </div>
  );
}
