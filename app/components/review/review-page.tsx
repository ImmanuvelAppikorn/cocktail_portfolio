"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import BottleCarousel from "./slide-bottle";
import ReviewPopup from "./review-pop-up";

interface ReviewPageProps {
  onPrevClick?: () => void;
  onNavigationVisibilityChange?: (isVisible: boolean) => void;
}

const ReviewPage = ({ onPrevClick, onNavigationVisibilityChange }: ReviewPageProps) => {
  const handleScrollToTopAndNavigate = (callback?: () => void) => {
    if (!callback) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => callback(), 150);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Hide navigation when popup opens, show when it closes
    if (isPopupOpen) {
      onNavigationVisibilityChange?.(false);
    } else {
      onNavigationVisibilityChange?.(true);
    }

    // Cleanup function to show navigation when component unmounts
    return () => {
      onNavigationVisibilityChange?.(true);
    };
  }, [isPopupOpen, onNavigationVisibilityChange]);

  const [reviews] = useState([
    {
      id: 1,
      user: "Gowsialex",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
    {
      id: 2,
      user: "Immanuvel",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
    {
      id: 3,
      user: "Shanmuga",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
    {
      id: 4,
      user: "Priya",
      rating: 5,
      time: "5 mins ago",
      comment:
        "Exercitation veniam consequat sunt nostrud amet. Dolor sit amet officia.",
      avatar: "/review-images/Ellipse5.svg",
    },
    {
      id: 5,
      user: "Gowsialex",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
    {
      id: 6,
      user: "Immanuvel",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
    {
      id: 7,
      user: "Shanmuga",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
    {
      id: 8,
      user: "Priya",
      rating: 5,
      time: "5 mins ago",
      comment:
        "Exercitation veniam consequat sunt nostrud amet. Dolor sit amet officia.",
      avatar: "/review-images/Ellipse5.svg",
    },
  ]);

  return (
    <div className="pt-3 h-auto min-h-screen w-full max-w-[500px] mx-auto flex flex-col overflow-y-auto">
      {/* Top Header */}
      <div className="px-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => handleScrollToTopAndNavigate(onPrevClick)}>
              <Image
                alt="Back Icon"
                height={20}
                src="/button-image/Icons.svg"
                width={20}
              />
            </button>
            <p className="text-[16px] font-bold">Blossom Rose</p>
          </div>

          <button
            className="bg-[#5F1BE7] px-3 py-1.5 rounded-full flex items-center text-white gap-2 hover:bg-gray-800 transition mt-2"
            onClick={() => setIsPopupOpen(true)}
          >
            Write a Review
          </button>
        </div>
        {/* Popup */}
        <ReviewPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />

        {/* Reviews List */}
        <div className="space-y-3 border-gray-200 pr-1 h-[65vh] overflow-y-auto">
          {/* Rating Bars */}
          <div className="bg-[#F8F8F8] rounded-lg p-2 flex justify-between items-start my-2">
            <div className="flex flex-col gap-1">
              {[5, 4, 3, 2, 1].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <p className="text-sm font-medium w-3">{num}</p>
                  <Image
                    alt="Rating Bottle"
                    height={16}
                    src="/start-rating-icons/Full-star.svg"
                    width={16}
                  />
                  <div
                    className="h-[6px] rounded bg-[#006D60]"
                    style={{
                      width:
                        num === 5
                          ? "151px"
                          : num === 4
                            ? "106px"
                            : num === 3
                              ? "60px"
                              : num === 2
                                ? "19px"
                                : "6px",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-end space-y-2">
              <p className="text-3xl font-bold">4.0</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    alt="Full Bottle"
                    height={16}
                    src="/start-rating-icons/Full-star.svg"
                    width={16}
                  />
                ))}
                <Image
                  alt="Empty Bottle"
                  height={16}
                  src="/start-rating-icons/Empty-star.svg"
                  width={16}
                />
              </div>
              <p className="text-sm font-semibold">15k Reviews</p>
            </div>
          </div>
          {reviews.map((r) => (
            <div
              key={r.id}
              className="border-b border-gray-300 pb-2 flex flex-col gap-1 "
            >
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <Image
                    alt={r.user}
                    className="rounded-full"
                    height={35}
                    src={r.avatar}
                    width={35}
                  />
                  <div>
                    <p className="font-semibold text-sm">{r.user}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Image
                            key={i}
                            alt="Rating Bottle"
                            height={16}
                            src={
                              i < r.rating
                                ? "/start-rating-icons/Full-star.svg"
                                : "/start-rating-icons/Empty-star.svg"
                            }
                            width={16}
                          />
                        ))}
                      </span>
                      <p className="text-xs text-gray-500">{r.time}</p>
                    </div>
                  </div>
                </div>

                <Image
                  alt="Options"
                  className="cursor-pointer"
                  height={20}
                  src="/button-image/setting-dots.svg"
                  width={20}
                />
              </div>
              <p className="text-[13px] text-gray-800 w-[90%]">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel (fixed bottom) */}
      <div className="relative w-full h-auto mt-4">
        <div className="px-0">
          <BottleCarousel />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
