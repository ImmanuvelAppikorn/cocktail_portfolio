"use client";

import Image from "next/image";
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

  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Allow scrolling on home and crimson pages, prevent on others
    if ((currentStep === "home" || currentStep === "crimson") && !reverse) {
      // Allow scrolling on home and crimson pages
      html.style.overflow = "auto";
      html.style.height = "auto";
      html.style.position = "static";
      html.style.width = "auto";
      html.style.top = "auto";
      html.style.left = "auto";
      html.style.touchAction = "auto";
      html.style.overscrollBehavior = "auto";

      body.style.overflow = "auto";
      body.style.height = "auto";
      body.style.position = "static";
      body.style.width = "auto";
      body.style.top = "auto";
      body.style.left = "auto";
      body.style.margin = "";
      body.style.padding = "";
      body.style.touchAction = "auto";
      body.style.overscrollBehavior = "auto";
    } else {
      // Prevent scrolling on other pages (about, review, nutrition) and during transitions
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
        touchAction: (currentStep === "home" || currentStep === "crimson") ? "auto" : "none",
        overscrollBehavior: (currentStep === "home" || currentStep === "crimson") ? "auto" : "none",
      }}
    >
      {currentStep !== "home" && (
        <NavigationBar activeStep={currentStep} onStepChange={setCurrentStep} />
      )}

      {/* pop up screen button (language button) */}
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
        src={"/button-image/language-icon.svg"}
        alt="language-button"
        width={23}
        height={23}
      />
    </button>
  </motion.div>
)}

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
              className="w-full px-4" // full width with padding
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
            className="text-center font-montagu font-semibold absolute top-[5%] z-20"
            exit={{ opacity: 0, y: -200 }}
            initial={{ opacity: 0, y: -50 }}
            style={{ color: "#1C1826", fontSize: "66.94px", lineHeight: "80%" }}
            transition={{ duration: 1 }}
          >
            <Image
              alt="Vinea Logo"
              className="mx-auto"
              height={68}
              src={"/logo/logo.svg"}
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
      initial={{ x: 60, opacity: 0 }} // start off-screen right
      animate={{ x: 0, opacity: 1 }}  // move to default position
      exit={{ x: 60, opacity: 0 }}    // optional: slide out right on exit
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <button
        className="relative overflow-hidden inline-flex items-center justify-center px-4 py-2 rounded-[56px] text-white text-[12px] font-montagu font-semibold bg-gradient-to-t border-[#582B2B] from-[#781B35] to-[#EB235C] hover:opacity-90 transition group border-1"
        onClick={handleStartJourney}
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

      <div className="relative w-full h-screen flex flex-col items-center justify-center">
        {/* Bottle Image */}

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
                     :currentStep === "nutrition"
                    ?"90%" 
                    : 225,
            height:
              currentStep === "home"
                ? "auto"
                : currentStep === "crimson"
                  ? "auto"
                  : currentStep === "about" 
                    ? "auto"
                     :currentStep === "nutrition"
                    ?"auto" 
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
        initial={{
          width: 750,
          height: 750,
          rotate: 0,
          opacity: 0,
          bottom: "-80%",
        }}
        animate={{
          width:
            currentStep === "home"
              ? "150%"
              : currentStep === "crimson"
                ? 3000
                : currentStep === "about"
                  ? 450
                   :currentStep === "nutrition"
                    ?350 
                  : 350,
          height:
            currentStep === "home"
              ? "100%"
              : currentStep === "crimson"
                ? 3000
                : currentStep === "about"
                  ? 450
                   :currentStep === "nutrition"
                    ?350 
                  : 350,
          left:
            currentStep === "home"
              ? "50%"
              : currentStep === "crimson"
                ? "50%"
                : currentStep === "about" 
                  ? "95%"
                   :currentStep === "nutrition"
                    ?"100%" 
                  : "50%",
          bottom:
            currentStep === "home"
              ? "-50%"
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
        <motion.div
          animate={{
            borderColor: colors[activeBottle.colorKey],
            scale: [0.95, 1, 0.95],
          }}
          className="w-full h-full rounded-full border flex items-center justify-center z-0 py-4"
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ backgroundColor: colors[activeBottle.colorKey] }}
            className="w-full h-full rounded-full m-4 "
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
         
        </motion.div>
        </motion.div>
      </motion.div>

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
