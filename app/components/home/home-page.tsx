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

// -------------------- COLORS --------------------
const colors = {
  primary: "#EB235C",
  secondary: "#55EE81",
  tertiary: "#6148E6",
  gold: "#FFB860",
  darkred: "#EF3F48",
} as const;

type ColorKey = keyof typeof colors;

// -------------------- BOTTLES --------------------
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

// -------------------- MAIN COMPONENT --------------------
export default function HomePage() {
  const params = useParams();
  const qrParam = Array.isArray(params.qrCode)
    ? params.qrCode[0]
    : params.qrCode;
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

  const handleCrimsonNext = () => navigateStep("about");
  const handleAboutNext = () => navigateStep("review");
  const handleCrimsonPrev = () => navigateStep("home");
  const handleAboutPrev = () => navigateStep("crimson");
  const handleReviewPrev = () => navigateStep("gallery");
  const handleNutritionPrev = () => navigateStep("review");
  const handleGalleryPrev = () => navigateStep("crimson");

  // Common animation transition
  const smoothTransition = {
    duration: 1.4,
    ease: [0.88, 0.01, 0.17, 0.99],
  };

  // -------------------- RETURN UI --------------------
  return (
    <div
      className="relative flex flex-col items-center justify-start bg-white overflow-hidden max-w-[500px] mx-auto h-screen"
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
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={smoothTransition}
        >
          <div className="w-[30px] h-[30px] flex items-center justify-center">
            <button
              onClick={() => setShowLanguagePopup(true)}
              className="focus:outline-none"
            >
              <Image
                src="/button-image/language-icon.svg"
                alt="language-button"
                fill
                className="object-contain"
              />
            </button>
          </div>
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
            transition={smoothTransition}
          >
            <motion.div
              className="w-full px-4"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={smoothTransition}
            >
              <LanguageToggle onClose={() => setShowLanguagePopup(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Page Title */}
      <AnimatePresence>
        {currentStep === "home" && !reverse && !showIntro && (
          <div className="absolute top-[3.5%] z-20 w-[90%] aspect-[3/1] flex items-center justify-center overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 100 }} // 👈 starts from bottom
              animate={{ opacity: 1, y: 0 }} // 👈 moves to default position
              exit={{ opacity: 0, y: 100 }} // 👈 exits downward
              transition={smoothTransition}
              className="text-center font-montagu font-semibold w-full flex items-center justify-center"
              style={{
                color: "#1C1826",
                lineHeight: "80%",
              }}
            >
              <div className="relative w-[90%] aspect-[3/1] mx-auto">
                <Image
                  alt="Vinea Logo"
                  src="/logo/logo.svg"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </motion.h1>
          </div>
        )}
      </AnimatePresence>

      {/* Home Page Button */}
      <AnimatePresence>
        {currentStep === "home" && !reverse && !showIntro && (
          <motion.div
            className="absolute top-[45%] right-3 z-50 mb-3"
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 150, opacity: 0 }}
            transition={smoothTransition}
          >
            <button
              onClick={handleStartJourney}
              className="relative overflow-hidden inline-flex items-center justify-center  px-4 py-2 rounded-[56px] text-white text-[12px] font-montagu font-semibold bg-gradient-to-t border-[#582B2B] from-[#781B35] to-[#EB235C] hover:opacity-90 transition group"
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
      <motion.div
        className="absolute z-10 flex items-center justify-center overflow-hidden"
        style={{ translateX: "-50%" }}
        initial={{
          height: "125%",
          rotate: 0,
          bottom: "-150%",
          left: "50%",
        }}
        animate={{
          height:
            currentStep === "home"
              ? "125%"
              : currentStep === "crimson"
                ? "30%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "70%"
                  : currentStep === "review"
                    ? "20%"
                    : "10%",
          aspectRatio: 0.5 / 1,
          rotate:
            currentStep === "home"
              ? -11
              : currentStep === "crimson"
                ? 0
                : currentStep === "about" || currentStep === "nutrition"
                  ? -31
                  : 0,
          bottom:
            currentStep === "home"
              ? "-40%"
              : currentStep === "crimson"
                ? "44%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "-20%"
                  : "-0%",
          left:
            currentStep === "home"
              ? "50%"
              : currentStep === "crimson"
                ? "50%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "80%"
                  : "50%",
          opacity: currentStep === "review" ? 0 : 1,
        }}
        transition={smoothTransition}
      >
        <div className="relative w-full h-full">
          <Image
            alt="bottle"
            src={activeBottle.image}
            fill
            priority
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Background Circle */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-0 flex items-center justify-center rounded-full"
        initial={{ height: "90%", rotate: 0, opacity: 0, bottom: "-180%" }}
        animate={{
          height:
            currentStep === "home"
              ? "85%"
              : currentStep === "crimson"
                ? "150%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "60%"
                  : "40%",
          aspectRatio: 1 / 1,
          left:
            currentStep === "home"
              ? "50%"
              : currentStep === "crimson"
                ? "50%"
                : currentStep === "about"
                  ? "95%"
                  : currentStep === "nutrition"
                    ? "100%"
                    : "10%",
          bottom:
            currentStep === "home"
              ? "-35%"
              : currentStep === "crimson"
                ? "-25%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "-25%"
                  : "-38%",
          rotate:
            currentStep === "home"
              ? 5
              : currentStep === "crimson"
                ? 0
                : currentStep === "about" || currentStep === "nutrition"
                  ? 0
                  : 0,
          opacity: currentStep === "review" ? 0 : 1,
        }}
        transition={smoothTransition}
      >
        <Image
          alt="Circle"
          className="object-contain w-full h-full"
          height={1000}
          src={activeBottle.bgImage}
          width={1000}
        />
      </motion.div>

      {/* Pages */}
      <AnimatePresence>
        {currentStep !== "home" && !reverse && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 w-full h-screen z-40 overflow-hidden max-h-screen"
            exit={{ opacity: 0, y: 100 }}
            initial={{ opacity: 0, y: 100 }}
            transition={smoothTransition}
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
            {currentStep === "nutrition" && (
              <NutritionPage onPrevClick={handleNutritionPrev} />
            )}
            {currentStep === "review" && (
              <ReviewPage
                onPrevClick={handleReviewPrev}
                onNavigationVisibilityChange={setShowNavigation}
              />
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
