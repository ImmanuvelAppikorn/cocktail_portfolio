"use client";

import React, { useState, useEffect } from "react";

interface ReviewPopupProps {
  onClose: () => void;
  onReviewSubmit: (
    rating: number, 
    comment: string,
    name: string,
    avatar: string,
  ) => void;
  name: string;
  avatar: string;
  onOpen?: () => void; // optional
  defaultRating?: number; // ✅ added
  defaultComment?: string; // ✅ added
}

const ReviewPopupContent = ({
  onClose,
  onReviewSubmit,
  name,
  avatar,
  onOpen,
  defaultRating = 0,
  defaultComment = "",
}: ReviewPopupProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    // ✅ Initialize form fields with defaults only once (or when popup opens)
    setRating(defaultRating);
    setComment(defaultComment);
    setIsSubmitting(false);
    if (onOpen) onOpen();
  }, [defaultRating, defaultComment, onOpen]);

  const handleSubmit = () => {
    if (rating === 0 || !comment.trim()) return;
    setIsSubmitting(true);

    // Call the parent submit function with name & avatar
    onReviewSubmit(rating, comment, name, avatar);

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
        <p className="text-center text-lg font-medium mb-6">
          Thank you! Your wine review was submitted successfully.
        </p>
        <div className="w-40 h-40 mx-auto">
          <video autoPlay loop muted playsInline className="w-full h-full">
            <source src="/gif/tick.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-[19px] text-center">
        How would you rate your experience with our wine?
      </h2>
      <p className="text-sm text-center text-[#354259] mt-1">
        Did you enjoy it?
      </p>

      {/* Stars */}
      <div className="flex justify-around gap-2 mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <img
              alt={`${star} Star`}
              height={32}
              src={
                star <= (hoverRating || rating)
                  ? "/start-rating-icons/Full-Star.svg"
                  : "/start-rating-icons/Empty-Star.svg"
              }
              width={32}
            />
          </button>
        ))}
      </div>

      {/* Comment */}
      <label
        className="block text-[14px] font-semibold text-[#354259] mt-4"
        htmlFor="comment-textarea"
      >
        We’d love to hear your thoughts:
      </label>
      <textarea
        className="w-full mt-2 h-[150px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-[#81858B] text-[16px]"
        id="comment-textarea"
        placeholder="Share what you liked or any suggestions!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="px-5 py-2  border cursor-pointer border-gray-400 rounded-md text-[16px] font-semibold"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className={`px-5 py-2 rounded-md cursor-pointer text-[16px] font-semibold ${
            rating === 0 || !comment.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#5F1BE7] text-white"
          }`}
          disabled={rating === 0 || !comment.trim()}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewPopupContent;
