"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

interface ReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewPopup = ({ isOpen, onClose }: ReviewPopupProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 mb-20">
      <div className="w-full max-w-md bg-white rounded-t-2xl p-4 animate-slideUp">
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={onClose}>
            <Image
              src="/button-image/close-icon.svg"
              alt="Close"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-center">How would you rate your experience with our wine?</h2>
        <p className="text-sm text-center text-gray-500 mt-1">Did you enjoy it?</p>

        {/* Rating Stars */}
        <div className="flex justify-center gap-2 mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)}>
              <Image
                src={
                  star <= rating
                    ? "/start-rating-icons/Full-star.svg"
                    : "/start-rating-icons/Empty-star.svg"
                }
                alt={`${star} Star`}
                width={32}
                height={32}
              />
            </button>
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          className="w-full mt-4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Share what you liked or any suggestions!"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Rating:", rating, "Comment:", comment);
              onClose();
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewPopup;
