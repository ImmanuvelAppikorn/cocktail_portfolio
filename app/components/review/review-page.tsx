"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import BottleCarousel from "./slide-bottle";
import GetDetailsPopup from "../otp/get-details";
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

  useEffect(() => {
    const isAnyPopupOpen = isDetailsPopupOpen || isEditPopupOpen;
    onNavigationVisibilityChange?.(!isAnyPopupOpen);
    document.body.style.overflow = isAnyPopupOpen ? "hidden" : "auto";
  }, [isDetailsPopupOpen, isEditPopupOpen, onNavigationVisibilityChange]);

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

  const deleteReview = (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setOpenMenuId(null);
    }
  };

  return (
    <div className="pt-3 h-auto min-h-screen w-full max-w-[500px] mx-auto flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div className="px-4 space-y-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <button onClick={() => handleScrollToTopAndNavigate(onPrevClick)}>
              <Image
                src="/button-image/black-back.svg"
                alt="Back Icon"
                height={26}
                width={26}
              />
            </button>
            <p className=" text-[16px] 2xs:text-[14px] xs:text-[16px] font-bold font-mulish">CABERNET SAUVIGNON</p>

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
          </div>
        )}
        <div>
          {/* Reviews Summary */}
          {reviews.length > 0 && (
            <div className="bg-[#F8F8F8] rounded-lg p-4 flex md:flex-row justify-between items-center my-2 w-full">
              {/* Rating Bars */}
              <div className="flex flex-col gap-1 w-full max-w-[250px]">
                {[5, 4, 3, 2, 1].map((num) => {
                  const count = reviews.filter((r) => r.rating === num).length;
                  const total = reviews.length;
                  const percentage =
                    total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={num} className="flex items-center gap-2 w-full">
                      <p className="text-sm font-medium w-3">{num}</p>
                      <Image
                        alt="Rating Star"
                        height={16}
                        width={16}
                        src="/start-rating-icons/Full-Star.svg"
                        className="flex-shrink-0"
                      />
                      <div className="h-[6px] bg-gray-200/25 rounded-full w-full max-w-[120px]">
                        <div
                          className="h-full rounded-full bg-[#006D60]"
                          style={{
                            width: `${percentage}%`,
                            minWidth: count > 0 ? "6px" : "0",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Average Rating */}
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
                        width={16}
                        src={
                          i <= avgRating
                            ? "/start-rating-icons/Full-Star.svg"
                            : i - 0.5 <= avgRating
                              ? "/start-rating-icons/Half-Star.svg"
                              : "/start-rating-icons/Empty-Star.svg"
                        }
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

          {/* Reviews List */}
          <div
  className={`space-y-3 border-gray-200 pr-1 overflow-y-auto ${
    reviews.length > 0 ? "h-[35vh]" : "h-[50vh]"
  }`}
>

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
                              width={16}
                              src={
                                i < r.rating
                                  ? "/start-rating-icons/Full-Star.svg"
                                  : "/start-rating-icons/Empty-Star.svg"
                              }
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
                      width={20}
                      src="/button-image/setting-dots.svg"
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
                            setEditingReview(r);
                            setIsEditPopupOpen(true);
                            setOpenMenuId(null);
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

{/* empty review component */}
            {reviews.length === 0 && (
              <div className="w-full max-w-[393px] mt-4 mx-auto flex flex-col items-center py-5 space-y-4">
                <div className="w-full flex flex-col items-center ">
                  <div className="w-[225px] h-[162px] relative">
                    <Image
                      src={"/review-images/image.png"}
                      alt="No reviews yet"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p className="text-[20px] font-mulish font-bold mt-2">
                    No reviews yet
                  </p>
                  <p className="text-[14px] font-mulish font-medium text-center  text-[#333333]">
                    Be the first to share your thoughts about this wine. Your
                    review can help other wine lovers discover something new!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottle Carousel */}
      <div className="relative w-full h-auto mt-4">
        <BottleCarousel />
      </div>
    </div>
  );
};

export default ReviewPage;