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
        <h2 className="flex-1 text-center text-[#BF062F] text-[19px] font-bold leading-tight font-montagu">
          LA BOGLIONA
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
                text: "Energy : 82 kcal - 341 KJ",
              },
              {
                icon: "/nutrition-icons/icon2.svg",
                text: "Fats : 0 g for which Saturated fatty acids : 0 g",
              },
              {
                icon: "/nutrition-icons/icon3.svg",
                text: "Carbohydrates : 2.6 g for which Sugars : 0.2 g",
              },
              { icon: "/nutrition-icons/icon4.svg", text: "Proteins : 0 g" },
              { icon: "/nutrition-icons/icon5.svg", text: "Salt : 0 g" },
              { icon: "/nutrition-icons/icon5.svg", text: "Alcohol: 14.5% (contributes ~82 kcal/100 ml)" },
            ],
          },
          {
            title: "Environmental Label",
            items: [
              {
                icon: "/nutrition-icons/icon1.svg",
                text: "Bottle: GLASS COLLECTION",
              },
              {
                icon: "/nutrition-icons/icon2.svg",
                text: "Cork: DEDICATED COLLECTION",
              },
              {
                icon: "/nutrition-icons/icon3.svg",
                text: "Capsule: ALUMINIUM COLLECTION",
              },
            ],
          },
          {
            title: "Ingredients",
            isList: true,
            items: [
              { text: "Barbera grapes" },
              { text: "Additives: Gum Arabic (E414)" },
              { text: "Stabilizer: Potassium Polyaspartate" },
              {
                text: "Oak aging contributes tannins and vanillin for flavor",
              },
            ],
          },
        ].map((section, idx) => (
          <div key={idx}>
            {/* Title */}
            <p className="text-[16px] text-[#BF062F] font-bold tracking-[2px] w-full pb-0 mb-2 pl-4 font-montagu">
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
                    <p className="text-[14px] font-medium leading-[150%] tracking-[-3%] flex-1 whitespace-normal break-words font-poppins">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
        
          </div>
          
        ))}
            <div className="w-full h-[20vh]">
              {/* empty space */}
            </div>
      </div>
    </div>
  );
};

export default NutritionPage;
