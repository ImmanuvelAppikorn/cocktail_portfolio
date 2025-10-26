import React from "react";
import Image from "next/image";

interface NutritionPageProps {
  onPrevClick?: () => void; // Pass a function to go back
}

const NutritionPage: React.FC<NutritionPageProps> = ({
  onPrevClick,
}: {
  onPrevClick?: () => void;
}) => {
  return (
    <div className="pt-2 px-4 space-y-4 mt-[5px] h-auto">
      {/* Header with back button */}

      <div className="flex flex-row w-full pt-2 pb-2 items-center justify-center border-b border-black">
        <button
          onClick={() => onPrevClick && onPrevClick()}
          className="flex-shrink-0"
        >
          <Image
            src="/button-image/black-back.svg"
            alt="Back Icon"
            height={26}
            width={26}
          />
        </button>
        <h2 className="flex-1 text-center text-[#58660C] text-[19px] font-bold leading-tight font-montagu">
          ALTA LANGA
        </h2>
      </div>

      {/* Section Renderer */}
      <div className="w-full h-[65vh] overflow-y-auto pt-2">
        {[
          {
            title: "Nutritional Declaration",
            items: [
              {
                icon: "/nutrition-icons/icon1.svg",
                text: "Energy: 85 kcal – 356 kJ",
              },
              {
                icon: "/nutrition-icons/icon2.svg",
                text: "Fats : 0 g for which Saturated fatty acids : 0 g ",
              },
              {
                icon: "/nutrition-icons/icon3.svg",
                text: "Carbohydrates : 1.8 g for which Sugars : 0.5 g ",
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
                text: "Bottle (GLASS COLLECTION): GL 75",
              },
              {
                icon: "/nutrition-icons/icon2.svg",
                text: "Cork (DEDICATED SEPARATE COLLECTION): FOR 52",
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
              { text: "Chardonnay grapes" },
              { text: "Preservative: Potassium metabisulfite (sulfites)" },
            ],
          },
        ].map((section, idx) => (
          <div key={idx}>
            {/* Title */}
            <p className="text-[16px] text-[#58660C] font-bold tracking-[2px] w-full pb-0 mb-2  font-montagu">
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
                  <div
                    key={i}
                    className="flex items-center gap-1.5 w-full  py-0.5"
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
                    <p className="text-[14px] font-medium leading-[150%] tracking-[-3%] flex-1 whitespace-normal break-words font-poppins">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="w-full h-[20vh]">{/* empty space */}</div>
      </div>
    </div>
  );
};

export default NutritionPage;
