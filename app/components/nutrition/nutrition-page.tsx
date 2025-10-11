import React from "react";
import Image from "next/image";

interface NutritionPageProps {
  onPrevClick?: () => void; // Pass a function to go back
}

const NutritionPage: React.FC<NutritionPageProps> = ({ onPrevClick }) => {
  return (
    <div className="px-2 space-y-4 mt-[5px] h-auto">
      {/* Header with back button */}
      <div className="flex flex-row w-full pt-2 pb-2 items-center justify-center border-b border-black">
        <button
          onClick={() => onPrevClick && onPrevClick()} // ✅ Call the passed function
          className="flex-shrink-0"
        >
          <Image
            src="/button-image/black-back.svg"
            alt="Back Icon"
            height={28}
            width={28}
          />
        </button>
        <h2 className="flex-1 text-center text-[#EB235C] text-[24px] font-bold leading-tight font-montagu">
          CRIMSON RESERVE
        </h2>
      </div>

      {/* Section Renderer */}
      <div className="w-full h-[45vh] overflow-y-auto">
        {[
          {
            title: "Nutritional Declaration",
            items: [
              { icon: "/nutrition-icons/icon1.svg", text: "Energy : 78 kcal - 326 kj" },
              { icon: "/nutrition-icons/icon2.svg", text: "Fats : 0 g for which Saturated fatty acids : 0 g" },
              { icon: "/nutrition-icons/icon3.svg", text: "Carbohydrates : 1.2 g for which Sugars : 0.1 g" },
              { icon: "/nutrition-icons/icon4.svg", text: "Proteins : 0 g" },
              { icon: "/nutrition-icons/icon5.svg", text: "Salt : 0 g" },
            ],
          },
          {
            title: "Environmental Label",
            items: [
              { icon: "/nutrition-icons/icon1.svg", text: "Bottle (GLASS COLLECTION) GL 71" },
              { icon: "/nutrition-icons/icon2.svg", text: "Cork (DEDICATED SEPARATE COLLECTION) FOR 51" },
              { icon: "/nutrition-icons/icon3.svg", text: "Capsules (PLASTIC COLLECTION) C/PVC 90" },
            ],
          },
          {
            title: "Ingredients",
            isList: true,
            items: [
              { text: "Grapes" },
              { text: "Additives: Gum Arabic (E414)" },
              { text: "Potassium Polyepitope" },
              { text: "Antioxidant Preservatives: Potassium Metabisulfite (sulfites)" },
            ],
          },
        ].map((section, idx) => (
          <div key={idx}>
            {/* Title */}
            <p className="text-[16px] text-[#EB235C] font-bold tracking-[2px] w-full pb-0 mb-2 pl-4 font-montagu">
              {section.title}
            </p>

            {/* Items */}
            {section.isList ? (
              <ul className="list-disc pl-8 space-y-2 font-poppins">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-[14px] font-medium leading-[150%] tracking-[-3%] whitespace-normal break-words font-poppins"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-1">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 w-full px-3 py-0.5">
                    {"icon" in item && item.icon && (
                      <Image
                        alt=""
                        className="object-contain flex-shrink-0"
                        height={22}
                        src={item.icon}
                        width={22}
                      />
                    )}
                    <p className="text-[14px] font-medium leading-[150%] tracking-[-3%] flex-1 whitespace-normal break-words font-poppins">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionPage;
