import React, { useState, useRef, useEffect } from "react";

interface OtpVerifyProps {
  onClose: () => void; // Pass this from parent to close popup after video
}

const OtpVerify = ({ onClose }: OtpVerifyProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // OTP input logic is commented out
  const handleChange = (index: number, value: string) => {};
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {};

  const handleSubmit = () => {
    // Show video immediately
    setIsSubmitted(true);

    // Close popup after 1.5s
    setTimeout(() => {
      if (onClose) onClose();
    }, 1500);
  };

  // Show video after submit
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

  // OTP form (logic disabled)
  return (
    <div className="w-full rounded-[8.12px] bg-white p-4">
      <div className="text-center flex flex-col mb-4">
        <p className="text-[#5B5B5B] text-[26px] font-bold pb-4">
          OTP Verification
        </p>
        <p className="text-[18px] leading-[26px] text-[#3A3A3A] px-8 font-bold">
          We will send you one-time password to your mobile number
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-4">
        {otp.map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center border-b-2 border-gray-300 focus:border-purple-600 focus:outline-none text-lg font-semibold"
          />
        ))}
      </div>

      <p className="text-center mb-4">Didn't receive the OTP? Resend OTP</p>

      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default OtpVerify;
