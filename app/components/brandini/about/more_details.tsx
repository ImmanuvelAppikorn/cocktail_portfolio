"use client";

import React from "react";
import Image from "next/image";

interface MoreDetailsProps {
  onPrevClick: () => void;
}

const MoreDetails = ({ onPrevClick }: MoreDetailsProps) => {
  return (
    <div
      className="pt-2 px-4 flex flex-col items-center max-h-screen max-w-[500px] mx-auto overflow-hidden"
      style={{ touchAction: "none", overscrollBehavior: "none" }}
    >
      {/* Title */}

      <div className="flex flex-row w-full pt-2 pb-2 items-center justify-center border-b border-black">
        <button className="flex-shrink-0 cursor-pointer" onClick={onPrevClick}>
          <Image
            alt="Back Icon"
            height={26}
            src="/button-image/black-back.svg"
            width={26}
          />
        </button>
        <h2 className="flex-1 text-center text-[#58660C] text-[19px] font-bold leading-tight font-montagu">
          ALTA LANGA
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="w-full px-2 mt-1 overflow-y-scroll no-scrollbar">
        <p className="text-[16px] text-[#58660C] font-extrabold tracking-[2px] w-full pb-0 mt-3 font-montagu">
          About The Wine
        </p>

        <p className="text-[12px] w-full font-axiforma tracking-[1px] font-medium mt-1 leading-7  pr-2 pt-2 text-justify">
          Alta Langa Brut Blanc de Blancs 655 is a premium sparkling wine made
          entirely from 100% Chardonnay grapes sourced from Lequio Berria at 655
          meters above sea level. Harvested at the start of September, the
          grapes are gently pressed under vacuum in a state-of-the-art press to
          preserve freshness and aromatic intensity while avoiding oxidation.
          <br />
          Fermentation takes place in used wooden barrels, where the wine
          remains until tirage, carried out at the end of spring. The wine then
          ages 38 months sur-lie before disgorgement, resulting in a refined and
          elegant sparkling wine. On the nose, it reveals fine aromas of citrus
          peel, toasted hazelnuts, orange blossom, honey, freshly baked bread,
          and a subtle saline note reminiscent of a sea breeze. The palate is
          structured and crisp, with a delicate mousse that fills the mouth
          horizontally and finishes dry, fresh, and persistent. Its golden
          yellow color and fine perlage complete the experience, making it an
          exceptional representation of the Alta Langa terroir.
        </p>
      </div>
    </div>
  );
};

export default MoreDetails;
