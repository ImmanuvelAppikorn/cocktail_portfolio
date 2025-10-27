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



  <div className="relative flex w-full pt-2 pb-2 items-center justify-center border-b border-black">
  <button
    className="absolute left-0"
            onClick={onPrevClick}>
  
    <Image
      alt="Back Icon"
      height={26}
      src="/button-image/black-back.svg"
      width={26}
    />
  </button>
  <h2 className="w-full text-center text-[#443A3B] text-[19px] font-bold leading-tight font-montagu">
    CLÀSIC
  </h2>
</div>


      {/* Scrollable content */}
      <div className="w-full  mt-1 overflow-y-scroll no-scrollbar">
        <p className="text-[16px] text-[#443A3B] font-extrabold tracking-[2px] w-full pb-0 mt-3 font-montagu ">
          About The Wine
        </p>

        <p className="text-[12px] w-full font-axiforma tracking-[1px] font-medium  leading-7  pt-2 text-justify">
          Made entirely from 100% Ruchè grapes, Sant’Eufemia expresses the most
          straightforward and genuine soul of this unique Piedmontese variety.
          Sourced from vineyards in Castagnole Monferrato (Asti), situated at an
          altitude of 260 meters on mixed limestone, clay, and marl soils, the
          vines are trained using the single Guyot system and range between 5
          and 10 years of age.
          <br />
          The wine undergoes alcoholic fermentation in stainless steel for 10 to
          15 days at a controlled temperature, followed by malolactic
          fermentation and aging in stainless steel tanks, preserving its
          freshness and primary fruit character. After a brief three-month
          refinement in the bottle, Sant’Eufemia is released to showcase its
          bright and authentic personality.
          <br />
          In the glass, it presents a ruby red color with lively purple
          reflections. The bouquet is intense and floral, with aromas of
          rosebuds and freshly picked cherries, leading to a palate that is
          fresh, soft, and lightly tannic, perfectly balanced and inviting with
          each sip.
          <br />
          Its alcohol content of 13.5% complements its vibrant acidity, making
          it an ideal companion for white and red meats, first courses, fresh
          cheeses, cold cuts, fish, and even sushi. Best enjoyed at 16–18°C,
          Sant’Eufemia is a sincere and joyful expression of
          Ruchè—uncomplicated, honest, and full of character.
                  <div className="w-full h-[25vh]">{/* empty space */}</div>
        </p>
      </div>
    </div>
  );
};

export default MoreDetails;
