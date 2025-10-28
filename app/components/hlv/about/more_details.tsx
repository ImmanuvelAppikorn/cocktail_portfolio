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
                          VIGNA DEL PARROCO
              </h2>
            </div>


      {/* Scrollable content */}
      <div className="w-full  mt-1 overflow-y-scroll no-scrollbar">
        <p className="text-[16px] text-[#1A2042] font-extrabold tracking-[2px] w-full pb-0 mt-3 font-montagu pl-2">
          About The Wine
        </p>

        <p className="text-[12px] w-full font-axiforma tracking-[2] font-medium mt-1 leading-7   px-2 pt-2 text-justify">
          The wine takes its name from the small vineyard planted by Don Giacomo Cauda in 1964 in Castagnole Monferrato, the parish priest of the town, considered the father of Ruchè, the first to believe its potential and to vinify it in purity. The grapes used for this wine come from the first vineyard ever planted entirely with Ruchè, also the oldest existing vineyard at present. The only CRU of the Docg Ruchè di Castagnole Monferrato.
          <br />
           In 2016, Luca Ferraris was chosen to take up this important vineyard and start a new project: to make Vigna del Parroco the flagship wine of the company and the flag of Ruchè in the world, showing the inestimable value of this historic and precious vineyard. This wine captivates for its brightness, with shades of ruby and hints of purple on the rim. The aroma is immediately captivating for its personality and typical characteristics, giving floral hints of rose and violet, fruity scents of marasca cherries and small berries, with a subtle balsamic undertone. The palate confirms that it has what it takes to be named among the “great Piedmont wines”. It will perfectly accompany entire meals.
              <div className="w-full h-[25vh]">{/* empty space */}</div>
        </p>
      </div>
    </div>
  );
};

export default MoreDetails;
