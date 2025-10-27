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
              <h2 className="w-full text-center text-[#BF062F] text-[19px] font-bold leading-tight font-montagu">
                     LA BOGLIONA
              </h2>
            </div>
      

      {/* Scrollable content */}
      <div className="w-full mt-1 overflow-y-scroll no-scrollbar">
        <p className="text-[16px] text-[#BF062F] font-extrabold tracking-[2px] w-full pb-0 mt-3 font-montagu pl-2">
          About The Wine
        </p>

        <p className="text-[12px] w-full font-axiforma tracking-[1px] font-medium mt-1 leading-7 px-2 pt-2 text-justify">
          La Bogliona Barbera d’Asti Superiore is a premium wine produced by
          Scarpa, representing the authentic character of Piedmontese
          winemaking. It is crafted exclusively from Barbera grapes grown in the
          renowned “Bricchi” estate, located on the border between Castel
          Rocchero and Acqui Terme. The estate spans 3.5 hectares of vineyards,
          planted at 350–400 meters above sea level, predominantly South-West
          facing, on sandy soils with traces of clay and silt, rich in minerals
          such as magnesium. This terroir imparts freshness, structure, and
          aromatic complexity to the wine.
          <br />
          The vineyards were originally planted in 1970, and meticulous care is
          taken throughout the vine cycle, including late September–October
          harvesting, careful sorting of grapes, and sustainable vineyard
          practices. La Bogliona expresses a deep ruby color, with a bouquet of
          ripe blackberries, plums, cherries, and hints of leather, full-bodied
          taste, vibrant acidity, maturing tannins, and a long mineral
          finish—reflecting over 25 years of potential longevity..
          <br />
          Vinification involves maceration on the skins for 18 days in 54 hL
          wooden vats, with 2 manual pump-overs per day. At the end of alcoholic
          fermentation, racking is carried out in steel tanks until the
          completion of malolactic fermentation. Ageing in 45 hL French Allier
          oak barrels for a period of 32 months and subsequent ageing in a steel
          tank for about 6 months. After bottling, the wine is left to rest for
          4 months before being put on the market.
              <div className="w-full h-[25vh]">{/* empty space */}</div>
        </p>
      </div>
    </div>
  );
};

export default MoreDetails;
