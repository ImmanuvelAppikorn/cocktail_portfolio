"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onReviewSubmit: (rating: number, comment: string) => void;
}

const ReviewPopup = ({ isOpen, onClose, onOpen, onReviewSubmit }: ReviewPopupProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setComment("");
      setIsSubmitting(false);
      if (onOpen) onOpen();
    }
  }, [isOpen, onOpen]);

  const handleClose = () => {
    if (popupRef.current) {
      setIsClosing(true);
      popupRef.current.style.animation = "slideDown 0.3s ease-out forwards";
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 300);
    } else {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (rating === 0 || !comment.trim()) return;

    // Call the parent's onReviewSubmit with the rating and comment
    onReviewSubmit(rating, comment);
    
    setIsSubmitting(true);

    // Show success state for 1.5 seconds before closing
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="fixed inset-0" onClick={handleClose}></div>
      <div
        ref={popupRef}
        className="relative z-50 w-full max-w-md bg-white rounded-t-[9px] p-3 mx-1 animate-slideUp"
      >
        {!isSubmitting ? (
          <>
            <div className="flex justify-end mb-2">
              <button onClick={handleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="h-8 w-8"
                >
                  <path d="M320 112C434.9 112 528 205.1 528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C221.6 240.4 221.6 255.6 231 264.9L286 319.9L231 374.9C221.6 384.3 221.6 399.5 231 408.8C240.4 418.1 255.6 418.2 264.9 408.8L319.9 353.8L374.9 408.8C384.3 418.2 399.5 418.2 408.8 408.8C418.1 399.4 418.2 384.2 408.8 374.9L353.8 319.9L408.8 264.9C418.2 255.5 418.2 240.3 408.8 231C399.4 221.7 384.2 221.6 374.9 231L319.9 286L264.9 231C255.5 221.6 240.3 221.6 231 231z" />
                </svg>
              </button>
            </div>

            <h2 className="text-lg font-semibold text-[19px] text-center font-axiforma text-[#010814">
              How would you rate your experience with our wine?
            </h2>
            <p className="text-sm text-center text-[#354259] mt-1 font-axiforma font-normal text-[14px]">
              Did you enjoy it?
            </p>

            <div className="flex justify-around gap-2 mt-3">
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

            <label className="block text-[14px] font-semibold text-[#354259] mt-4 font-axiforma ">
              We’d love to hear your thoughts:
            </label>
            <textarea
              className="w-full mt-2 h-[150px] md:h-[180px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-[#81858B] font-axiforma text-[16px] font-normal"
              placeholder="Share what you liked or any suggestions!"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={handleClose}
                className="px-5 py-2 border border-gray-400 rounded-md font-axiforma text-[16px] font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={rating === 0 || !comment.trim()}
                className={`px-5 py-2 rounded-md font-axiforma text-[16px] font-semibold ${
                  rating === 0 || !comment.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#5F1BE7] text-white"
                }`}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
            <div className="text-center">
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
          </div>
        )}
      </div>

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

        @keyframes slideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewPopup;
