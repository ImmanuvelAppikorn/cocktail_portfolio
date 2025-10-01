"use client";

import { useState } from "react";
import Image from "next/image";

export default function NutritionCard() {
  const [activeTab, setActiveTab] = useState("nutrition");

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      {/* Tabs */}
      <div className="flex w-full rounded-lg overflow-hidden border border-gray-300">
        <button
          onClick={() => setActiveTab("story")}
          className={`flex-1 py-2 font-semibold ${
            activeTab === "story"
              ? "bg-pink-200 text-black"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Story
        </button>
        <button
          onClick={() => setActiveTab("nutrition")}
          className={`flex-1 py-2 font-semibold ${
            activeTab === "nutrition"
              ? "bg-pink-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Nutrition
        </button>
      </div>

      {activeTab === "nutrition" && (
        <div className="mt-6 space-y-6">
          {/* Nutritional Declaration */}
          <div>
            <h2 className="text-lg font-bold border-b border-black pb-1">
              NUTRITIONAL DECLARATION
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Image
                  src="/notes/energy.svg"
                  alt="Energy"
                  width={24}
                  height={24}
                />
                Energy : 78 kcal - 326 kj
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="/notes/fat.svg"
                  alt="Fat"
                  width={24}
                  height={24}
                />
                Fats : 0 g for which Saturated fatty acids : 0 g
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="/notes/carbo.svg"
                  alt="Carbohydrates"
                  width={24}
                  height={24}
                />
                Carbohydrates : 1.2 g for which Sugars : 0.1 g
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="/notes/proteins.svg"
                  alt="Proteins"
                  width={24}
                  height={24}
                />
                Proteins : 0 g
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="/notes/salt.svg"
                  alt="Salt"
                  width={24}
                  height={24}
                />
                Salt : 0 g
              </li>
            </ul>
          </div>

          {/* Environmental Label */}
          <div>
            <h2 className="text-lg font-bold border-b border-black pb-1">
              ENVIRONMENTAL LABEL
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Image
                  src="public/notes/bottle.svg"
                  alt="Bottle"
                  width={24}
                  height={24}
                />
                Bottle (GLASS COLLECTION) GL 71
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="public/notes/cork.svg"
                  alt="Cork"
                  width={24}
                  height={24}
                />
                Cork (DEDICATED SEPARATE COLLECTION) FOR 51
              </li>
              <li className="flex items-center gap-3">
                <Image
                  src="public/notes/capsules.svg"
                  alt="Capsule"
                  width={24}
                  height={24}
                />
                Capsules (PLASTIC COLLECTION) C/PVC 90
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
