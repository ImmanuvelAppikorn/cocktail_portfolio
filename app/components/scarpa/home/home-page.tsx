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
import { useRouter } from "next/navigation";
import MoreDetails from "../about/more_details";

// -------------------- COLORS --------------------
type ColorKey = "primary" | "secondary" | "tertiary" | "gold" | "darkred";

const colors: Record<ColorKey, string> = {
  primary: "#D8CCB4",
  secondary: "#BF062F",
  tertiary: "#6148E6",
  gold: "#FFB860",
  darkred: "#EF3F48",
} as const;

// -------------------- BOTTLES --------------------
// const bottles: Record<
//   string,
//   { colorKey: ColorKey; image: string; bgImage: string }
// > = {
//   "scarpa-vine": {
//     colorKey: "primary",
//     image: "assets/scapra/bottles/bottle_1.svg",
//     bgImage: "assets/scapra/shape-svg/circle_shape.svg",
//   },
  // "gold-vine": {
  //   colorKey: "gold",
  //   image: "/vinea/Gold.svg",
  //   bgImage: "/shape-svg/circle-shape.svg",
  // },
  // "green-vine": {
  //   colorKey: "secondary",
  //   image: "/vinea/Green.svg",
  //   bgImage: "/shape-svg/circle-shape.svg",
  // },
  // "purple-vine": {
  //   colorKey: "tertiary",
  //   image: "/vinea/Purple.svg",
  //   bgImage: "/shape-svg/circle-shape.svg",
  // },
  // "red-vine": {
  //   colorKey: "darkred",
  //   image: "/vinea/Red.svg",
  //   bgImage: "/shape-svg/circle-shape.svg",
  // },
// };

// -------------------- MAIN COMPONENT --------------------
export default function HomePage() {
  const _router = useRouter();
  const params = useParams();
  // const qrParam = Array.isArray(params.qrCode)
  //   ? params.qrCode[0]
  //   : params.qrCode;
  // const qrCode = qrParam?.toLowerCase() || "scarpa-vine";

  // const [activeBottle, setActiveBottle] = useState<{
  //   bgImage: string | StaticImageData;
  //   colorKey: ColorKey;
  //   image: string | StaticImageData;
  // }>(bottles[qrCode] || bottles["scarpa-vine"]);

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
  const handleStartJourney = () => setCurrentStep("crimson");

  const navigateStep = (nextStep: typeof currentStep, delay = 800) => {
    setReverse(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setReverse(false);
    }, delay);
  };

  const handleCrimsonNext = () => navigateStep("about");
  const handleAboutNext = () => navigateStep("more_details");
  const handleCrimsonPrev = () => navigateStep("home");
  const handleAboutPrev = () => navigateStep("crimson");
  const handleReviewPrev = () => navigateStep("gallery");
  const handleNutritionPrev = () => navigateStep("review");
  const handleGalleryPrev = () => navigateStep("crimson");

  // Common animation transition
  const smoothTransition = {
    duration: currentStep === "review" ? 0 : 1.5, // Instant for review page
    ease: currentStep === "review" ? "linear" : [0.88, 0.01, 0.17, 0.99],
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
          onStepChange={setCurrentStep}
        />
      )}

      {/* Language Button */}
      {currentStep === "home" && (
        <motion.div
          className="absolute top-4 left-4 z-50"
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -150, opacity: 0 }}
          transition={smoothTransition}
        >
          <button
            onClick={() => setShowLanguagePopup(true)}
            className="focus:outline-none group relative flex items-center justify-center rounded-full hover:bg-white p-2 cursor-pointer"
            style={{
              width: "clamp(30px, 8vw, 38px)", // responsive size (min 28px, max 38px)
              height: "clamp(30px, 8vw, 38px)",
            }}
          >
            <Image
              src="/button-image/language-icon.svg"
              alt="language-button"
              fill
              className="object-contain p-[4px]"
              sizes="(max-width: 768px) 30px, (max-width: 1200px) 36px, 38px"
              priority
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
          <div className="absolute top-[3.5%] z-20 w-[90%] h-auto flex items-center justify-center overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={smoothTransition}
              className="text-center font-montagu font-semibold w-full flex items-center justify-center"
              style={{
                color: "#1C1826",
                lineHeight: "80%",
              }}
            >
              <div className="relative w-full aspect-[2.1/1] mx-auto">
                <Image
                  alt="Scarpa Logo"
                  src="assets/scapra/logo/logo.svg"
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
              className="relative cursor-pointer overflow-hidden inline-flex items-center justify-center border-1  px-4 py-2 rounded-[56px] text-white text-[12px] font-montagu font-semibold bg-gradient-to-t border-[#826026] bg-[linear-gradient(to_top,_#D8CCB4_100%,_#D8CCB4_36%)] hover:opacity-90 transition group"
            >
              <span className="relative flex items-center text-[#BF062F]">
                Explore More
              </span>
              <Image
                src="assets/scapra/button-image/arrow-up-right.svg"
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
        className="absolute z-10 flex items-center justify-center overflow-hidden pt-0 xs:pt-2 sm:pt-8 md:pt-10 "
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
              ? "90%"
              : currentStep === "crimson"
                ? "30%"
                : currentStep === "about"
                  ? "75%"
                  : currentStep === "nutrition"
                    ? "72%"
                    : currentStep === "review"
                      ? "20%"
                      : currentStep === "more_details"
                        ? "95%"
                        : "10%",
          aspectRatio: 0.5 / 1,
          rotate:
            currentStep === "home"
              ? -11
              : currentStep === "crimson"
                ? 0
                : currentStep === "about" || currentStep === "nutrition"
                  ? -27
                  : currentStep === "more_details"
                    ? -20
                    : 0,
          bottom:
            currentStep === "home"
              ? "-12%"
              : currentStep === "crimson"
                ? "44%"
                : currentStep === "about"
                  ? "-10%"
                  : currentStep === "nutrition"
                    ? "-20%"
                    : currentStep === "more_details"
                      ? "-10%"
                      : "7%",
          left:
            currentStep === "home"
              ? "50%"
              : currentStep === "crimson"
                ? "50%"
                : currentStep === "about"
                  ? "70%"
                  : currentStep === "nutrition"
                    ? "75%"
                    : currentStep === "more_details"
                      ? "62%"
                      : "50%",
          opacity:
            currentStep === "review"
              ? 0
              : currentStep === "more_details"
                ? 0.4
                : 1,
        }}
        transition={smoothTransition}
      >
        <div className="relative w-full h-full">
          <Image
            alt="bottle"
            src="assets/scapra/bottles/bottle_1.svg"
            fill
            priority
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* Background Circle */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-0 flex items-center justify-center rounded-full"
        initial={{ height: "90%", rotate: 0, opacity: 0, bottom: "-270%" }}
        animate={{
          height:
            currentStep === "home"
              ? "95%"
              : currentStep === "crimson"
                ? "200%"
                : currentStep === "about" || currentStep === "nutrition"
                  ? "80%"
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
                  ? "90%"
                  : "50%",
          bottom:
            currentStep === "home"
              ? "-43%"
              : currentStep === "crimson"
                ? "-40%"
                : currentStep === "about"
                  ? "-25%"
                  : currentStep === "nutrition"
                    ? "-35%"
                    : currentStep === "more_details"
                      ? "-25%"
                      : "-38%",
          rotate:
            currentStep === "home"
              ? 5
              : currentStep === "crimson"
                ? 0
                : currentStep === "about" || currentStep === "nutrition"
                  ? -20
                  : 0,
          opacity:
            currentStep === "review"
              ? 0
              : currentStep === "more_details"
                ? 0.6
                : 1,
        }}
        transition={smoothTransition}
      >
        <Image
          alt="Circle"
          className="object-contain w-full h-full"
          height={1000}
          src="assets/scapra/shape-svg/circle_shape.svg"
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
            {currentStep === "more_details" && (
              <MoreDetails
                onPrevClick={handleAboutPrev} // <-- this goes back to AboutPage
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
