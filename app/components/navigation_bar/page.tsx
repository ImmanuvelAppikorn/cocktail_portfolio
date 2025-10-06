"use client";

import Image from "next/image";
import React from "react";

interface NavigationBarProps {
  onStepChange: (step: "home" | "crimson" | "about" | "review" | "nutrition") => void;
  activeStep: "home" | "crimson" | "about" | "review" | "nutrition";
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onStepChange, activeStep }) => {
  const navItems: {
    id: string;
    label: string;
    icon: string;
    active: string;
    step: "home" | "crimson" | "about" | "review" | "nutrition";
  }[] = [
    { id: "story", label: "Story", icon: "/navigation-bar/default/story.svg", active: "/navigation-bar/active/story.svg", step: "crimson" },
    { id: "home", label: "Home", icon: "/navigation-bar/default/home.svg", active: "/navigation-bar/active/home.svg", step: "home" },
    { id: "reviews", label: "Reviews", icon: "/navigation-bar/default/reviews.svg", active: "/navigation-bar/active/reviews.svg", step: "review" },
    { id: "nutrition", label: "Nutritional Value", icon: "/navigation-bar/default/nutritional value.svg", active: "/navigation-bar/active/nutritional_value.svg", step: "nutrition" },
  ];

  return (
    <div className="bg-white border border-[#EB235C] backdrop-blur-[20px] w-full h-[70px] rounded-[50px] flex justify-evenly items-center">
      {navItems.map((item) => {
        const isActive = activeStep === item.step;
        return (
          <button
            key={item.id}
            onClick={() => onStepChange(item.step)}
            className="flex flex-col items-center transition-all duration-200"
          >
            <Image
              src={isActive ? item.active : item.icon}
              alt={`${item.label} icon`}
              width={44}
              height={40}
              className="object-contain w-[44px] h-[40px]"
            />
            <p className={`text-[9px] text-center transition-colors duration-200 ${isActive ? "text-[#EB235C] font-medium" : "text-[#80808099] font-light"}`}>
              {item.label}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default NavigationBar;
