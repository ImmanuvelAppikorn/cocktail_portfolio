import Link from "next/link";
import React, { useState, useRef } from "react";

interface OtpVerifyProps {
  onClose: () => void; // Pass this from parent to close popup after video
}

const OtpVerify = ({ onClose }: OtpVerifyProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Handle input change
  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input automatically
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ✅ Handle backspace navigation
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ Handle Submit
  const handleSubmit = () => {
    // Check if OTP filled (optional)
    const allFilled = otp.every((digit) => digit !== "");
    // if (!allFilled) {
    //   alert("Please enter all 4 digits of OTP");
    //   return;
    // }

    // Show video success animation
    setIsSubmitted(true);

    // Close popup after 1.5s
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  // ✅ Success animation view
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
        <p className="text-center text-lg font-medium mb-6">
          OTP Verified Successfully!
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

  // ✅ OTP form design (unchanged)
  return (
    <div className="relative w-full rounded-[8.12px]  ">
      <div className="flex flex-col space-y-10 h-full mb-0">
      <div className="text-center flex flex-col mt-6">
        <p className="text-[#5B5B5B] text-[26px] font-axiforma font-bold pb-4">
          OTP Verification
        </p>
        <p className="text-[17.5px] leading-[26px] text-[#3A3A3A]  font-axiforma font-bold">
          We will send you one-time password to your mobile number
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center border-b-2 border-[#2743FD] focus:border-[#18288f] focus:outline-none text-lg font-semibold"
            />
          ))}
        </div>

        <p className="text-center mb-4 text-[15px] font-axiforma font-bold text-[#B9B9B9]">Didn't receive the OTP? <Link href={""} className="text-[#1D3BFF]">Resend OTP</Link>

        </p>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Submit
      </button>
      </div>

    </div>
  );
};

export default OtpVerify;
