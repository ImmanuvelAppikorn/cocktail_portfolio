"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import CrimsonReserveCard from "./crimson-reserve";

export default function WineCard() {
  const [clicked, setClicked] = useState(false);

  // Prevent scrolling when animation runs
  useEffect(() => {
    if (clicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [clicked]);

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        {/* Title */}
        <AnimatePresence>
          {!clicked && (
            <motion.h1
              className="text-center font-montagu font-semibold absolute top-[4rem] z-20"
              style={{
                color: "var(--Text-Color, #1C1826)",
                fontSize: "66.94px",
                lineHeight: "80%",
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 0.5 }}
            >
              Vinea <br />
              <span className="font-extrabold">Connect</span>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Button */}
        <AnimatePresence>
          {!clicked && (
            <motion.div
              className="absolute top-2/6 right-4 z-20"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setClicked(true)}
                className="inline-flex items-center justify-center px-[18px] py-[13px] rounded-[56px] bg-[var(--Text-Color,#1C1826)] text-white text-[11px] font-montagu font-semibold hover:bg-gray-800 transition"
              >
                Start the journey
                <Image
                  src="/button-image/arrow-up-right.svg"
                  alt="arrow"
                  width={12}
                  height={12}
                  className="ml-1"
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottle Image */}
        <motion.div
          className="absolute z-10 flex items-center justify-center"
          style={{ top: "120px", left: "50%", translateX: "-45%" }}
          animate={{
            width: clicked ? 330 : 1087,
            height: clicked ? 359 : 1183,
            rotate: clicked ? 0 : -11,
            top: clicked ? "30%" : "120px",
            left: "50%",
            translateX: "-50%",
          }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/vinea/Rose.svg"
            alt="bottle"
            width={1087}
            height={1183}
            className="object-contain w-full h-full"
          />
        </motion.div>

        {/* Expanding Circle Background */}
        <motion.div
          className="absolute -bottom-90 left-1/2 -translate-x-1/2 z-0 flex items-center justify-center"
          initial={{ width: 850, height: 850 }}
          animate={{
            width: clicked ? "300vw" : 850, // super big to cover screen
            height: clicked ? "300vh" : 850,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.div
            className="rounded-full bg-[#EB235C]"
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* Crimson Reserve Card (only shows when clicked) */}
        {clicked && (
          <div className="absolute top-0 w-full h-full z-40 ">
            <CrimsonReserveCard />
          </div>
        )}
      </div>
    </div>
  );
}
