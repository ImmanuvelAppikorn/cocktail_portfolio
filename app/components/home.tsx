"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import CrimsonReserveCard from "./crimson-reserve";
import About from "./about";
import Review from "./review";
import NutritionPage from "./notes";
import SlideToggle from "./button"; // toggle component

export default function WineCard() {

const activeBottle = { color: "#EB235C" }; // example bottle color


  const [currentStep, setCurrentStep] = useState<
    "home" | "crimson" | "about" | "review" | "nutrition"
  >("home");
  const [reverse, setReverse] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // intro animation flag

  useEffect(() => {
    // hide intro overlay after 1.5s
    const timer = setTimeout(() => setShowIntro(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      currentStep !== "home" && !reverse ? "hidden" : "auto";
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

  const handleCrimsonPrev = () => {
  setReverse(true);
  setTimeout(() => {
    setCurrentStep("home"); // go back to home
    setReverse(false);
  }, 800);
};

const handleAboutPrev = () => {
  setReverse(true);
  setTimeout(() => {
    setCurrentStep("crimson"); // go back to crimson
    setReverse(false);
  }, 800);
};

const handleReviewPrev = () => {
  setReverse(true);
  setTimeout(() => {
    setCurrentStep("about"); // go back to about
    setReverse(false);
  }, 800);
};

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-white overflow-hidden">
      {/* Intro Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Slide Toggle (only visible on About, Crimson, Nutrition, Review) */}
      {(currentStep === "about" ||
        currentStep === "crimson" ||
        currentStep === "nutrition" ||
        currentStep === "review") && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4">
          <SlideToggle
            selected={currentStep === "nutrition" ? "nutrition" : "story"}
            setSelected={(tab) => {
              if (tab === "story") {
                setCurrentStep("crimson"); // Go to Crimson page
              } else {
                setCurrentStep("nutrition"); // Go to Nutrition page
              }
            }}
          />
        </div>
      )}

      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        {/* Home Page Title */}
        <AnimatePresence>
          {currentStep === "home" && !reverse && !showIntro && (
            <motion.h1
              className="text-center font-montagu font-semibold absolute top-[4rem] z-20"
              style={{
                color: "var(--Text-Color, #1C1826)",
                fontSize: "66.94px",
                lineHeight: "80%",
              }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={"/logo/logo.svg"}
                alt="Vinea Logo"
                width={250}
                height={68}
                className="mx-auto"
              />
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Home Page Button */}
     <AnimatePresence>
  {currentStep === "home" && !reverse && !showIntro && (
    <motion.div
      className="absolute top-[45%] right-3 z-50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <button
        onClick={handleStartJourney}
        className="relative overflow-hidden inline-flex items-center justify-center px-[14px] py-[9px] rounded-[56px] bg-[var(--Text-Color,#1C1826)] text-white text-[11px] font-montagu font-semibold hover:bg-gray-800 transition group"
      >
        {/* Expanding Circle */}
        <span className="absolute w-50 h-50 bg-pink-500 rounded-full bottom-20 -left-80 transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:-bottom-30 group-hover:-left-25" />

        <span className="relative flex items-center">
          Start the journey
          <Image
            src="/button-image/arrow-up-right.svg"
            alt="arrow"
            width={14}
            height={14}
            className="ml-1"
          />
        </span>
      </button>
    </motion.div>
  )}
</AnimatePresence>


        {/* Bottle Rose Image */}
        <motion.div
          className="absolute z-10 flex items-center justify-center"
          style={{ translateX: "-50%" }}
          animate={{
            width:
              currentStep === "home"
                ? 800
                : currentStep === "crimson"
                ? 200
                : currentStep === "about" || currentStep === "nutrition"
                ? 430
                : 265,
            height:
              currentStep === "home"
                ? 900
                : currentStep === "crimson"
                ? 229
                : currentStep === "about" || currentStep === "nutrition"
                ? 500
                : 288,
            rotate:
              currentStep === "home"
                ? -11
                : currentStep === "crimson"
                ? 0
                : currentStep === "about" || currentStep === "nutrition"
                ? -31
                : 0,
            top:
              currentStep === "home"
                ? "120px"
                : currentStep === "crimson"
                ? "28%"
                : currentStep === "about" || currentStep === "nutrition"
                ? "50%"
                : "66.2%",
            left:
              currentStep === "home"
                ? "55%"
                : currentStep === "crimson"
                ? "50%"
                : currentStep === "about" || currentStep === "nutrition"
                ? "85%"
                : "50%",
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
            width:
              currentStep === "home"
                ? 750
                : currentStep === "crimson"
                ? "3000px"
                : currentStep === "about" || currentStep === "nutrition"
                ? 450
                : 600,
            height:
              currentStep === "home"
                ? 750
                : currentStep === "crimson"
                ? "3000px"
                : currentStep === "about" || currentStep === "nutrition"
                ? 450
                : 600,
            left:
              currentStep === "home"
                ? "50%"
                : currentStep === "crimson"
                ? "50%"
                : currentStep === "about" || currentStep === "nutrition"
                ? "100%"
                : "50%",
            bottom:
              currentStep === "home"
                ? "-450px"
                : currentStep === "crimson"
                ? "-800px"
                : currentStep === "about" || currentStep === "nutrition"
                ? "-220px"
                : "-470px",
            rotate:
              currentStep === "home"
                ? 0
                : currentStep === "crimson"
                ? 0
                : currentStep === "about" || currentStep === "nutrition"
                ? 90
                : 0.05,
            opacity: currentStep === "review" ? 0 : 1,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
           {/* Background Circle */}
  <motion.div
    className="w-[600px] h-[600px] rounded-full border flex items-center justify-center z-0"
    animate={{ borderColor: activeBottle.color, scale: [0.95, 1, 0.95] }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <motion.div
      className="w-full h-full m-8  rounded-full"
      animate={{ backgroundColor: activeBottle.color }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  </motion.div>
        </motion.div>

        {/* Pages */}
        <AnimatePresence>
          {currentStep !== "home" && !reverse && (
            <motion.div
              className="absolute top-0 w-full h-full z-40"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 1 }}
            >
              {currentStep === "crimson" && (
                <CrimsonReserveCard onNextClick={handleCrimsonNext} onPrevClick={handleCrimsonPrev} />
              )}
              {currentStep === "about" && (
                <About onNextClick={handleAboutNext} onPrevClick={handleAboutPrev}/>
              )}
              {currentStep === "nutrition" && <NutritionPage />}
               {currentStep === "review" && (
        <Review
          onPrevClick={handleReviewPrev}
        />
      )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
