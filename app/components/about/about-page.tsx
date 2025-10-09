"use client";
import Image from "next/image";

export default function AboutPage({
  onNextClick,
  onPrevClick,
}: {
  onNextClick?: () => void;
  onPrevClick?: () => void;
}) {
  const handleScrollToTopAndNavigate = (callback?: () => void) => {
    if (!callback) return;
    
    // Find all possible scrollable containers and scroll them to top
    const scrollableSelectors = [
      'main', // Main layout container
      '.overflow-y-auto', // Any element with overflow-y-auto class
      '[data-scrollable]', // Any element marked as scrollable
    ];
    
    let scrolled = false;
    
    // Try to find and scroll each type of container
    scrollableSelectors.forEach(selector => {
      const containers = document.querySelectorAll(selector);
      containers.forEach(container => {
        if (container.scrollTop > 0) {
          container.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          scrolled = true;
        }
      });
    });
    
    // Fallback to window scroll if no scrollable containers found or scrolled
    if (!scrolled) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Small delay to allow scroll to start, then navigate
    setTimeout(() => {
      callback();
    }, 150);
  };
  return (
    <div
      className="relative w-full h-screen overflow-hidden pt-1 flex flex-col items-center max-h-screen max-w-[500px] mx-auto"
      style={{ touchAction: "none", overscrollBehavior: "none" }}
    >
      {/* Heading */}

      <div className="border-b border-black w-[95%] ">
        <p className="text-[#EB235C] text-[24px] font-bold text-center pb-1">
          CRIMSON RESERVE
        </p>
      </div>

      <div className="flex flex-row justify-start items-center w-full px-4">
        <button onClick={() => handleScrollToTopAndNavigate(onPrevClick)}>
          <Image
            alt="Back Icon"
            height={30}
            src="/button-image/back.svg"
            width={30}
          />
        </button>

        <div className="text-[20px] font-montagu font-extrabold py-2 w-full text-center">
          ABOUT THE WINE
        </div>
      </div>

      {/* Paragraph */}
      <p className="text-[14px] w-[95%] font-axiforma tracking-[1px]  font-medium mt-6 leading-7 text-left px-4">
        "Sourced from the mineral-rich soil along the Bhadra River Belt, our
        house espresso is a single-origin specialty Robusta coffee from India,
        considered among the finest in the world. This Robusta is graded as
        'Kaapi Royale,' the highest grade of Indian Robusta. When presented in a
        milk-based drink, it features notes of hazelnut and dark chocolate, with
        an extra caffeine hit unique to Robusta."
      </p>
    </div>
  );
}
