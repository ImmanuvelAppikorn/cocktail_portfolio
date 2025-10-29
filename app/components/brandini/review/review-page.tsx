"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import GetDetailsPopup from "../otp/get-details";

import BottleCarousel from "./slide-bottle";
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

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown-menu")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [reviews, setReviews] = useState<
    Array<{
      id: string;
      user: string;
      rating: number;
      time: Date;
      comment: string;
      avatar: string;
    }>
  >([
 
  ]);

  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [activeReactionId, setActiveReactionId] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<{
    id: string;
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
    avatar: string,
  ) => {
    const now = new Date();
    const uniqueId = `${now.getTime()}_${Math.floor(Math.random() * 10000)}`;
    const newReview = {
      id: uniqueId,
      user: name,
      rating,
      time: now,
      comment,
      avatar,
    };

    setReviews((prev) => [newReview, ...prev]);
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveReactionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setOpenMenuId(null);
    }
  };

  const [selectedEmojiById, setSelectedEmojiById] = useState<
    Record<string, string>
  >({});
  const handleEmojiSelect = (reviewId: string, emojiSrc: string) => {
    console.log("🎯 handleEmojiSelect CALLED!");
    console.log("📝 Review ID:", reviewId);
    console.log("😀 Emoji:", emojiSrc);
    console.log("📊 Current state before:", selectedEmojiById);

    setSelectedEmojiById((prev) => {
      const newState = { ...prev, [reviewId]: emojiSrc };

      console.log("✅ NEW STATE:", newState);

      return newState;
    });

    console.log("🔒 Closing picker...");
    setActiveReactionId(null);
    setEmojiPickerPosition(null);
    console.log("✨ handleEmojiSelect COMPLETED!");
  };

  const [emojiPickerPosition, setEmojiPickerPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  // Toggle dropdown visibility on heart click
  const handleHeartClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
    id: string,
  ) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    setEmojiPickerPosition({ top: rect.top - 40, left: rect.left });
    setActiveReactionId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Main page content wrapped with dimming effect when emoji picker open */}
      <div
        className={`flex flex-col min-h-screen max-w-[500px] mx-auto transition-opacity duration-300 p-4 ${
          activeReactionId ? "opacity-60" : "opacity-100"
        }`}
      >
        {/* Top Section: header + summary */}
        <div className="space-y-2 flex-shrink-0">
          <div className="flex flex-wrap justify-between items-center w-full ">
            {/* Left side: back button + title */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button onClick={() => handleScrollToTopAndNavigate(onPrevClick)}>
                <Image
                  alt="Back Icon"
                  height={20}
                  src="/button-image/black-back.svg"
                  width={20}
                />
              </button>
              <p className="text-[13px] sm:text-base font-bold font-mulish whitespace-nowrap">
                ALTA LANGA
              </p>
            </div>

            {/* Right side: Write a Review button */}
            <div className="flex-shrink-0">
              <button
                className="bg-[#5F1BE7] px-4 py-2 rounded-full flex items-center text-white text-[11px] sm:text-[11px] font-bold gap-1 sm:gap-2 hover:bg-gray-800 transition whitespace-nowrap"
                onClick={() => setIsDetailsPopupOpen(true)}
              >
                <Image
                  alt="Review"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  height={14}
                  src="/button-image/review.svg"
                  width={14}
                />
                Write a Review
              </button>
            </div>
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
                  details.avatar,
                );
              }
            }}
          />

          {/* Edit Review Popup */}
          {isEditPopupOpen && editingReview && (
            <div className="fixed inset-0 z-[999] h-full flex items-end justify-center bg-black/40 backdrop-blur-sm">
              <button
                aria-label="Close dialog"
                className="absolute inset-0 bg-transparent border-none cursor-pointer"
                onClick={() => setIsEditPopupOpen(false)}
              />
              <div className="relative flex flex-col justify-between z-50 w-full max-w-md bg-white rounded-[8px] mx-2 p-4 mb-2 sm:mx-auto animate-slideUpBottom overflow-y-auto max-h-[90vh]">
                <div className="flex justify-end mb-2">
                  <button
                    className="p-1 hover:scale-110 transition"
                    onClick={() => setIsEditPopupOpen(false)}
                  >
                    <Image
                      alt="close"
                      height={24}
                      src="/button-image/close.svg"
                      width={24}
                    />
                  </button>
                </div>

                <ReviewPopupContent
                  avatar={editingReview.avatar}
                  defaultComment={editingReview.comment}
                  defaultRating={editingReview.rating}
                  name={editingReview.user}
                  onClose={() => setIsEditPopupOpen(false)}
                  onOpen={() => console.log("Editing review")}
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
                          : r,
                      ),
                    );
                    setIsEditPopupOpen(false);
                  }}
                />
              </div>
            </div>
          )}

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
                        className="flex-shrink-0"
                        height={16}
                        src="/start-rating-icons/Full-Star.svg"
                        width={16}
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
                        src={
                          i <= avgRating
                            ? "/start-rating-icons/Full-Star.svg"
                            : i - 0.5 <= avgRating
                              ? "/start-rating-icons/Half-Star.svg"
                              : "/start-rating-icons/Empty-Star.svg"
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
        </div>

        {/* Middle Section: Reviews List center and scrollable */}
        <div className="h-[45vh]">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <div
                key={r.id}
                ref={menuRef}
                className="border-b border-gray-300 pb-2 flex flex-col gap-1 relative"
              >
                {/* Review content */}
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden">
                      <Image
                        fill
                        alt={r.user}
                        className="object-cover"
                        src={r.avatar}
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
                  <div className="relative flex flex-col justify-between">
                    <Image
                      alt="Settings"
                      className="cursor-pointer"
                      height={20}
                      src="/button-image/setting-dots.svg"
                      width={20}
                      onClick={() =>
                        setOpenMenuId(openMenuId === r.id ? null : r.id)
                      }
                    />

                    {openMenuId === r.id && (
                      <div className="dropdown-menu absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-xl shadow-md z-50">
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
                              alt="Edit"
                              height={16}
                              src={"/review-images/edit icon.svg"}
                              width={16}
                            />
                            <p className="font-mulish text-[14px] font-medium">
                              Edit
                            </p>
                          </div>
                        </button>

                        <div className="w-full border-[1px]" />

                        {/* Delete Button */}
                        <button
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                          onClick={() => deleteReview(r.id)}
                        >
                          <div className="flex flex-row gap-2">
                            <Image
                              alt="Delete"
                              height={16}
                              src={"/review-images/delete icon.svg"}
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
                {/* Comment */}
                <div className="flex flex-row justify-between pt-2">
                  <p className="text-[13px] text-gray-800 w-[90%]">
                    {r.comment}
                  </p>
                  <button
                    aria-label="Add reaction emoji"
                    className="bg-transparent border-none p-0"
                    style={{ cursor: "pointer" }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHeartClick(e, r.id);
                      console.log(`Heart clicked for review: ${r.id}`);
                    }}
                  >
                    <Image
                      alt="Reaction"
                      height={20}
                      src={
                        selectedEmojiById[r.id] ||
                        "/review-images/comment/heart.svg"
                      }
                      width={20}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full  max-w-[393px] mt-4 mx-auto flex flex-col items-center py-5 space-y-4">
              {/* No reviews content */}
              <div className="w-full flex flex-col items-center ">
                <div className="w-[225px] h-[162px] relative">
                  <Image
                    fill
                    alt="No reviews yet"
                    src={"/review-images/image.svg"}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className="text-[20px] font-mulish font-bold mt-2">
                  No reviews yet
                </p>
                <p className="text-[14px] font-mulish font-medium text-center text-[#333333]">
                  Be the first to share your thoughts about this wine. Your
                  review can help other wine lovers discover something new!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section: Bottle Carousel */}
        <div className="flex-shrink-0  absolute left-1/2 -translate-x-1/2 bottom-[13%] w-full h-[170px] ">
          <BottleCarousel />
        </div>
      </div>

      {/* Emoji picker rendered outside the dimmed content */}
      {activeReactionId && emojiPickerPosition && (
        <div className="relative left-30">
          <div
            key={`emoji-picker-${activeReactionId}`}
            aria-label="Emoji picker"
            className="fixed w-auto h-[27px] flex flex-row bg-white rounded shadow-lg space-x-1 z-50"
            role="toolbar"
            style={{
              top: emojiPickerPosition.top + 30,
              left: emojiPickerPosition.left - 200,
              transform: "translateY(-100%)",
            }}
            onMouseDown={(_e) => {
              console.log("Emoji picker container mousedown");
              // Don't stop propagation here - let emoji clicks through
            }}
          >
            <button
              className="cursor-pointer transition-transform hover:scale-150 p-1 bg-transparent border-none"
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("🔥 Like MOUSEDOWN! Review ID:", activeReactionId);

                // Store the ID immediately to prevent it from being cleared
                const reviewId = activeReactionId;

                console.log("Stored reviewId:", reviewId);

                if (reviewId) {
                  console.log("Calling handleEmojiSelect immediately...");
                  handleEmojiSelect(
                    reviewId,
                    "/review-images/comment/Like.svg",
                  );
                } else {
                  console.log("❌ No reviewId!");
                }
              }}
            >
              <Image
                alt="Like"
                height={20}
                src={"/review-images/comment/Like.svg"}
                width={20}
              />
            </button>
            <button
              className="cursor-pointer transition-transform hover:scale-150 p-1 bg-transparent border-none"
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(
                  "🔥 Red Heart MOUSEDOWN! Review ID:",
                  activeReactionId,
                );

                const reviewId = activeReactionId;

                console.log("Stored reviewId:", reviewId);

                if (reviewId) {
                  console.log("Calling handleEmojiSelect for Red Heart...");
                  handleEmojiSelect(
                    reviewId,
                    "/review-images/comment/RedHeart.svg",
                  );
                } else {
                  console.log("❌ No reviewId for Red Heart!");
                }
              }}
            >
              <Image
                alt="Red Heart"
                height={20}
                src={"/review-images/comment/RedHeart.svg"}
                width={20}
              />
            </button>
            <button
              className="cursor-pointer transition-transform hover:scale-150 p-1 bg-transparent border-none"
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("🔥 Care MOUSEDOWN! Review ID:", activeReactionId);

                const reviewId = activeReactionId;

                console.log("Stored reviewId:", reviewId);

                if (reviewId) {
                  console.log("Calling handleEmojiSelect for Care...");
                  handleEmojiSelect(
                    reviewId,
                    "/review-images/comment/Care.svg",
                  );
                } else {
                  console.log("❌ No reviewId for Care!");
                }
              }}
            >
              <Image
                alt="Care"
                height={20}
                src={"/review-images/comment/Care.svg"}
                width={20}
              />
            </button>
            <button
              className="cursor-pointer transition-transform hover:scale-150 p-1 bg-transparent border-none"
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("🔥 Haha MOUSEDOWN! Review ID:", activeReactionId);

                const reviewId = activeReactionId;

                console.log("Stored reviewId:", reviewId);

                if (reviewId) {
                  console.log("Calling handleEmojiSelect for Haha...");
                  handleEmojiSelect(
                    reviewId,
                    "/review-images/comment/Haha.svg",
                  );
                } else {
                  console.log("❌ No reviewId for Haha!");
                }
              }}
            >
              <Image
                alt="Haha"
                height={20}
                src={"/review-images/comment/Haha.svg"}
                width={20}
              />
            </button>
            <button
              className="cursor-pointer transition-transform hover:scale-150 p-1 bg-transparent border-none"
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("🔥 Wow MOUSEDOWN! Review ID:", activeReactionId);

                const reviewId = activeReactionId;

                console.log("Stored reviewId:", reviewId);

                if (reviewId) {
                  console.log("Calling handleEmojiSelect for Wow...");
                  handleEmojiSelect(reviewId, "/review-images/comment/Wow.svg");
                } else {
                  console.log("❌ No reviewId for Wow!");
                }
              }}
            >
              <Image
                alt="Wow"
                height={20}
                src={"/review-images/comment/Wow.svg"}
                width={20}
              />
            </button>
            <button
              className="cursor-pointer transition-transform hover:scale-150 p-1 bg-transparent border-none"
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("🔥 Sad MOUSEDOWN! Review ID:", activeReactionId);

                const reviewId = activeReactionId;

                console.log("Stored reviewId:", reviewId);

                if (reviewId) {
                  console.log("Calling handleEmojiSelect for Sad...");
                  handleEmojiSelect(reviewId, "/review-images/comment/Sad.svg");
                } else {
                  console.log("❌ No reviewId for Sad!");
                }
              }}
            >
              <Image
                alt="Sad"
                height={20}
                src={"/review-images/comment/Sad.svg"}
                width={20}
              />
            </button>
            <button
              className="cursor-pointer transition-transform hover:scale-150 p-1 bg-transparent border-none"
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("🔥 Angry MOUSEDOWN! Review ID:", activeReactionId);

                const reviewId = activeReactionId;

                console.log("Stored reviewId:", reviewId);

                if (reviewId) {
                  console.log("Calling handleEmojiSelect for Angry...");
                  handleEmojiSelect(
                    reviewId,
                    "/review-images/comment/Angry.svg",
                  );
                } else {
                  console.log("❌ No reviewId for Angry!");
                }
              }}
            >
              <Image
                alt="Angry"
                height={20}
                src={"/review-images/comment/Angry.svg"}
                width={20}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewPage;
