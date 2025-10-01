"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import CrimsonReserveCard from "./crimson-reserve";
import About from "./about";
import Review from "./review";
import SlideToggle from "./button";
 // import your toggle

export default function WineCard() {
  const [currentStep, setCurrentStep] = useState<"home" | "crimson" | "about" | "review">("home");
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    document.body.style.overflow = currentStep !== "home" && !reverse ? "hidden" : "auto";
  }, [currentStep, reverse]);

  const handleStartJourney = () => setCurrentStep("crimson");

  const handleCrimsonNext = () => {
    setReverse(true);
    setTimeout(() => {
      setCurrentStep("about");
      setReverse(false);
    }, 1200);
  };

  const handleAboutNext = () => {
    setReverse(true);
    setTimeout(() => {
      setCurrentStep("review");
      setReverse(false);
    }, 800);
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-white overflow-hidden">
      
      {/* Slide Toggle for all pages except Home */}
      {currentStep !== "home" && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4">
          <SlideToggle />
        </div>
      )}

      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        
        {/* Home Page Title */}
        <AnimatePresence>
          {currentStep === "home" && !reverse && (
            <motion.h1
              className="text-center font-montagu font-semibold absolute top-[4rem] z-20"
              style={{ color: "var(--Text-Color, #1C1826)", fontSize: "66.94px", lineHeight: "80%" }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={"/logo/logo.svg"} alt="Vinea Logo" width={310} height={118} className="mx-auto" />
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Home Page Button */}
        <AnimatePresence>
          {currentStep === "home" && !reverse && (
            <motion.div
              className="absolute top-2/6 right-4 z-20"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleStartJourney}
                className="inline-flex items-center justify-center px-[18px] py-[13px] rounded-[56px] bg-[var(--Text-Color,#1C1826)] text-white text-[11px] font-montagu font-semibold hover:bg-gray-800 transition"
              >
                Start the journey
                <Image src="/button-image/arrow-up-right.svg" alt="arrow" width={12} height={12} className="ml-1"/>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Bottle Rose Image */}
        <motion.div
          className="absolute z-10 flex items-center justify-center"
          style={{ translateX: "-50%" }}
          animate={{
            width: currentStep === "home" ? 1087 : currentStep === "crimson" ? 300 : currentStep === "about" ? 650 : 265,
            height: currentStep === "home" ? 1183 : currentStep === "crimson" ? 329 : currentStep === "about" ? 705 : 288,
            rotate: currentStep === "home" ? -11 : currentStep === "crimson" ? 0 : currentStep === "about" ? -26 : 0,
            top: currentStep === "home" ? "120px" : currentStep === "crimson" ? "31%" : currentStep === "about" ? "44%" : "66.2%",
            left: currentStep === "home" ? "50%" : currentStep === "crimson" ? "50%" : currentStep === "about" ? "70%" : "50%",
            opacity: currentStep === "review" ? 0 : 1,
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

        {/* SVG Background */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-0 flex items-center justify-center"
          initial={{ width: 850, height: 850, rotate: 0 }}
          animate={{
            width: currentStep === "home" ? 850 : currentStep === "crimson" ? "3000px" : currentStep === "about" ? 600 : 600,
            height: currentStep === "home" ? 850 : currentStep === "crimson" ? "3000px" : currentStep === "about" ? 600 : 600,
            left: currentStep === "home" ? "50%" : currentStep === "crimson" ? "50%" : currentStep === "about" ? "90%" : "50%",
            bottom: currentStep === "home" ? "-247px" : currentStep === "crimson" ? "-800px" : currentStep === "about" ? "-180px" : "-380px",
            rotate: currentStep === "home" ? 0 : currentStep === "crimson" ? 0 : currentStep === "about" ? 90 : 0.05,
            
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src="/shape-svg/circle-shape.svg"
            alt="background-svg"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Crimson Card */}
        <AnimatePresence>
          {currentStep === "crimson" && !reverse && (
            <motion.div
              className="absolute top-0 w-full h-full z-40"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 1 }}
            >
              <CrimsonReserveCard onNextClick={handleCrimsonNext} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* About Card */}
        <AnimatePresence>
          {currentStep === "about" && !reverse && (
            <motion.div
              className="absolute top-0 w-full h-full z-40"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 1 }}
            >
              <About onNextClick={handleAboutNext} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Page */}
        <AnimatePresence>
          {currentStep === "review" && !reverse && (
            <motion.div
              className="absolute top-0 w-full h-full z-40"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 1 }}
            >
              <Review />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
