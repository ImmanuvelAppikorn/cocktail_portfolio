"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import ReviewPopup from "../review/review-pop-up";

import OtpVerify from "./otp-verification";

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

    if (!name || !selectedAvatar) return;

    if (!mobile.trim()) {
      alert("Please enter something in the Mobile number / Email field.");

      return;
    }

    _setLoading(true);

    try {
      const enteredValue = mobile.trim();
      const testOtp = "222222";

      setConfirmationResult({ testOtp, destination: enteredValue });

      alert(`Your test OTP is ${testOtp}`);
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
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-transparent border-none cursor-pointer"
        onClick={handleClose}
      />
      <div
        ref={popupRef}
        className="relative flex flex-col justify-between z-50 w-full max-w-md bg-white rounded-[8px] mx-2 p-4 mb-2 sm:mx-auto animate-slideUpBottom overflow-y-auto max-h-[90vh]"
        style={{ minHeight: "480px" }}
      >
        <div className="flex justify-end mb-2">
          <button
            className="p-1 hover:scale-110 transition cursor-pointer"
            onClick={handleClose}
          >
            <Image
              alt="close"
              height={24}
              src="/button-image/close.svg"
              width={24}
            />
          </button>
        </div>

        {showOtp ? (
          <OtpVerify
            confirmationResult={confirmationResult}
            userDetails={{ name, email, mobile, avatar: selectedAvatar }}
            onClose={handleClose}
            onSuccess={handleOtpSuccess}
          />
        ) : showReview ? (
          <ReviewPopup
            avatar={`/avator/${selectedAvatar}.svg`}
            name={name}
            onClose={handleClose}
            onReviewSubmit={handleReviewSubmit}
          />
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-[#354259] mb-1 font-axiforma"
                htmlFor="avatar-selector"
              >
                Choose Avatar*
              </label>

              <div className="grid grid-cols-1 items-center mt-2">
                {selectedAvatar ? (
                  <>
                    {/* Change Avatar Button */}
                    <button
                      className="mb-2 font-axiforma  text-sm text-[#5F1BE7] font-semibold hover:text-[#EB235C]"
                      onClick={() => setSelectedAvatar("")}
                    >
                      Change Avatar
                    </button>

                    {/* Selected Avatar Centered */}
                    <div
                      className="relative left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center transition-all duration-300 border-6 border-white"
                      style={{
                        width: "185px",
                        height: "185px",
                        boxShadow:
                          "4px 0 4px 0 rgba(0,0,0,0.25), 0 4px 4px 0 rgba(0,0,0,0.25)",
                        backgroundColor: "white",
                      }}
                    >
                      <Image
                        fill
                        alt={selectedAvatar}
                        className="object-contain rounded-full"
                        src={`/avator/${selectedAvatar}.svg`}
                      />
                    </div>
                  </>
                ) : (
                  // Show all avatars in grid initially
                  <div
                    aria-labelledby="avatar-selector"
                    className="grid grid-cols-6 gap-2 flex-wrap justify-center"
                    id="avatar-selector"
                    role="radiogroup"
                  >
                    {avatars.map((avatar) => (
                      <div
                        key={avatar}
                        aria-checked={false}
                        className="relative w-[45px] h-[45px] sm:w-12 sm:h-12 cursor-pointer hover:scale-105 transition-transform"
                        role="radio"
                        tabIndex={0}
                        onClick={() => setSelectedAvatar(avatar)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedAvatar(avatar);
                          }
                        }}
                      >
                        <Image
                          fill
                          alt={avatar}
                          className="object-contain rounded-full"
                          src={`/avator/${avatar}.svg`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-[#354259] mb-1 font-axiforma"
                htmlFor="name-input"
              >
                Name*
              </label>
              <input
                required
                className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                id="name-input"
                pattern="[A-Za-z ]{2,50}"
                title="Name must contain only letters and spaces (2-50 characters)"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-[#354259] mb-1 font-axiforma"
                htmlFor="mobile-input"
              >
                Mobile number/ Email*
              </label>
              <input
                className="w-full h-[5vh] border border-[#E6E7EA] rounded-[8px] p-3 focus:ring-2 focus:ring-purple-600 outline-none"
                id="mobile-input"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
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
                className="cursor-pointer flex-1 h-[5vh] border border-[#E6E7EA] text-black rounded-md font-axiforma font-semibold hover:bg-[#f7f5ff] transition-all duration-200"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="cursor-pointer flex-1 h-[5vh] bg-[#5F1BE7] text-white rounded-md font-axiforma font-semibold hover:bg-[#4c13c8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
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
