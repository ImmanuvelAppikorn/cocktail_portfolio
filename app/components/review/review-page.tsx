"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import BottleCarousel from "./slide-bottle";
import GetDetailsPopup from "../otp/get-details"; // your existing popup component
import ReviewPopupContent from "./review-pop-up";

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

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [reviews, setReviews] = useState<
    Array<{
      id: number;
      user: string;
      rating: number;
      time: Date;
      comment: string;
      avatar: string;
    }>
  >([
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      time: new Date(),
      comment: "This wine has a perfect balance of flavor and aroma!",
      avatar: "/review-images/Ellipse2.svg",
    },
  ]);

  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<{
    id: number;
    user: string;
    rating: number;
    comment: string;
    avatar: string;
  } | null>(null);

  // Manage scroll and nav visibility when popups open
  useEffect(() => {
    const isAnyPopupOpen = isDetailsPopupOpen || isEditPopupOpen;
    onNavigationVisibilityChange?.(!isAnyPopupOpen);
    document.body.style.overflow = isAnyPopupOpen ? "hidden" : "auto";
  }, [isDetailsPopupOpen, isEditPopupOpen, onNavigationVisibilityChange]);

  // Format time helper
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
    if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const TimeAgo = ({ date }: { date: Date }) => {
    const [text, setText] = useState(formatTimeAgo(date));
    useEffect(() => {
      const interval = setInterval(() => setText(formatTimeAgo(date)), 60000);
      return () => clearInterval(interval);
    }, [date]);
    return <span>{text}</span>;
  };

  // Add review
  const addReview = (
    rating: number,
    comment: string,
    name: string,
    avatar: string
  ) => {
    const now = new Date();
    const newReview = {
      id: now.getTime(),
      user: name,
      rating,
      time: now,
      comment,
      avatar,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  // Delete review
  const deleteReview = (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setOpenMenuId(null); // close dropdown if open
    }
  };

  return (
    <div className="pt-3 h-auto min-h-screen w-full max-w-[500px] mx-auto flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div className="px-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => handleScrollToTopAndNavigate(onPrevClick)}>
              <Image
                src="/button-image/black-back.svg"
                alt="Back Icon"
                height={28}
                width={28}
              />
            </button>
            <p className="text-[16px] font-bold">Blossom Rose</p>
          </div>

          <button
            className="bg-[#5F1BE7] px-4 py-2 rounded-full flex items-center text-white text-[12px] font-bold gap-2 hover:bg-gray-800 transition"
            onClick={() => setIsDetailsPopupOpen(true)}
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

        {/* Create Review Popup */}
        <GetDetailsPopup
          isOpen={isDetailsPopupOpen}
          onClose={() => setIsDetailsPopupOpen(false)}
          onSubmit={(details) => {
            if (details.rating && details.comment) {
              addReview(
                details.rating,
                details.comment,
                details.name,
                details.avatar
              );
            }
          }}
        />

        {/* Edit Review Popup */}
        {isEditPopupOpen && editingReview && (
          <div className="fixed inset-0 z-[999] h-full flex items-end justify-center bg-black/40 backdrop-blur-sm">
            <button
              className="absolute inset-0 bg-transparent border-none cursor-pointer"
              onClick={() => setIsEditPopupOpen(false)}
              aria-label="Close dialog"
            />
            <div className="relative flex flex-col justify-between z-50 w-full max-w-md bg-white rounded-[8px] mx-2 p-4 mb-2 sm:mx-auto animate-slideUpBottom overflow-y-auto max-h-[90vh]">
              {/* Close button */}
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setIsEditPopupOpen(false)}
                  className="p-1 hover:scale-110 transition"
                >
                  <Image
                    src="/button-image/close.svg"
                    alt="close"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {/* Review Content */}
              <ReviewPopupContent
                onClose={() => setIsEditPopupOpen(false)}
                onReviewSubmit={(rating, comment, name, avatar) => {
                  setReviews((prev) =>
                    prev.map((r) =>
                      r.id === editingReview.id
                        ? {
                            ...r,
                            rating,
                            comment,
                            user: name,
                            avatar,
                            time: new Date(),
                          }
                        : r
                    )
                  );
                  setIsEditPopupOpen(false);
                }}
                name={editingReview.user}
                avatar={editingReview.avatar}
                defaultRating={editingReview.rating}
                defaultComment={editingReview.comment}
                onOpen={() => console.log("Editing review")}
              />
            </div>

            <style>{`
              .animate-slideUpBottom {
                animation: slideUpBottom 0.3s ease-out forwards;
              }
              @keyframes slideUpBottom {
                from {
                  transform: translateY(100%);
                  opacity: 0;
                }
                to {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
            `}</style>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-3 border-gray-200 pr-1 h-[58vh] overflow-y-auto">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="border-b border-gray-300 pb-2 flex flex-col gap-1 relative"
              ref={menuRef}
            >
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden">
                    <Image
                      alt={r.user}
                      src={r.avatar}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{r.user}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Image
                            key={i}
                            alt="Rating Star"
                            height={16}
                            src={
                              i < r.rating
                                ? "/start-rating-icons/Full-Star.svg"
                                : "/start-rating-icons/Empty-Star.svg"
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

                {/* Three Dots Menu */}
                <div className="relative">
                  <Image
                    className="cursor-pointer"
                    height={20}
                    src="/button-image/setting-dots.svg"
                    width={20}
                    alt="Settings"
                    onClick={() =>
                      setOpenMenuId(openMenuId === r.id ? null : r.id)
                    }
                  />

                  {/* Dropdown */}
                  {openMenuId === r.id && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-xl shadow-md z-50">
                      {/* Edit Button */}
                      <button
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                        onClick={() => {
                          setEditingReview(r); // set the current review
                          setIsEditPopupOpen(true); // open the full-page component
                          setOpenMenuId(null); // close the dropdown
                        }}
                      >
                        <div className="flex flex-row gap-2">
                          <Image
                            src={"/review-images/edit icon.svg"}
                            alt="Edit"
                            height={16}
                            width={16}
                          />
                          <p className="font-mulish text-[14px] font-medium">
                            Edit
                          </p>
                        </div>
                      </button>

                      <div className="w-full border-[1px]"></div>

                      {/* Delete Button */}
                      <button
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                        onClick={() => deleteReview(r.id)}
                      >
                        <div className="flex flex-row gap-2">
                          <Image
                            src={"/review-images/delete icon.svg"}
                            alt="Delete"
                            height={16}
                            width={16}
                          />
                          <p className="font-mulish text-[14px] font-medium">
                            Delete
                          </p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-[13px] text-gray-800 w-[90%]">{r.comment}</p>
            </div>
          ))}

          {/* Empty State */}
          {reviews.length === 0 && (
            <div className="w-full max-w-[393px] mt-8 mx-auto flex flex-col items-center py-5 space-y-4">
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

      {/* Bottle Carousel */}
      <div className="relative w-full h-auto mt-4">
        <div className="px-0">
          <BottleCarousel />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
