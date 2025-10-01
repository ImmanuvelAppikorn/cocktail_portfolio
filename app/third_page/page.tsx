import React from "react";

const ThirdPage = () => {
  return (
    <>
      <div className="pt-20 bg-white px-6">
        <h1 className="font-bold text-[26.19px] border-b-2 border-black text-center p-2">
          ABOUT THE WINE
        </h1>
        <p className="font-semibold text-[12px] tracking-[13%] pt-4 p-2 leading-[200%]">
          "Sourced From The Mineral-Rich Soil Along The Bhadra River Belt, Our
          House Espresso Is A Single-Origin Specialty Robusta Coffee From India,
          Considered Among The Finest In The World. This Robusta Is Graded As
          'Kaapi Royale,' The Highest Grade Of Indian Robusta Possible When
          Presented In A Milk-Based Drink, It Features Notes Of Hazelnut And
          Dark Chocolate, With An Extra Caffeine Hit Unique To Robusta."
        </p>
        <div className="flex justify-end pt-2">
          <button className="bg-black text-white h-[40px] w-[134px] rounded-[55.56px] text-[11.11px] font-semibold leading-[90%]">
            Go to Reviews <span className="text-bold">↗</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ThirdPage;
