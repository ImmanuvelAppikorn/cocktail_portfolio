import React, { useState, useRef } from "react";

interface OtpVerifyProps {
  onOtpSubmit: (otp: string) => void;
}

const OtpVerify = ({ onOtpSubmit }: OtpVerifyProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    // if (otp.every((digit) => digit !== "")) {
    //   onOtpSubmit(otp.join(""));
    // } else {
    //   alert("Please enter all 4 digits of OTP");
    // }
  };

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
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            value={digit}
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
