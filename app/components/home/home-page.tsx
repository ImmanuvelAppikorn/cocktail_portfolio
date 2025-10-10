"use client";

import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import NavigationBar from "../navigation_bar/nav-page";
import LanguageToggle from "../language_toggle/language-page";
import CrimsonPage from "../crimson-reserve/crimson-page";
import AboutPage from "../about/about-page";
import ReviewPage from "../review/review-page";
import GalleryPage from "../gallery/gallery-page";
import NutritionPage from "../nutrition/nutrition-page";

// Colors
const colors = {
  primary: "#EB235C", // pinkish red
  secondary: "#55EE81", // green
  tertiary: "#6148E6", // purple
  gold: "#FFB860", // yellow-gold
  darkred: "#EF3F48", // red
} as const;

type ColorKey = keyof typeof colors;

// Bottles
const bottles: Record<
  string,
  { colorKey: ColorKey; image: string; bgImage: string }
> = {
  "rose-vine": {
    colorKey: "primary",
    image: "/vinea/Rose.svg",
    bgImage: "/shape-svg/circle-shape.svg",
  },
  "gold-vine": {
    colorKey: "gold",
    image: "/vinea/Gold.svg",
    bgImage: "/shape-svg/circle-shape.svg",
  },
  "green-vine": {
    colorKey: "secondary",
    image: "/vinea/Green.svg",
    bgImage: "/shape-svg/circle-shape.svg",
  },
  "purple-vine": {
    colorKey: "tertiary",
    image: "/vinea/Purple.svg",
    bgImage: "/shape-svg/circle-shape.svg",
  },
  "red-vine": {
    colorKey: "darkred",
    image: "/vinea/Red.svg",
    bgImage: "/shape-svg/circle-shape.svg",
  },
};

export default function HomePage() {
  const params = useParams();
  const qrParam = Array.isArray(params.qrCode) ? params.qrCode[0] : params.qrCode;
  const qrCode = qrParam?.toLowerCase() || "rose-vine";

  const [activeBottle, setActiveBottle] = useState<{
    bgImage: string | StaticImageData;
    colorKey: ColorKey;
    image: string | StaticImageData;
  }>(bottles[qrCode] || bottles["rose-vine"]);

  const [currentStep, setCurrentStep] = useState<
    "home" | "crimson" | "about" | "review" | "nutrition" | "gallery"
  >("home");

  const [reverse, setReverse] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);

  // Set bottle based on QR code
  useEffect(() => {
    if (bottles[qrCode]) setActiveBottle(bottles[qrCode]);
  }, [qrCode]);

  // Hide intro after 1.5s
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const handleStartJourney = () => setCurrentStep("crimson");

  const navigateStep = (nextStep: typeof currentStep, delay = 800) => {
    setReverse(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setReverse(false);
    }, delay);
  };

  const handleCrimsonNext = () => navigateStep("about", 1200);
  const handleAboutNext = () => navigateStep("review");
  const handleCrimsonPrev = () => navigateStep("home");
  const handleAboutPrev = () => navigateStep("crimson");
  const handleReviewPrev = () => navigateStep("about");
  const handleGalleryPrev = () => navigateStep("gallery");

  return (
    <div
      className="relative flex flex-col items-center justify-start bg-white overflow-hidden max-w-[500px] mx-auto"
      style={{ height: "100vh" }}
    >
      {/* Navigation Bar */}
      {currentStep !== "home" && showNavigation && (
        <NavigationBar activeStep={currentStep} onStepChange={setCurrentStep} />
      )}

      {/* Language Button */}
      {currentStep === "home" && (
        <motion.div
          className="absolute top-4 left-4 z-50"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={() => setShowLanguagePopup(true)}
            className="focus:outline-none"
          >
            <Image
              src="/button-image/language-icon.svg"
              alt="language-button"
              width={23}
              height={23}
            />
          </button>
        </motion.div>
      )}

      {/* Language Popup */}
      <AnimatePresence>
        {showLanguagePopup && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full px-4"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LanguageToggle onClose={() => setShowLanguagePopup(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Page Title */}
      <AnimatePresence>
        {currentStep === "home" && !reverse && !showIntro && (
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -200 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="text-center font-montagu font-semibold absolute top-[3%] z-20"
            style={{ color: "#1C1826", fontSize: "66.94px", lineHeight: "80%" }}
          >
            <Image
              alt="Vinea Logo"
              className="mx-auto"
              height={68}
              src="/logo/logo.svg"
              width={250}
            />
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Home Page Button */}
      <AnimatePresence>
        {currentStep === "home" && !reverse && !showIntro && (
          <motion.div
            className="absolute top-[45%] right-3 z-50"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <button
              onClick={handleStartJourney}
              className="relative overflow-hidden inline-flex items-center justify-center px-4 py-2 rounded-[56px] text-white text-[12px] font-montagu font-semibold bg-gradient-to-t border-[#582B2B] from-[#781B35] to-[#EB235C] hover:opacity-90 transition group"
            >
              <span className="relative flex items-center">Explore More</span>
              <Image
                src="/button-image/arrow-up-right.svg"
                alt="arrow"
                width={14}
                height={14}
                className="ml-2 z-10"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottle Image */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        <motion.div
          className="absolute z-10 flex items-center justify-center"
          style={{ translateX: "-50%" }}
          initial={{
            width: 900,
            height: 1000,
            rotate: -11,
            top: 640,
            left: "55%",
          }}
          animate={{
            width:
              currentStep === "home"
                ? "210%"
                : currentStep === "crimson"
                ? "50%"
                : currentStep === "about"
                ? "115%"
                : currentStep === "nutrition"
                ? "90%"
                : 225,
            height:
              currentStep === "home"
                ? "auto"
                : currentStep === "crimson"
                ? "auto"
                : currentStep === "about"
                ? "auto"
                : currentStep === "nutrition"
                ? "auto"
                : 244,
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
                : currentStep === "about"
                ? "50%"
                : currentStep === "nutrition"
                ? "65%"
                : "66.2%",
            left:
              currentStep === "home"
                ? "60%"
                : currentStep === "crimson"
                ? "50%"
                : currentStep === "about"
                ? "80%"
                : currentStep === "nutrition"
                ? "90%"
                : "50%",
            opacity: currentStep === "review" ? 0 : 1,
          }}
          transition={{ duration: 1 }}
        >
          <Image
            alt="bottle"
            className="object-contain w-full h-full"
            height={1183}
            src={activeBottle.image}
            width={1087}
          />
        </motion.div>
      </div>

      {/* Background Circle */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-0 flex items-center justify-center rounded-full"
        initial={{ scale: 5, rotate: 0, opacity: 0, bottom: "-80%" }}
        animate={{
          width:
            currentStep === "home"
              ? "40%"
              : currentStep === "crimson"
              ? 3000
              : currentStep === "about"
              ? 450
              : currentStep === "nutrition"
              ? 350
              : 350,
         aspectRatio:1/1,
          left:
            currentStep === "home"
              ? "50%"
              : currentStep === "crimson"
              ? "50%"
              : currentStep === "about"
              ? "95%"
              : currentStep === "nutrition"
              ? "100%"
              : "50%",
          bottom:
            currentStep === "home"
              ? "-10%"
              : currentStep === "crimson"
              ? "-195%"
              : currentStep === "about" || currentStep === "nutrition"
              ? "-20%"
              : "-38%",
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
        <Image
          alt="Circle"
          className="object-contain w-full h-full"
          height={1000}
          src={activeBottle.bgImage}
          width={1000}
        />
      </motion.div>

      {/* Crimson Background Blur */}
      {currentStep === "crimson" && (
        <div className="absolute top-1/2 -translate-y-1/2 w-[50%] aspect-square bg-[#FFB2C8] blur-[90px] rounded-full z-0" />
      )}

      {/* Pages */}
      <AnimatePresence>
        {currentStep !== "home" && !reverse && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 w-full h-screen z-40 overflow-hidden max-h-screen"
            exit={{ opacity: 0, y: 100 }}
            initial={{ opacity: 0, y: 100 }}
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
              <ReviewPage 
                onPrevClick={handleReviewPrev}
                onNavigationVisibilityChange={setShowNavigation}
              />
            )}
            {currentStep === "gallery" && <GalleryPage onPrevClick={handleGalleryPrev} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
