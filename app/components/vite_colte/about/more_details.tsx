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
              <h2 className="w-full text-center text-[#EB235C] text-[19px] font-bold leading-tight font-montagu">
                         BARBERA D'ASTI
              </h2>
            </div>


      {/* Scrollable content */}
      <div className="w-full  mt-1 overflow-y-scroll no-scrollbar">
        <p className="text-[16px] text-[#EB235C] font-extrabold tracking-[2px] w-full pb-0 mt-3 font-montagu pl-2">
          About The Wine
        </p>

        <p className="text-[12px] w-full font-axiforma tracking-[2] font-medium mt-1 leading-7   px-2 pt-2 text-justify">
          Rossofuoco embodies the vibrant character of Barbera d’Asti,
          expressing the purity and intensity of this celebrated Piedmontese
          grape. Produced by Vite Colte from organically grown vineyards in the
          heart of Asti, this wine reflects a philosophy of harmony between
          nature and craftsmanship.
          <br />
          Vinification follows traditional methods, with malolactic fermentation
          and aging in steel vats to preserve Barbera’s natural freshness and
          fruit-driven charm. The result is a wine of deep ruby red color and
          remarkable balance. Its bouquet opens with fruity aromas of cranberry
          and strawberry, evolving into delicate hints of licorice, blackberry,
          and subtle spice.
          <br />
          On the palate, Rossofuoco is dry, full-bodied, and vibrant, with
          measured acidity that enhances its juicy core of ripe red fruits. The
          texture is velvety and supple, leading to a long, harmonious finish.
          <br />
          Elegant yet approachable, this organic Barbera d’Asti DOCG pairs
          beautifully with a wide range of dishes — from pasta and roasted meats
          to aged cheeses and earthy Piedmontese classics. It is a genuine
          expression of tradition, terroir, and respect for nature.
        </p>
      </div>
    </div>
  );
};

export default MoreDetails;
