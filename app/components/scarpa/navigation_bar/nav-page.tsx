"use client";

import Image from "next/image";
import React, { useState } from "react";

import { scrollToTopAndNavigate } from "@/app/utils/scroll-utils";

interface NavigationBarProps {
  activeStep: "home" | "crimson" | "about" | "review" | "nutrition" | "gallery";
  onStepChange: (
    step: "home" | "crimson" | "about" | "review" | "nutrition" | "gallery",
  ) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeStep: _activeStep,
  onStepChange,
}) => {
  const navItems = [
    {
      id: "crimson",
      label: "Story",
      icon: "/assets/scapra/navigation-bar/new/Story.svg",
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: "/assets/scapra/navigation-bar/new/Gallery.svg",
    },
    {
      id: "home",
      label: "Home",
      icon: "/assets/scapra/navigation-bar/new/Home.svg",
    },
    {
      id: "review",
      label: "Reviews",
      icon: "/assets/scapra/navigation-bar/new/Review.svg",
    },
    {
      id: "nutrition",
      label: "Ingredients",
      icon: "/assets/scapra/navigation-bar/new/Nutrition.svg",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  // Only handle menu open/close through the menu button
  // No auto-close on outside clicks

  const handleNavigation = (stepId: string) => {
    scrollToTopAndNavigate(() => onStepChange(stepId as any));
    // Removed auto-close on navigation
  };

  return (
    <div className="nav-container fixed bottom-2 left-1/2 -translate-x-1/2 w-full max-w-[500px] px-2 z-50">
      <div className="relative">
        {/* Trigger Button */}
        <div
          className="h-[50px] w-[50px] bg-white border border-white rounded-full flex items-center shadow-custom-double justify-center cursor-pointer relative z-20 bottom-[6px] left-[6px]"
          role="button"
          style={{
            boxShadow:
              "0 4px 4px 0 rgba(0, 0, 0, 0.25), 4px 0 4px 0 rgba(0, 0, 0, 0.25)",
          }}
          tabIndex={0}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
          }}
        >
          <Image
            alt="menu"
            height={50}
            src="/assets/scapra/navigation-bar/new/trigger_button.svg"
            width={50}
          />
        </div>

        {/* Expanding White Capsule */}
        <div
          className={`absolute left-0 bottom-0 h-[62px] rounded-full flex items-center overflow-hidden bg-white
            transition-all duration-[600ms] ease-in-out
            ${isOpen ? "w-full pl-11 px-2 " : "w-[62px] pl-0"}`}
        >
          <div
            className={`flex w-full justify-between ${isOpen ? "px-2" : ""}`}
          >
            {navItems.map((item, index) => (
              <button
                key={item.id}
                className={` cursor-pointer flex flex-col items-center flex-1 min-w-0  transform transition-all duration-500 ease-out
                  ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
                style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}
                onClick={() => handleNavigation(item.id)}
              >
                <Image
                  alt={item.label}
                  className="object-contain "
                  height={38}
                  src={item.icon}
                  width={38}
                />
                <p className="text-[8px]  text-center text-[#826026]  p-0.5 px-2  font-light font-axiforma whitespace-nowrap">
                  {item.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
