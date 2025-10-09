"use client";

import Image from "next/image";
import React from "react";
import { scrollToTopAndNavigate } from "@/app/utils/scroll-utils";

interface NavigationBarProps {
  activeStep: "home" | "crimson" | "about" | "review" | "nutrition" | "gallery";
  onStepChange: (
    step: "home" | "crimson" | "about" | "review" | "nutrition" | "gallery",
  ) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeStep,
  onStepChange,
}) => {
  const colors = {
    primary: "#EB235C",
    secondary: "#80808099",
    tertiary: "#FFFFFF",
    gold: "#FFD700",
    darkred: "#8B0000",
  };

  const navItems = [
    {
      id: "crimson",
      label: "Story",
      icon: "/navigation-bar/default/story.svg",
      active: "/navigation-bar/active/story.svg",
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: "/navigation-bar/default/gallery.svg",
      active: "/navigation-bar/active/gallery.svg",
    },
    {
      id: "home",
      label: "Home",
      icon: "/navigation-bar/default/home.svg",
      active: "/navigation-bar/active/home.svg",
    },
    {
      id: "review",
      label: "Reviews",
      icon: "/navigation-bar/default/reviews.svg",
      active: "/navigation-bar/active/reviews.svg",
    },
    {
      id: "nutrition",
      label: "Nutritional Value",
      icon: "/navigation-bar/default/nutritional value.svg",
      active: "/navigation-bar/active/nutritional_value.svg",
    },
  ];

  const handleNavigation = (stepId: string) => {
    scrollToTopAndNavigate(() => onStepChange(stepId as any));
  };

  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 bg-white border border-[#EB235C] backdrop-blur-[20px] h-[70px] rounded-[50px] flex justify-evenly items-center z-50 max-w-[500px] w-[calc(100%-16px)]">
      {navItems.map((item) => {
        const isActive = activeStep === item.id;

        return (
          <button
            key={item.id}
            className="flex flex-col items-center transition-all duration-200"
            onClick={() => handleNavigation(item.id)}
          >
            <Image
              alt={`${item.label} icon`}
              className="object-contain w-[44px] h-[40px]"
              height={40}
              src={isActive ? item.active : item.icon}
              width={44}
            />
            <p
              className={`text-[9px] text-center transition-colors duration-200 ${
                isActive
                  ? "text-[#EB235C] font-medium"
                  : item.id === "home"
                    ? "text-[#80808099] font-medium text-[10.24px]"
                    : "text-[#80808099] font-light"
              }`}
            >
              {item.label}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default NavigationBar;
