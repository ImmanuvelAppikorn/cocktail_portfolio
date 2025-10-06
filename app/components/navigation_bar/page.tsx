"use client";

import { NavRouter } from "@/router"; 
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const NavigationBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState("home");

  // ✅ Strongly typed colors object
  const colors = {
    primary: "#EB235C",
    secondary: "#80808099",
    tertiary: "#FFFFFF",
    gold: "#FFD700",
    darkred: "#8B0000",
  };

  const navItems = [
    {
      id: "story",
      label: "Story",
      icon: "/navigation-bar/default/story.svg",
      active: "/navigation-bar/active/story.svg",
      href: NavRouter.CRIMSON,
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: "/navigation-bar/default/gallery.svg",
      active: "/navigation-bar/active/gallery.svg",
      href: NavRouter.GALLERY,
    },
    {
      id: "home",
      label: "Home",
      icon: "/navigation-bar/default/home.svg",
      active: "/navigation-bar/active/home.svg",
      href: NavRouter.HOME,
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: "/navigation-bar/default/reviews.svg",
      active: "/navigation-bar/active/reviews.svg",
      href: NavRouter.REVIEW,
    },
    {
      id: "nutrition",
      label: "Nutritional Value",
      icon: "/navigation-bar/default/nutritional value.svg",
      active: "/navigation-bar/active/nutritional_value.svg",
      href: NavRouter.NUTRITION,
    },
  ];

  // ✅ Detect active item from URL
  useEffect(() => {
    const matched = navItems.find((item) => pathname.includes(item.href));
    if (matched) {
      setActive(matched.id);
    }
  }, [pathname]);

  return (
    <div className="bg-white border border-[#EB235C] backdrop-blur-[20px] w-full h-[70px] rounded-[50px] flex justify-evenly items-center">
      {navItems.map((item) => {
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              router.push(item.href);
            }}
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
