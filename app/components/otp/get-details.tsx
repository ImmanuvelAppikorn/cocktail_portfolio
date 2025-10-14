"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import OtpVerify from "./otp-verification";
import ReviewPopup from "../review/review-pop-up";
import { auth, signInWithPhoneNumber } from "../../lib/firebase";

interface GetDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (details: {
    name: string;
    mobile: string;
    email: string;
    avatar: string;
    rating?: number;
    comment?: string;
  }) => void;
}

const GetDetailsPopup = ({
  isOpen,
  onClose,
  onSubmit,
}: GetDetailsPopupProps) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  // Disable background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto"; // now returns void
    };
  }, [isOpen]);

  // Reset form state when opened
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !email || !selectedAvatar) return;

    setLoading(true);

    try {
      // ✅ Always use the test number
      const testNumber = "+918248754186"; // your Firebase test number
      const testOtp = "222222"; // the code for that test number

      // Set confirmationResult with a fake object containing test OTP
      setConfirmationResult({ testOtp });

      // Show OTP screen
      alert(`OTP is ${testOtp}`);
      setShowOtp(true);
    } catch (err: any) {
      console.error("OTP error:", err);
      alert("Failed to send OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSuccess = () => {
    setShowOtp(false);
    setShowReview(true);
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (onSubmit) {
      onSubmit({
        name,
        mobile,
        email,
        avatar: `/avator/${selectedAvatar}.png`,
        rating,
        comment,
      });
    }
    handleClose();
  };

  if (!isOpen && !isClosing) return null;

  const avatars = [
    "pirate",
    "mexican",
    "ninja",
    "elf",
    "mustache",
    "princess",
    "bear",
    "alien",
    "magician",
    "demon",
    "mask",
    "maskf",
    "queen",
    "mime",
    "revived",
    "sailor",
    "witch",
  ];

  return (
    <div className="fixed inset-0 z-[999] h-full flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleClose}></div>
      <div
        ref={popupRef}
        className="relative flex flex-col justify-between z-50 w-full max-w-md bg-white rounded-[8px] mx-2 p-4 mb-2 sm:mx-auto animate-slideUpBottom overflow-y-auto max-h-[90vh]"
        style={{ minHeight: "480px" }}
      >
        {/* Close button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={handleClose}
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

        {showOtp ? (
          <OtpVerify
            onClose={handleClose}
            onSuccess={handleOtpSuccess}
            userDetails={{ name, email, mobile, avatar: selectedAvatar }}
            confirmationResult={confirmationResult}
          />
        ) : showReview ? (
          <ReviewPopup
            onClose={handleClose}
            onReviewSubmit={handleReviewSubmit}
            name={name}
            avatar={`/avator/${selectedAvatar}.png`}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar selector */}
            <div>
              <label className="block text-sm font-medium text-[#354259] mb-1 font-axiforma">
                Choose Avatar*
              </label>
              <div className="grid grid-cols-6 grid-row-3 gap-2 flex-wrap">
                {avatars.map((avatar) => (
                  <div
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`relative w-[50px] h-[50px] sm:w-12 sm:h-12 cursor-pointer hover:scale-105 transition-transform ${
                      selectedAvatar === avatar
                        ? "ring-2 ring-[#EB235C] rounded-full"
                        : ""
                    }`}
                  >
                    <Image
                      src={`/avator/${avatar}.png`}
                      alt={avatar}
                      fill
                      sizes="50px"
                      className="object-contain rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Input fields */}
            <div>
              <label className="block text-sm font-medium text-[#354259] mb-1 font-axiforma">
                Name*
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                pattern="[A-Za-z ]{2,50}"
                title="Name must contain only letters and spaces (2-50 characters)"
                className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#354259] mb-1 font-axiforma">
                Mobile Number*
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                pattern="[1-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number"
                className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#354259] mb-1 font-axiforma">
                Email*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between gap-4 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 h-[5vh] border border-[#E6E7EA] text-black rounded-md font-axiforma font-semibold hover:bg-[#f7f5ff] transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name || !mobile || !email || !selectedAvatar}
                className="flex-1 h-[5vh] bg-[#5F1BE7] text-white rounded-md font-axiforma font-semibold hover:bg-[#4c13c8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

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
  );
};

export default GetDetailsPopup;
