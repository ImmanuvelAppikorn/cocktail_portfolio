"use client";
import Image from "next/image";
import React, { useState } from "react";

const NavigationBar = () => {
  const [active, setActive] = useState("home");

  const navItems = [
    {
      id: "story",
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
      id: "reviews",
      label: "Reviews",
      icon: "/navigation-bar/default/reviews.svg",
      active: "/navigation-bar/active/story.svg",
    },
    {
      id: "nutrition",
      label: "Nutritional Value",
      icon: "/navigation-bar/default/nutritional value.svg",
      active: "/navigation-bar/active/nutritional_value.svg",
    },
  ];

  return (
    <div className="bg-white border-[1px] font-axiforma font-light border-[#EB235C] backdrop-blur-[20px] w-[400px] h-[70px] m-4 rounded-[50px] flex justify-evenly items-center">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className="flex flex-col items-center"
        >
          <Image
            src={active === item.id ? item.active : item.icon}
            alt={`${item.label} icon`}
            width={44}
            height={40}
            className="object-contain w-[44px] h-[40px]"
          />
          <p
            className={`text-[9px] text-center transition-colors duration-200 ${
              active === item.id
                ? "text-[#EB235C] font-medium"
                : item.id === "home"
                  ? "text-[#80808099] font-medium text-[10.24px]"
                  : "text-[#80808099] font-light"
            }`}
          >
            {item.label}
          </p>
        </button>
      ))}
    </div>
  );
};

export default NavigationBar;
