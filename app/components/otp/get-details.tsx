"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface GetDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { name: string; mobile: string }) => void;
}

const GetDetailsPopup = ({
  isOpen,
  onClose,
  onSubmit,
}: GetDetailsPopupProps) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setMobile("");
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
    if (!name.trim() || !mobile.trim()) return;
    onSubmit({ name, mobile });
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="fixed inset-0" onClick={handleClose}></div>
      <div
        ref={popupRef}
        className="relative z-50 w-full max-w-md bg-white rounded-t-[9px] p-6 mx-1 animate-slideUp"
      >
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#354259] mb-1 font-axiforma">
              Name*
            </label>
            <input
              type="text"
              className="w-full border border-[#E6E7EA] rounded-md p-3 focus:ring-2 focus:ring-purple-600 outline-none h-[6vh]"
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
              className="w-full border border-[#E6E7EA] rounded-md p-3 focus:ring-2 focus:ring-purple-600 outline-none h-[6vh]"
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
              type="text"
              className="w-full border border-[#E6E7EA] rounded-md p-3 focus:ring-2 focus:ring-purple-600 outline-none h-[6vh]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 h-[48px] border border-[#5F1BE7] text-[#5F1BE7] rounded-md font-medium hover:bg-[#f7f5ff] transition-all duration-200 flex items-center justify-center"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim() || !mobile.trim() || !email.trim()}
              className="flex-1 h-[48px] bg-[#5F1BE7] text-white rounded-md font-medium hover:bg-[#4c13c8] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Submit
            </button>
          </div>
        </form>

        <style jsx>{`
          .animate-slideUp {
            animation: slideUp 0.3s ease-out forwards;
          }

          .animate-slideDown {
            animation: slideDown 0.3s ease-out forwards;
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
    </div>
  );
};

export default GetDetailsPopup;
