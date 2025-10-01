import React from "react";

import Image from "next/image";
import ToggleButton from "./toggle";


const NutritionPage = () => {
  return (
    <>


      <div className="px-2 space-y-3 mt-20">
        {/* NUTRITIONAL DECLARATION */}
        <div>
          <p className="text-[22px] font-bold text-center tracking-wider pb-1">
            NUTRITIONAL DECLARATION
          </p>
          <div className="border-1 bg-black w-[380px] mx-auto"></div>
          <div className="space-y-2 pl-3 pt-2 text-[14px]">
            {/* Energy */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/nutrition-icons/icon1.svg"}
                alt={""}
                height={27.79}
                width={27.79}
              />
              <p className="text-[14px] font-medium leading-[90%] tracking-[-3%]">
                Energy : 78 kcal - 326 kj
              </p>
            </div>
            {/* Fats */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/nutrition-icons/icon2.svg"}
                alt={""}
                height={27.79}
                width={27.79}
              />
              <p className="text-[14px] font-medium leading-[90%] tracking-[-3%]">
                Fats : 0 g for which Saturated fatty acids : 0 g
              </p>
            </div>
            {/* Carbohydrates */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/nutrition-icons/icon3.svg"}
                alt={""}
                height={27.79}
                width={27.79}
              />
              <p className="text-[14px] font-medium leading-[90%] tracking-[-3%]">
                Carbohydrates : 1.2 g for which Sugars : 0.1 g
              </p>
            </div>
            {/* Proteins */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/nutrition-icons/icon4.svg"}
                alt={""}
                height={27.79}
                width={27.79}
              />
              <p className="text-[14px] font-medium leading-[90%] tracking-[-3%]">
                Proteins : 0 g
              </p>
            </div>
            {/* Salt */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/nutrition-icons/icon5.svg"}
                alt={""}
                height={27.79}
                width={27.79}
              />
              <p className="text-[14px] font-medium leading-[90%] tracking-[-3%]">
                Salt : 0 g
              </p>
            </div>
          </div>
        </div>

        {/* ENVIRONMENTAL LABEL */}
        <div>
          <p className="text-[22px] font-bold text-center tracking-wider pb-1">
            ENVIRONMENTAL LABEL
          </p>
          <div className="border-1 bg-black w-[380px] mx-auto"></div>
          <div className="space-y-2 pl-3 pt-2 text-[14px]">
            {/* Bottle */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/nutrition-icons/icon1.svg"}
                alt={""}
                height={27.79}
                width={27.79}
              />
              <p className="text-[14px] font-medium leading-[90%] tracking-[-3%]">
                Bottle (GLASS COLLECTION) GL 71
              </p>
            </div>
            {/* Cork */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/nutrition-icons/icon2.svg"}
                alt={""}
                height={27.79}
                width={27.79}
              />
              <p className="text-[14px] font-medium leading-[90%] tracking-[-3%]">
                Cork (DEDICATED SEPARATE COLLECTION) FOR 51
              </p>
            </div>
            {/* Capsules */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={"/nutrition-icons/icon3.svg"}
                alt={""}
                height={27.79}
                width={27.79}
              />
              <p className="text-[14px] font-medium leading-[90%] tracking-[-3%]">
                Capsules (PLASTIC COLLECTION) C/PVC 90
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NutritionPage;
