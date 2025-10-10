"use client";
import Image from "next/image";
import React, { useState } from "react";

const LanguageToggle = ({ onClose }: { onClose: () => void }) => {
  const languageItems = [
    { image: "/language-image/Italian.png", text: "Italian" },
    { image: "/language-image/English.png", text: "English" },
    { image: "/language-image/French.png", text: "French" },
    { image: "/language-image/Spanish.png", text: "Spanish" },
  ];

  // Default selected language → English
  const [selectedLang, setSelectedLang] = useState("English");

  // Handle continue button click
  const handleContinue = () => {
    console.log("Selected language:", selectedLang); // optional (for debugging)
    onClose(); // closes the popup
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl bg-white shadow-xl relative px-4 pb-6 overflow-hidden">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-700 hover:text-black transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="h-8 w-8"
        >
          <path d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C221.6 240.4 221.6 255.6 231 264.9L286 319.9L231 374.9C221.6 384.3 221.6 399.5 231 408.8C240.4 418.1 255.6 418.2 264.9 408.8L319.9 353.8L374.9 408.8C384.3 418.2 399.5 418.2 408.8 408.8C418.1 399.4 418.2 384.2 408.8 374.9L353.8 319.9L408.8 264.9C418.2 255.5 418.2 240.3 408.8 231C399.4 221.7 384.2 221.6 374.9 231L319.9 286L264.9 231C255.5 221.6 240.3 221.6 231 231z" />
        </svg>
      </button>

      {/* Header */}
      <p className="text-black text-[22px] font-bold text-center pt-12 pb-5">
        Choose Your Language
      </p>

      {/* Language Selection */}
      <div className="grid grid-cols-2 gap-4 px-2 sm:px-4">
        {languageItems.map((item, i) => {
          const isSelected = selectedLang === item.text;
          return (
            <div
              key={i}
              onClick={() => setSelectedLang(item.text)}
              className={`flex flex-col items-center justify-center cursor-pointer rounded-2xl p-3 border-2 transition-all duration-300 
                ${
                  isSelected
                    ? "border-[#EC2960] bg-[#EC2960]/10 scale-105"
                    : "border-transparent hover:border-gray-300 hover:bg-gray-100"
                }`}
            >
              <Image
                src={item.image}
                alt={item.text}
                height={90}
                width={90}
                className={`transition-transform duration-300 ${
                  isSelected ? "scale-110" : "scale-100"
                }`}
              />
              <p
                className={`text-[18px] font-bold mt-2 transition-colors ${
                  isSelected ? "text-[#EC2960]" : "text-black"
                }`}
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="bg-[#EC2960] w-full sm:w-[85%] h-[45px] flex justify-center mx-auto rounded-[8px] mt-6 mb-6 active:scale-95 transition-transform duration-200">
        <button
          onClick={handleContinue}
          className="text-white text-[16px] font-bold leading-[23px]"
        >
          {/* Continue with {selectedLang} */}
          Click To Continue
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
