"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import CrimsonPage from "../crimson-reserve/page";
import AboutPage from "../about/page";
import ReviewPage from "../review/page";
import NutritionPage from "../nutrition/page";
import NavigationBar from "../navigation_bar/page";
import GalleryPage from "../gallery/page";

const colors = {
  primary: "#EB235C", // pinkish red
  secondary: "#55EE81", // green
  tertiary: "#6148E6", // purple
  gold: "#FFB860", // yellow-gold
  darkred: "#EF3F48", // red
} as const;

type ColorKey = keyof typeof colors;

const bottles: Record<string, { colorKey: ColorKey; image: string }> = {
  "rose-vine": { colorKey: "primary", image: "/vinea/Rose.svg" },
  "gold-vine": { colorKey: "gold", image: "/vinea/Gold.svg" },
  "green-vine": { colorKey: "secondary", image: "/vinea/Green.svg" },
  "purple-vine": { colorKey: "tertiary", image: "/vinea/Purple.svg" },
  "red-vine": { colorKey: "darkred", image: "/vinea/Red.svg" },
};

export default function HomePage() {
  const params = useParams();
  const qrParam = Array.isArray(params.qrCode)
    ? params.qrCode[0]
    : params.qrCode;
  const qrCode = qrParam?.toLowerCase() || "rose-vine";

  const [activeBottle, setActiveBottle] = useState<{
    colorKey: ColorKey;
    image: string;
  }>(bottles[qrCode] || bottles["rose-vine"]);

  useEffect(() => {
    if (bottles[qrCode]) setActiveBottle(bottles[qrCode]);
  }, [qrCode]);

  const [currentStep, setCurrentStep] = useState<
    "home" | "crimson" | "about" | "review" | "nutrition" | "gallery"
  >("home");
  const [reverse, setReverse] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Only allow scrolling on crimson page, prevent on all others
    if (currentStep === "crimson" && !reverse) {
      // Allow scrolling only on crimson page
      html.style.overflow = "auto";
      html.style.height = "auto";
      html.style.position = "static";
      html.style.width = "auto";
      html.style.top = "auto";
      html.style.left = "auto";
      
      body.style.overflow = "auto";
      body.style.height = "auto";
      body.style.position = "static";
      body.style.width = "auto";
      body.style.top = "auto";
      body.style.left = "auto";
      body.style.margin = "";
      body.style.padding = "";
    } else {
      // Prevent scrolling on all other pages (home, about, review, nutrition) and during transitions
      html.style.overflow = "hidden";
      html.style.height = "100vh";
      html.style.position = "fixed";
      html.style.width = "100%";
      html.style.top = "0";
      html.style.left = "0";
      html.style.touchAction = "none";
      html.style.overscrollBehavior = "none";
      
      body.style.overflow = "hidden";
      body.style.height = "100vh";
      body.style.position = "fixed";
      body.style.width = "100%";
      body.style.top = "0";
      body.style.left = "0";
      body.style.margin = "0";
      body.style.padding = "0";
      body.style.touchAction = "none";
      body.style.overscrollBehavior = "none";
    }

    // Cleanup function
    return () => {
      html.style.overflow = "auto";
      html.style.height = "auto";
      html.style.position = "static";
      html.style.width = "auto";
      html.style.top = "auto";
      html.style.left = "auto";
      
      body.style.overflow = "auto";
      body.style.height = "auto";
      body.style.position = "static";
      body.style.width = "auto";
      body.style.top = "auto";
      body.style.left = "auto";
      body.style.margin = "";
      body.style.padding = "";
    };
  }, [currentStep, reverse]);

  // Navigation handlers
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
      setCurrentStep("home");
      setReverse(false);
    }, 800);
  };
  const handleAboutPrev = () => {
    setReverse(true);
    setTimeout(() => {
      setCurrentStep("crimson");
      setReverse(false);
    }, 800);
  };
  const handleReviewPrev = () => {
    setReverse(true);
    setTimeout(() => {
      setCurrentStep("about");
      setReverse(false);
    }, 800);
  };
  const handleGalleryPrev = () => {
    setReverse(true);
    setTimeout(() => {
      setCurrentStep("gallery");
      setReverse(false);
    }, 800);
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-start bg-white overflow-hidden max-w-[500px] mx-auto" 
      style={{ 
        height: "100vh",
        touchAction: currentStep === "home" ? "none" : "auto",
        overscrollBehavior: currentStep === "home" ? "none" : "auto"
      }}
    >
      {currentStep !== "home" && (
        <NavigationBar
          onStepChange={setCurrentStep}
          activeStep={currentStep}
        />
      )}

      {/* Home Page Title */}
      <AnimatePresence>
        {currentStep === "home" && !reverse && !showIntro && (
          <motion.h1
            className="text-center font-montagu font-semibold absolute top-[4rem] z-20"
            style={{ color: "#1C1826", fontSize: "66.94px", lineHeight: "80%" }}
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
  className="relative overflow-hidden inline-flex items-center justify-center px-4 py-2 rounded-[56px] text-white text-[12px] font-montagu font-semibold bg-gradient-to-t border-[#582B2B] from-[#781B35] to-[#EB235C] hover:opacity-90 transition group"
>
              <span className="relative flex items-center">
                Explore More
               
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        {/* Bottle Image */}
        {/* Bottle Image */}
        <motion.div
          className="absolute z-10 flex items-center justify-center"
          style={{ translateX: "-50%" }}
          animate={{
            width:
              currentStep === "home"
                ? 900
                : currentStep === "crimson"
                  ? "50%"
                  : currentStep === "about" || currentStep === "nutrition"
                    ? 430
                    : 265,
            height:
              currentStep === "home"
                ? 1000
                : currentStep === "crimson"
                  ? "auto"
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
                  ? "24%"
                  : currentStep === "about" || currentStep === "nutrition"
                    ? "55%"
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
          {" "}
          <Image
            src={activeBottle.image}
            alt="bottle"
            width={1087}
            height={1183}
            className="object-contain w-full h-full"
          />{" "}
        </motion.div>
      </div>

      {/* Background Circle */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-0 flex items-center justify-center rounded-full"
        initial={{ width: 850, height: 850, rotate: 0 }}
        animate={{
          width:
            currentStep === "home"
              ? 750
              : currentStep === "crimson"
                ? 3000
                : currentStep === "about" || currentStep === "nutrition"
                  ? 450
                  : 600,
          height:
            currentStep === "home"
              ? 750
              : currentStep === "crimson"
                ? 3000
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
              ? "-55%"
              : currentStep === "crimson"
                ? "-80%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "-20%"
                  : "-35%",
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
        <motion.div
          className="w-full h-full rounded-full border flex items-center justify-center z-0 py-4"
          animate={{
            borderColor: colors[activeBottle.colorKey],
            scale: [0.95, 1, 0.95],
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full h-full rounded-full m-4"
            animate={{ backgroundColor: colors[activeBottle.colorKey] }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Pages */}
      <AnimatePresence>
        {currentStep !== "home" && !reverse && (
          <motion.div
            className="absolute top-0 w-full h-screen z-40 overflow-hidden max-h-screen"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 1 }}
          >
            {currentStep === "crimson" && (
              <CrimsonPage
                onNextClick={handleCrimsonNext}
                onPrevClick={handleCrimsonPrev}
              />
            )}
            {currentStep === "about" && (
              <AboutPage
                onNextClick={handleAboutNext}
                onPrevClick={handleAboutPrev}
              />
            )}
            {currentStep === "nutrition" && <NutritionPage />}
            {currentStep === "review" && (
              <ReviewPage onPrevClick={handleReviewPrev} />
            )}
            {currentStep === "gallery" && (
              <GalleryPage onPrevClick={handleGalleryPrev} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
