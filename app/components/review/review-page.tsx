"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import BottleCarousel from "./slide-bottle";
import ReviewPopup from "./review-pop-up";

interface ReviewPageProps {
  onPrevClick?: () => void;
  onNavigationVisibilityChange?: (isVisible: boolean) => void;
}

const ReviewPage = ({
  onPrevClick,
  onNavigationVisibilityChange,
}: ReviewPageProps) => {
  const handleScrollToTopAndNavigate = (callback?: () => void) => {
    if (!callback) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => callback(), 150);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    onNavigationVisibilityChange?.(!isPopupOpen);
    return () => onNavigationVisibilityChange?.(true);
  }, [isPopupOpen, onNavigationVisibilityChange]);

  const [reviews, setReviews] = useState<
    Array<{
      id: number;
      user: string;
      rating: number;
      time: Date;
      comment: string;
      avatar: string;
    }>
  >([]);

  // 🕒 Format time ago helper
  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (diffInSeconds < minute) return "Just now";
    if (diffInSeconds < hour) {
      const mins = Math.floor(diffInSeconds / minute);
      return `${mins} ${mins === 1 ? "min" : "mins"} ago`;
    }
    if (diffInSeconds < day) {
      const hours = Math.floor(diffInSeconds / hour);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }

    const days = Math.floor(diffInSeconds / day);
    if (days < 7) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  // 🕒 Auto-updating time component
  function TimeAgo({ date }: { date: Date }) {
    const [text, setText] = useState(formatTimeAgo(date));

    useEffect(() => {
      const interval = setInterval(() => {
        setText(formatTimeAgo(date));
      }, 60000);
      return () => clearInterval(interval);
    }, [date]);

    return <span>{text}</span>;
  }

  const avatarImages = [
    "/review-images/Ellipse2.svg",
    "/review-images/Ellipse3.svg",
    "/review-images/Ellipse4.svg",
    "/review-images/Ellipse5.svg",
  ];

  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    return avatarImages[randomIndex];
  };

  const addReview = (rating: number, comment: string) => {
    const now = new Date();
    const newReview = {
      id: now.getTime(),
      user: "Courtney Henry",
      rating,
      time: now,
      comment,
      avatar: getRandomAvatar(),
    };
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  return (
    <div className="pt-3 h-auto min-h-screen w-full max-w-[500px] mx-auto flex flex-col overflow-y-auto">
      {/* Header */}
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
            className="bg-[#5F1BE7] px-3 py-1.5 rounded-full flex items-center text-white text-[12px] font-bold gap-2 hover:bg-gray-800 transition"
            onClick={() => setIsPopupOpen(true)}
          >
            <Image
              src="/button-image/review.svg"
              alt="Review"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            Write a Review
          </button>
        </div>

        {/* Popup */}
        <ReviewPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onReviewSubmit={addReview}
        />

        {/* Reviews */}
        <div className="space-y-3 border-gray-200 pr-1 h-[58vh] overflow-y-auto">
          {reviews.length > 0 && (
            <div className="bg-[#F8F8F8] rounded-lg p-4 flex md:flex-row justify-between items-center my-2 w-full">
              <div className="flex flex-col gap-1 w-full max-w-[250px]">
                {[5, 4, 3, 2, 1].map((num) => {
                  const count = reviews.filter((r) => r.rating === num).length;
                  const total = reviews.length;
                  const percentage = Math.round((count / total) * 100);
                  return (
                    <div key={num} className="flex items-center gap-2 w-full">
                      <p className="text-sm font-medium w-3">{num}</p>
                      <Image
                        alt="Rating Star"
                        height={16}
                        src="/start-rating-icons/Full-star.svg"
                        width={16}
                        className="flex-shrink-0"
                      />
                      <div className="h-[6px] bg-gray-200 rounded-full w-full max-w-[120px]">
                        <div
                          className="h-full rounded-full bg-[#006D60]"
                          style={{
                            width: `${percentage}%`,
                            minWidth: count > 0 ? "6px" : "0",
                          }}
                        />
                      </div>
                      {/* <span className="text-xs text-gray-500 w-5 text-right">
                        {count > 0 ? count : ""}
                      </span> */}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col items-end space-y-2">
                <p className="text-3xl font-bold">
                  {(
                    reviews.reduce((sum, r) => sum + r.rating, 0) /
                    reviews.length
                  ).toFixed(1)}
                </p>
                <div className="flex justify-center gap-1 w-full mt-2 md:mt-0">
                  {[1, 2, 3, 4, 5].map((i) => {
                    const avgRating =
                      reviews.reduce((sum, r) => sum + r.rating, 0) /
                      reviews.length;
                    return (
                      <Image
                        key={i}
                        alt={
                          i <= Math.round(avgRating)
                            ? "Filled Star"
                            : "Empty Star"
                        }
                        height={16}
                        src={
                          i <= avgRating
                            ? "/start-rating-icons/Full-star.svg"
                            : i - 0.5 <= avgRating
                              ? "/start-rating-icons/Half-star.svg"
                              : "/start-rating-icons/Empty-star.svg"
                        }
                        width={16}
                      />
                    );
                  })}
                </div>
                <p className="text-sm font-semibold">
                  {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
                </p>
              </div>
            </div>
          )}

          {/* Individual reviews */}
          {reviews.map((r) => (
            <div
              key={r.id}
              className="border-b border-gray-300 pb-2 flex flex-col gap-1"
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
                      <p className="text-xs text-gray-500">
                        <TimeAgo date={r.time} />
                      </p>
                    </div>
                  </div>
                </div>

                <Image
                  className="cursor-pointer"
                  height={20}
                  src="/button-image/setting-dots.svg"
                  width={20}
                  alt="Settings"
                />
              </div>
              <p className="text-[13px] text-gray-800 w-[90%]">{r.comment}</p>
            </div>
          ))}

          {/* Empty state */}
          {reviews.length === 0 && (
            <div className="w-full max-w-[393px] mx-auto flex flex-col items-center py-5 space-y-4 overflow-y-auto">
              <div className="w-full flex flex-col items-center px-4">
                <div className="w-[225px] h-[162px] relative">
                  <Image
                    src={"/review-images/image.png"}
                    alt="No reviews yet"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className="text-[22px] font-mulish font-bold mt-2">
                  No reviews yet
                </p>
                <p className="text-[15px] font-mulish font-medium text-center px-4 text-[#333333]">
                  Be the first to share your thoughts about this wine. Your
                  review can help other wine lovers discover something new!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full h-auto mt-4">
        <div className="px-0">
          <BottleCarousel />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
