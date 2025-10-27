"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import NavigationBar from "../navigation_bar/nav-page";
import LanguageToggle from "../language_toggle/language-page";
import CrimsonPage from "../crimson-reserve/crimson-page";
import AboutPage from "../about/about-page";
import ReviewPage from "../review/review-page";
import GalleryPage from "../gallery/gallery-page";
import NutritionPage from "../nutrition/nutrition-page";
import MoreDetails from "../about/more_details";

// -------------------- COLORS --------------------
type ColorKey = "primary" | "secondary" | "tertiary" | "gold" | "darkred";

const colors: Record<ColorKey, string> = {
  primary: "#252C00",
  secondary: "#55EE81",
  tertiary: "#6148E6",
  gold: "#FFB860",
  darkred: "#EF3F48",
} as const;

// -------------------- BOTTLES --------------------
// const bottles: Record<
//   string,
//   { colorKey: ColorKey; image: string; bgImage: string }
// > = {
//   "atla-vine": {
//     colorKey: "primary",
//     image: "assets/brandini/vinea/image_1.svg",
//     bgImage: "/assets/brandini/shape-svg/circle-shape.svg",
//   },
// };

// -------------------- MAIN COMPONENT --------------------
export default function HomePage() {
  const _router = useRouter();
  const params = useParams();
  // const qrParam = Array.isArray(params.qrCode)
  //   ? params.qrCode[0]
  //   : params.qrCode;
  // const qrCode = qrParam?.toLowerCase() || "atla-vine";

  // const [activeBottle, setActiveBottle] = useState<{
  //   bgImage: string | StaticImageData;
  //   colorKey: ColorKey;
  //   image: string | StaticImageData;
  // }>(bottles[qrCode] || bottles["atla-vine"]);

  const [currentStep, setCurrentStep] = useState<
    | "home"
    | "crimson"
    | "about"
    | "review"
    | "nutrition"
    | "gallery"
    | "more_details"
  >("home");

  const [reverse, setReverse] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);

  // Set bottle based on QR code
  // useEffect(() => {
  //   if (bottles[qrCode]) setActiveBottle(bottles[qrCode]);
  // }, [qrCode]);

  // Hide intro after 1.5s
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1500);

    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const handleStartJourney = () => {
    setCurrentStep("crimson");
    setNavStack(["home", "crimson"]);
  };

  const handleCrimsonNext = () => navigateStep("about");
  const handleAboutNext = () => navigateStep("more_details");

  const navigateStep = (nextStep: typeof currentStep, delay = 800) => {
    setReverse(true);
    setTimeout(() => {
      setNavStack((prev) => [...prev, nextStep]); // push new page
      setCurrentStep(nextStep);
      setReverse(false);
    }, delay);
  };

  const [navStack, setNavStack] = useState<string[]>(["home"]);

  const goBack = (delay = 800) => {
    setReverse(true);
    setTimeout(() => {
      setNavStack((prev) => {
        if (prev.length <= 1) return prev; // if already at first page, stay
        const newStack = prev.slice(0, -1); // remove last page
        const previousStep = newStack[newStack.length - 1];
        setCurrentStep(previousStep as typeof currentStep);
        return newStack;
      });
      setReverse(false);
    }, delay);
  };

  // Common animation transition
  const smoothTransition = {
    duration: currentStep === "review" || currentStep === "gallery" ? 0 : 1.5,
    ease:
      currentStep === "review" || currentStep === "gallery"
        ? "linear"
        : [0.88, 0.01, 0.17, 0.99],
  };


  // -------------------- RETURN UI --------------------
  return (
    <div
      className="relative flex flex-col items-center justify-start bg-white overflow-hidden max-w-[500px] mx-auto h-screen"
      style={{ height: "100vh" }}
    >
      {/* Navigation Bar */}
      {currentStep !== "home" && showNavigation && (
        <NavigationBar
          activeStep={currentStep as any}
          onStepChange={(nextStep) => {
            if (nextStep !== currentStep) navigateStep(nextStep);
          }}
        />
      )}

      {/* Language Button */}
      {currentStep === "home" && (
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-4 left-4 z-50"
          exit={{ x: -150, opacity: 0 }}
          initial={{ x: -150, opacity: 0 }}
          transition={smoothTransition}
        >
          <button
            className="focus:outline-none group relative flex items-center justify-center rounded-full hover:bg-white p-2 cursor-pointer"
            style={{
              width: "clamp(30px, 8vw, 38px)", // responsive size (min 28px, max 38px)
              height: "clamp(30px, 8vw, 38px)",
            }}
            onClick={() => setShowLanguagePopup(true)}
          >
            <Image
              fill
              priority
              alt="language-button"
              className="object-contain p-[4px]"
              sizes="(max-width: 768px) 30px, (max-width: 1200px) 36px, 38px"
              src="/button-image/language-icon.svg"
            />
          </button>
        </motion.div>
      )}

      {/* Language Popup */}
      <AnimatePresence>
        {showLanguagePopup && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={smoothTransition}
          >
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="w-full px-4"
              exit={{ scale: 0.85, opacity: 0 }}
              initial={{ scale: 0.85, opacity: 0 }}
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
              animate={{ opacity: 1, y: 0 }}
              className="text-center font-montagu font-semibold w-full flex items-center justify-center"
              exit={{ opacity: 0, y: 100 }}
              initial={{ opacity: 0, y: 100 }}
              style={{
                color: "#1C1826",
                lineHeight: "80%",
              }}
              transition={smoothTransition}
            >
              <div className="relative w-[80%] aspect-[2.7/1] mx-auto">
                <Image
                  fill
                  priority
                  alt="Brandini Logo"
                  className="object-contain"
                  src="/assets/brandini/logo/brandini_logo.svg"
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
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-[45%] right-3 z-50 mb-3"
            exit={{ x: 150, opacity: 0 }}
            initial={{ x: 150, opacity: 0 }}
            transition={smoothTransition}
          >
            <button
              className="relative cursor-pointer overflow-hidden inline-flex items-center justify-center border-1  px-4 py-2 rounded-[56px] text-white text-[12px] font-montagu font-semibold bg-gradient-to-t border-[#582B2B] from-[#252C00] to-[#252c00d0] hover:opacity-90 transition group"
              onClick={handleStartJourney}
            >
              <span className="relative flex items-center">Explore More</span>
              <Image
                alt="arrow"
                className="ml-2 z-10"
                height={14}
                src="/button-image/arrow-up-right.svg"
                width={14}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottle Image */}
      <motion.div
        animate={{
          height:
            currentStep === "home"
              ? "100%"
              : currentStep === "crimson"
                ? "30%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "70%"
                  : currentStep === "review"
                    ? "20%"
                    : currentStep === "more_details"
                      ? "95%"
                      : "10%",
          aspectRatio: 0.5 / 1,
          rotate:
            currentStep === "home"
              ? -14
              : currentStep === "more_details"
                ? -23
                : currentStep === "crimson"
                  ? 0
                  : currentStep === "about" || currentStep === "nutrition"
                    ? -31
                    : 0,
          bottom:
            currentStep === "home"
              ? "-16%"
              : currentStep === "crimson"
                ? "44%"
                : currentStep === "about"
                  ? "-15%"
                  : currentStep === "nutrition"
                    ? "-20%"
                    : currentStep === "more_details"
                      ? "-10%"
                      : "7%",
          left:
            currentStep === "home"
              ? "53%"
              : currentStep === "crimson"
                ? "50%"
                : currentStep === "about"
                  ? "74%"
                  : currentStep === "nutrition"
                    ? "75%"
                    : currentStep === "more_details"
                      ? "55%"
                      : "50%",
          opacity:
            currentStep === "review" || currentStep === "gallery"
              ? 0
              : currentStep === "more_details"
                ? 0.4
                : 1,
        }}
        className="absolute z-10 flex items-center justify-center overflow-hidden pt-0 xs:pt-2 sm:pt-8 md:pt-10 "
        initial={{
          height: "125%",
          rotate: 0,
          bottom: "-150%",
          left: "50%",
        }}
        style={{ translateX: "-50%" }}
        transition={smoothTransition}
      >
        <div className="relative w-full h-full">
          <Image
            fill
            priority
            alt="bottle"
            className="object-contain"
            src="/assets/brandini/vinea/image_1.svg"
          />
        </div>
      </motion.div>

      {/* Background Circle */}
      <motion.div
        animate={{
          height:
            currentStep === "home"
              ? "85%"
              : currentStep === "crimson"
                ? "200%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "60%"
                  : currentStep === "more_details"
                    ? 0
                    : "60%",
          aspectRatio: 1 / 1,
          left:
            currentStep === "home"
              ? "50%"
              : currentStep === "crimson"
                ? "50%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "95%"
                  : "50%",
          bottom:
            currentStep === "home"
              ? "-37%"
              : currentStep === "crimson"
                ? "-35%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "-25%"
                  : currentStep === "more_details"
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
          opacity:
            currentStep === "review" || currentStep === "gallery"
              ? 0
              : currentStep === "more_details"
                ? 0.6
                : 1,
        }}
        className="absolute left-1/2 -translate-x-1/2 z-0 flex items-center justify-center rounded-full"
        initial={{ height: "90%", rotate: 0, opacity: 0, bottom: "-270%" }}
        transition={smoothTransition}
      >
        <Image
          alt="Circle"
          className="object-contain w-full h-full"
          height={1000}
          src="/assets/brandini/shape-svg/circle-shape.svg"
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
                onPrevClick={goBack}
              />
            )}
            {currentStep === "about" && (
              <AboutPage onNextClick={handleAboutNext} onPrevClick={goBack} />
            )}
            {currentStep === "more_details" && (
              <MoreDetails onPrevClick={goBack} />
            )}
            {currentStep === "nutrition" && (
              <NutritionPage onPrevClick={goBack} />
            )}
            {currentStep === "review" && (
              <ReviewPage
                onNavigationVisibilityChange={setShowNavigation}
                onPrevClick={goBack}
              />
            )}
            {currentStep === "gallery" && <GalleryPage onPrevClick={goBack} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
