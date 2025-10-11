"use client";

import Image from "next/image";
import React, { useState } from "react";

import { scrollToTopAndNavigate } from "@/app/utils/scroll-utils";

interface NavigationBarProps {
  activeStep: "home" | "crimson" | "about" | "review" | "nutrition" | "gallery";
  onStepChange: (
    step: "home" | "crimson" | "about" | "review" | "nutrition" | "gallery"
  ) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  activeStep,
  onStepChange,
}) => {
  const navItems = [
    {
      id: "crimson",
      label: "Story",
      icon: "/navigation-bar/new/Story.svg",
      // active: "/navigation-bar/active/story.svg",
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: "/navigation-bar/new/Gallery.svg",
      // active: "/navigation-bar/active/gallery.svg",
    },
    {
      id: "home",
      label: "Home",
      icon: "/navigation-bar/new/Home.svg",
      // active: "/navigation-bar/active/home.svg",
    },
    {
      id: "review",
      label: "Reviews",
      icon: "/navigation-bar/new/Review.svg",
      // active: "/navigation-bar/active/reviews.svg",
    },
    {
      id: "nutrition",
      label: "Nutrition Value",
      icon: "/navigation-bar/new/Nutrition.svg",
      // active: "/navigation-bar/active/nutritional_value.svg",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (stepId: string) => {
    scrollToTopAndNavigate(() => onStepChange(stepId as any));
  };

  return (
    <div className="fixed bottom-2 left-4 flex items-center z-50">
      {/* Trigger Button */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
        className="h-[58px] w-[58px] bg-[#EB235C] border border-white rounded-[43.68px] flex items-center justify-center cursor-pointer relative z-20"
      >
        <Image src="/navigation-bar/apps.svg" alt="" height={30} width={30} />
      </div>

      {/* Expanding White Capsule */}
      <div
        className={`absolute left-0 bottom-0 h-[58px] bg-white rounded-[50px] flex items-center overflow-hidden shadow-md
    transition-all duration-600 ease-in-out
    ${isOpen ? "w-[374px] pl-16 gap-2" : "w-[60px] px-0"}`}
        style={{ marginLeft: 0 }} // aligned with trigger button
      >
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className={`flex flex-col items-center mx-2 transform transition-all duration-500 ease-out
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
            style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}
          >
            <Image
              src={item.icon} // icon only
              alt={item.label}
              width={32}
              height={32}
              className="object-contain"
            />
            <p className="text-[8px] mt-1 text-[#EB235C] font-light font-axiforma">
              {item.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
