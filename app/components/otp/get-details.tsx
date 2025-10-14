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
    mobile?: string;
    email?: string;
    avatar: string;
    rating?: number;
    comment?: string;
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
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [_loading, _setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
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


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Ensure name and avatar are filled
  if (!name || !selectedAvatar) return;

  // Check if at least mobile or email is valid
  if (!mobile && !email) {
    alert("Please enter a mobile number or email.");
    return;
  }

  // Validate mobile if provided
  if (mobile && !/^[1-9]\d{9}$/.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number starting with 6-9.");
    return;
  }

  // Validate email if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  _setLoading(true);

  try {
    const testOtp = "222222";

    setConfirmationResult({ testOtp });

    alert(`OTP is ${testOtp}`);
    setShowOtp(true);
  } catch (err: any) {
    console.error("OTP error:", err);
    alert("Failed to send OTP: " + err.message);
  } finally {
    _setLoading(false);
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
        mobile: mobile || undefined,
        email: email || undefined,
        avatar: `/avator/${selectedAvatar}.svg`,
        rating,
        comment,
      });
    }
    handleClose();
  };

  if (!isOpen && !isClosing) return null;

  const avatars = [
    "pirate", "mexican", "ninja", "elf", "mustache", "princess",
    "bear", "alien", "magician", "demon", "mask", "maskf",
    "queen", "mime", "revived", "sailor", "witch",
  ];

  return (
    <div className="fixed inset-0 z-[999] h-full flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <button
        className="absolute inset-0 bg-transparent border-none cursor-pointer"
        onClick={handleClose}
        aria-label="Close dialog"
      />
      <div
        ref={popupRef}
        className="relative flex flex-col justify-between z-50 w-full max-w-md bg-white rounded-[8px] mx-2 p-4 mb-2 sm:mx-auto animate-slideUpBottom overflow-y-auto max-h-[90vh]"
        style={{ minHeight: "480px" }}
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={handleClose}
            className="p-1 hover:scale-110 transition cursor-pointer"
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
            avatar={`/avator/${selectedAvatar}.svg`}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

<div>
  <label
    htmlFor="avatar-selector"
    className="block text-sm font-medium text-[#354259] mb-1 font-axiforma"
  >
    Choose Avatar*
  </label>

  <div className="flex flex-col items-center mt-2">
    {selectedAvatar ? (
      <>
        {/* Change Avatar Button */}
        <button
          onClick={() => setSelectedAvatar("")}
          className="mb-2 font-axiforma  text-sm text-[#5F1BE7] font-semibold hover:text-[#EB235C]"
        >
          Change Avatar
        </button>

        {/* Selected Avatar Centered */}
        <div
          className="relative rounded-full flex items-center justify-center transition-all duration-300 border-6 border-white"
          style={{
            width: "185px",
            height: "185px",
            boxShadow: "4px 0 4px 0 rgba(0,0,0,0.25), 0 4px 4px 0 rgba(0,0,0,0.25)",
            backgroundColor: "white",
          }}
        >
          <Image
            src={`/avator/${selectedAvatar}.svg`}
            alt={selectedAvatar}
            fill
            className="object-contain rounded-full"
          />
        </div>
      </>
    ) : (
      // Show all avatars in grid initially
      <div
        id="avatar-selector"
        role="radiogroup"
        aria-labelledby="avatar-selector"
        className="grid grid-cols-6 gap-2 flex-wrap justify-center"
      >
        {avatars.map((avatar) => (
          <div
            key={avatar}
            role="radio"
            tabIndex={0}
            aria-checked={false}
            onClick={() => setSelectedAvatar(avatar)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedAvatar(avatar);
              }
            }}
            className="relative w-[45px] h-[45px] sm:w-12 sm:h-12 cursor-pointer hover:scale-105 transition-transform"
          >
            <Image
              src={`/avator/${avatar}.svg`}
              alt={avatar}
              fill
              className="object-contain rounded-full"
            />
          </div>
        ))}
      </div>
    )}
  </div>
</div>






            <div>
              <label
                htmlFor="name-input"
                className="block text-sm font-medium text-[#354259] mb-1 font-axiforma"
              >
                Name*
              </label>
              <input
                id="name-input"
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
                <label
                  htmlFor="mobile-input"
                  className="block text-sm font-medium text-[#354259] mb-1 font-axiforma"
                >
                  Mobile number/ Email*
                </label>
                <input
  id="mobile-input"
  type="text"
  value={mobile}
  onChange={(e) => {
    const value = e.target.value;
    // Allow only numbers if starting with 1-9 or keep it as email
    if (/^[1-9]\d*$/.test(value) || value.includes("@") || value === "") {
      setMobile(value);
    }
  }}
  className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
/>

              </div>

              {/* <div>
                <label
                  htmlFor="email-input"
                  className="block text-sm font-medium text-[#354259] mb-1 font-axiforma"
                >
                  Email
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                  placeholder="your@email.com"
                />
              </div> */}
  
            <div className="flex items-center justify-between gap-4 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer flex-1 h-[5vh] border border-[#E6E7EA] text-black rounded-md font-axiforma font-semibold hover:bg-[#f7f5ff] transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer flex-1 h-[5vh] bg-[#5F1BE7] text-white rounded-md font-axiforma font-semibold hover:bg-[#4c13c8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
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
