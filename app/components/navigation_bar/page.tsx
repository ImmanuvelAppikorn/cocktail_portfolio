"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface NavigationBarProps {
  activeStep: "home" | "crimson" | "about" | "review" | "nutrition";
  onStepChange: (step: "home" | "crimson" | "about" | "review" | "nutrition") => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeStep, onStepChange }) => {

  const colors = {
    primary: "#EB235C",
    secondary: "#80808099",
    tertiary: "#FFFFFF",
    gold: "#FFD700",
    darkred: "#8B0000",
  };

  const navItems = [
    { id: "crimson", label: "Story", icon: "/navigation-bar/default/story.svg", active: "/navigation-bar/active/story.svg" },
    { id: "nutrition", label: "Nutritional Value", icon: "/navigation-bar/default/nutritional value.svg", active: "/navigation-bar/active/nutritional_value.svg" },
    { id: "home", label: "Home", icon: "/navigation-bar/default/home.svg", active: "/navigation-bar/active/home.svg" },
    { id: "review", label: "Reviews", icon: "/navigation-bar/default/reviews.svg", active: "/navigation-bar/active/reviews.svg" },
    { id: "about", label: "Gallery", icon: "/navigation-bar/default/gallery.svg", active: "/navigation-bar/active/gallery.svg" },
  ];

  return (
    <div className="bg-white border border-[#EB235C] backdrop-blur-[20px] w-full h-[70px] rounded-[50px] flex justify-evenly items-center">
      {navItems.map((item) => {
        const isActive = activeStep === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onStepChange(item.id as any)}
            className="flex flex-col items-center transition-all duration-200"
          >
            <Image
              src={isActive ? item.active : item.icon}
              alt={`${item.label} icon`}
              width={44}
              height={40}
              className="object-contain w-[44px] h-[40px]"
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
