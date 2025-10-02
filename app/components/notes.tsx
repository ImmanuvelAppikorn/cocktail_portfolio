import React from "react";
import Image from "next/image";

const NutritionPage = () => {
  return (
    <div className="px-2 space-y-4 mt-15">
      {/* NUTRITIONAL DECLARATION */}
      <div>
        <p className="text-[18px] font-bold text-center tracking-wide pb-1">
          NUTRITIONAL DECLARATION
        </p>
        <div className="h-[1px] bg-black w-[280px] mx-auto"></div>

        <div className="space-y-1.5 pl-2 pt-2 text-[12px]">
          {[
            {
              icon: "/nutrition-icons/icon1.svg",
              text: "Energy : 78 kcal - 326 kj",
            },
            {
              icon: "/nutrition-icons/icon2.svg",
              text: "Fats : 0 g for which Saturated fatty acids : 0 g",
            },
            {
              icon: "/nutrition-icons/icon3.svg",
              text: "Carbohydrates : 1.2 g for which Sugars : 0.1 g",
            },
            { icon: "/nutrition-icons/icon4.svg", text: "Proteins : 0 g" },
            { icon: "/nutrition-icons/icon5.svg", text: "Salt : 0 g" },
          ].map((item, i) => (
            <div key={i} className="flex flex-row items-center gap-2">
              <Image
                src={item.icon}
                alt=""
                height={22}
                width={22}
                className="object-contain"
              />
              <p className="text-[12px] font-medium leading-[100%] tracking-tight">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ENVIRONMENTAL LABEL */}
      <div>
        <p className="text-[18px] font-bold text-center tracking-wide pb-1">
          ENVIRONMENTAL LABEL
        </p>
        <div className="h-[1px] bg-black w-[280px] mx-auto"></div>

        <div className="space-y-1.5 pl-2 pt-2 text-[12px]">
          {[
            {
              icon: "/nutrition-icons/icon1.svg",
              text: "Bottle (GLASS COLLECTION) GL 71",
            },
            {
              icon: "/nutrition-icons/icon2.svg",
              text: "Cork (DEDICATED SEPARATE COLLECTION) FOR 51",
            },
            {
              icon: "/nutrition-icons/icon3.svg",
              text: "Capsules (PLASTIC COLLECTION) C/PVC 90",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-row items-center gap-2">
              <Image
                src={item.icon}
                alt=""
                height={22}
                width={22}
                className="object-contain"
              />
              <p className="text-[12px] font-medium leading-[100%] tracking-tight">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
