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
              <h2 className="w-full text-center text-[#5E7ECC] text-[19px] font-bold leading-tight font-montagu">
               VERMOUTH ROSSO
              </h2>
            </div>


      {/* Scrollable content */}
      <div className="w-full  mt-1 overflow-y-scroll no-scrollbar">
        <p className="text-[16px] text-[#1A2042] font-extrabold tracking-[2px] w-full pb-0 mt-3 font-montagu pl-2">
          About The Wine
        </p>

        <p className="text-[12px] w-full font-axiforma tracking-[2] font-medium mt-1 leading-7   px-2 pt-2 text-justify">
The Vermouth Rosso (€113.00) is an exceptional artisanal Vermouth di Torino, expertly crafted with 25 botanical ingredients blended on a fine Piedmont wine base. This refined vermouth offers a rich and well-balanced structure, with aromatic notes of vanilla, rhubarb, juniper, toasted wood, and festive spices such as cloves, cinnamon, and dried orange.
<br />
 Its smooth and harmonious flavor profile is complemented by a lingering aftertaste of medicinal herbs, adding depth and character. Perfectly versatile, Vermouth Rosso can be enjoyed in classic cocktails like the Negroni, Americano, or Manhattan, or simply served over ice with a slice of orange for a sophisticated tasting experience.
              <div className="w-full h-[25vh]">{/* empty space */}</div>
        </p>
      </div>
    </div>
  );
};

export default MoreDetails;
