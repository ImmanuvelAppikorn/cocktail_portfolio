import Image from "next/image";
import React from "react";

const LanguageToggle = () => {
  const languageItems = [
    {
      image: "/language-image/Italian.png",
      text: "Italian",
    },
    {
      image: "/language-image/English.png",
      text: "English",
    },
    {
      image: "/language-image/French.png",
      text: "French",
    },
    {
      image: "/language-image/Spanish.png",
      text: "Spanish",
    },
  ];

  return (
    <>
      <div className="h-[420px] w-[290px] border-2 rounded-3xl">
        {/* SVG ICON - (CANCEL) */}
        <div className="flex justify-end p-1.5">
          <svg
            className="h-8 w-8"
            viewBox="0 0 640 640"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C221.6 240.4 221.6 255.6 231 264.9L286 319.9L231 374.9C221.6 384.3 221.6 399.5 231 408.8C240.4 418.1 255.6 418.2 264.9 408.8L319.9 353.8L374.9 408.8C384.3 418.2 399.5 418.2 408.8 408.8C418.1 399.4 418.2 384.2 408.8 374.9L353.8 319.9L408.8 264.9C418.2 255.5 418.2 240.3 408.8 231C399.4 221.7 384.2 221.6 374.9 231L319.9 286L264.9 231C255.5 221.6 240.3 221.6 231 231z" />
          </svg>
        </div>
        {/* Choose the Language */}
        <div>
          {" "}
          <p className="text-black text-[22px] font-bold text-center pb-5">
            Choose your language
          </p>
        </div>
        {/* Language Selection */}
        <div className="grid grid-cols-2 gap-2">
          {languageItems.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <Image alt={item.text} height={90} src={item.image} width={90} />
              <p className="text-[20px] font-bold">{item.text}</p>
            </div>
          ))}
        </div>
        {/* Button */}
        <div className="bg-[#EC2960] w-[85%] h-[35px] flex justify-center mx-auto rounded-[6px] mt-4">
          <button className="text-white text-[15px] font-bold leading-[23px]">
            Click to Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default LanguageToggle;
