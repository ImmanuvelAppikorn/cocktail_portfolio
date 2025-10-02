import React from "react";
import Image from "next/image";

const NutritionPage = () => {
  return (
    <div className="px-2 space-y-1 mt-16">
      {/* Section Renderer */}
      {[
        {
          title: "NUTRITIONAL DECLARATION",
          items: [
            { icon: "/nutrition-icons/icon1.svg", text: "Energy : 78 kcal - 326 kj" },
            { icon: "/nutrition-icons/icon2.svg", text: "Fats : 0 g for which Saturated fatty acids : 0 g" },
            { icon: "/nutrition-icons/icon3.svg", text: "Carbohydrates : 1.2 g for which Sugars : 0.1 g" },
            { icon: "/nutrition-icons/icon4.svg", text: "Proteins : 0 g" },
            { icon: "/nutrition-icons/icon5.svg", text: "Salt : 0 g" },
          ],
        },
        {
          title: "ENVIRONMENTAL LABEL",
          items: [
            { icon: "/nutrition-icons/icon1.svg", text: "Bottle (GLASS COLLECTION) GL 71" },
            { icon: "/nutrition-icons/icon2.svg", text: "Cork (DEDICATED SEPARATE COLLECTION) FOR 51" },
            { icon: "/nutrition-icons/icon3.svg", text: "Capsules (PLASTIC COLLECTION) C/PVC 90" },
          ],
        },
      ].map((section, idx) => (
        <div key={idx}>
          {/* Title */}
          <p className="text-[16px] font-bold text-center tracking-[2px] w-full border-b-1  pb-0 mb-2">
            {section.title}
          </p>


          {/* Items */}
          <div className="space-y-1">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 w-full  px-3 py-0.5"
              >
                <Image
                  src={item.icon}
                  alt=""
                  height={22}
                  width={22}
                  className="object-contain flex-shrink-0"
                />
                <p className="text-[12px] font-medium leading-tight tracking-tight flex-1 whitespace-normal break-words">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NutritionPage;
