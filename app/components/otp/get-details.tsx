"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import OtpVerify from "./otp-verification";
import ReviewPopup from "../review/review-pop-up";

interface GetDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (details: {
    name: string;
    mobile: string;
    email: string;
    avatar: string;
  }) => void;
}

const GetDetailsPopup = ({ isOpen, onClose, onSubmit }: GetDetailsPopupProps) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Disable background scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setMobile("");
      setEmail("");
      setSelectedAvatar("");
      setShowOtp(false);
      setShowReview(false);
      setIsClosing(false);
    }
  }, [isOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !email.trim() || !selectedAvatar) return;
    if (onSubmit) onSubmit({ name, mobile, email, avatar: selectedAvatar });
    setShowOtp(true);
  };

  if (!isOpen && !isClosing) return null;

  const avatars = [
    "pirate", "mexican", "ninja", "elf", "mustache", "princess", "bear", "alien",
    "magician", "demon", "mask", "maskf", "queen", "mime", "revived", "sailor", "witch",
  ];

  return (
    <div className="fixed inset-0 z-[999] h-full flex items-end justify-center bg-black/40 backdrop-blur-sm">
      {/* Background overlay click to close */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      {/* Popup container */}
      <div
        ref={popupRef}
        className="relative flex flex-col justify-between z-50 w-full max-w-md bg-white rounded-[8px] mx-2 p-4 mb-2 sm:mx-auto animate-slideUpBottom overflow-y-auto max-h-[90vh]"
        style={{
          boxShadow: "0 1.015px 2.029px 0 rgba(5, 32, 81, 0.05)",
          minHeight: "480px",
          transition: "height 0.3s ease",
        }}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <button onClick={handleClose} className="p-1 hover:scale-110 transition">
            <Image src={"/button-image/close.svg"} alt="close" width={24} height={24} />
          </button>
        </div>

        {/* Conditional rendering: Form → OTP → Review */}
        {showOtp ? (
          <OtpVerify
            onClose={handleClose}
            onSuccess={() => {
              setShowOtp(false);
              setShowReview(true); // show review popup after OTP
            }}
          />
        ) : showReview ? (
          <ReviewPopup

              onClose={handleClose}
              onReviewSubmit={(rating, comment) => {
                console.log("Review submitted:", rating, comment);
                handleClose();
              } } name={""} avatar={""}          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar Selector */}
            <div>
              <label className="block text-sm font-medium text-[#354259] mb-1 font-axiforma">
                Choose Avatar*
              </label>
              <div className="flex flex-row gap-2 flex-wrap sm:grid-cols-7 md:grid-cols-8">
                {avatars.map((avatar) => (
                  <div
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 cursor-pointer hover:scale-105 transition-transform
                      ${selectedAvatar === avatar ? "ring-2 ring-[#EB235C] rounded-full" : ""}`}
                  >
                    <Image
                      src={`/avator/${avatar}.png`}
                      alt={avatar}
                      fill
                      sizes="48px"
                      className="object-contain rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-[#354259] mb-1 font-axiforma">
                Name*
              </label>
              <input
                type="text"
                className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                style={{ boxShadow: "0 1.015px 2.029px 0 rgba(5, 32, 81, 0.05)" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#354259] mb-1 font-axiforma">
                Mobile Number*
              </label>
              <input
                type="tel"
                className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                style={{ boxShadow: "0 1.015px 2.029px 0 rgba(5, 32, 81, 0.05)" }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#354259] mb-1 font-axiforma">
                Email*
              </label>
              <input
                type="email"
                className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                style={{ boxShadow: "0 1.015px 2.029px 0 rgba(5, 32, 81, 0.05)" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4 mt-6">
              <button
                type="button"
                onClick={handleClose}
                style={{ boxShadow: "0 1.015px 2.029px 0 rgba(5, 32, 81, 0.05)" }}
                className="flex-1 h-[5vh] border border-[#E6E7EA] text-black rounded-md font-axiforma font-semibold hover:bg-[#f7f5ff] transition-all duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!name.trim() || !mobile.trim() || !email.trim() || !selectedAvatar}
                className="flex-1 h-[5vh] bg-[#5F1BE7] text-white rounded-md font-axiforma font-semibold hover:bg-[#4c13c8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {/* Styles */}
        <style jsx>{`
          .animate-slideUpBottom {
            animation: slideUpBottom 0.3s ease-out forwards;
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out forwards;
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

          @keyframes slideDown {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(100%);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default GetDetailsPopup;
