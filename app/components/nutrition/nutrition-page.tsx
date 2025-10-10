import React from "react";
import Image from "next/image";

const NutritionPage = () => {
  return (
    <div className="px-2 space-y-4 mt-[5px] h-auto">
      <div className="border-b border-black mx-3">
        <p className="text-[#EB235C] text-[24px] font-bold text-center pb-1">
          CRIMSON RESERVE
        </p>
      </div>
      {/* Section Renderer */}
      {[
        {
          title: "Nutritional Declaration",
          items: [
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
          ],
        },
        {
          title: "Environmental Label",
          items: [
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
          ],
        },
        {
          title: "Ingredients",
          isList: true,
          items: [
            {
              text: "Grapes",
            },
            {
              text: "additives: gum Arabic (E414)",
            },
            {
              text: "potassium polyepitope",
            },
            {
              text: "antioxidant preservatives: Potassium metabisulfite (sulfites)",
            },
          ],
        },
      ].map((section, idx) => (
        <div key={idx}>
          {/* Title */}
          <p className="text-[16px] text-[#EB235C] font-bold tracking-[2px] w-full pb-0 mb-2 pl-4">
            {section.title}
          </p>

          {/* Items */}
          {section.isList ? (
            // 👇 Render as bullet list
            <ul className="list-disc pl-8 space-y-2 font-montagu">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="text-[12px] font-medium leading-tight tracking-tight whitespace-normal break-words"
                >
                  {item.text}
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-1">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 w-full px-3 py-0.5"
                >
                  {"icon" in item && item.icon && (
                    <Image
                      alt=""
                      className="object-contain flex-shrink-0"
                      height={22}
                      src={item.icon}
                      width={22}
                    />
                  )}
                  <p className="text-[12px] font-medium leading-tight tracking-tight flex-1 whitespace-normal break-words">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NutritionPage;
