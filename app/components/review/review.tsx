"use client";

import Image from "next/image";
import { useState } from "react";
import BottleCarousel from "./slide-bottle";


const Review = ({ onPrevClick }: { onPrevClick?: () => void }) => {
  const [reviews] = useState([
    {
      id: 1,
      user: "Gowsialex",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
  ]);

  return (
    <div className="px-4 pt-16 space-y-4 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={onPrevClick}>
            <Image
              src="/button-image/Icons.svg"
              alt="Back Icon"
              height={20}
              width={20}
            />
          </button>

          <p className="text-[14px] font-bold">Vinea Connect</p>
        </div>

        {/* Write a Review button */}
        <button className="bg-black px-3 py-1.5 rounded-md flex items-center text-white gap-2 hover:bg-gray-800 transition">
          <Image
            src="/button-image/coffee.svg"
            alt="Review Icon"
            height={20}
            width={20}
          />
          <p className="text-[10px] font-bold leading-none">Write a Review</p>
        </button>
      </div>

      {/* Rating Overview */}
      <div className="bg-[#F8F8F8] w-full rounded-xl flex items-center px-3 py-2 justify-between">
        <Image
          src="/button-image/forward.svg"
          alt="Forward Icon"
          height={24}
          width={24}
        />
        <p className="text-xl font-extrabold">4.0</p>
        <div className="flex -space-x-4">
          {[
            "Ellipse2.svg",
            "Ellipse3.svg",
            "Ellipse4.svg",
            "Ellipse5.svg",
            "Group1.svg",
          ].map((img, i) => (
            <Image
              key={i}
              src={`/review-images/${img}`}
              alt="Reviewer"
              height={35}
              width={35}
              className="rounded-full object-cover"
            />
          ))}
        </div>
      </div>

      {/* Rating Bars */}
      <div className="bg-[#F8F8F8] rounded-lg p-2 flex justify-between items-start">
        <div className="flex flex-col gap-1">
          {[5, 4, 3, 2, 1].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <p className="text-sm font-medium w-3">{num}</p>
              <Image
                src="/start-rating-icons/start-rating-bottle-full.svg"
                alt="Rating Bottle"
                height={16}
                width={5}
              />
              <div
                className="h-[6px] rounded bg-[#7E8FB3]"
                style={{
                  width:
                    num === 5
                      ? "151px"
                      : num === 4
                        ? "106px"
                        : num === 3
                          ? "60px"
                          : num === 2
                            ? "19px"
                            : "6px",
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-end space-y-2">
          <p className="text-3xl font-bold">4.0</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                src="/start-rating-icons/start-rating-bottle-full.svg"
                alt="Full Bottle"
                height={16}
                width={5}
              />
            ))}
            <Image
              src="/start-rating-icons/start-rating-bottle-empty.svg"
              alt="Empty Bottle"
              height={16}
              width={5}
            />
          </div>
          <p className="text-sm font-semibold">15k Reviews</p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex justify-between items-start">
        <div className="py-2 border-y border-[#D9D9D9] w-[85%] space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Image
                  src={r.avatar}
                  alt={r.user}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">{r.user}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Image
                          key={i}
                          src={
                            i < r.rating
                              ? "/start-rating-icons/start-rating-bottle-full.svg"
                              : "/start-rating-icons/start-rating-bottle-empty.svg"
                          }
                          alt="Rating Bottle"
                          width={5}
                          height={14}
                        />
                      ))}
                    </span>
                    <p className="text-xs text-gray-500">{r.time}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-800">{r.comment}</p>
            </div>
          ))}
        </div>

        <Image
          src="/button-image/setting-dots.svg"
          alt="Options"
          width={16}
          height={16}
          className="cursor-pointer mt-3"
        />
      </div>

      {/* Carousel */}
      <div className="w-full fixed bottom-0 left-1/2 transform -translate-x-1/2 ">
        <div className="max-w-[420px] mx-auto px-0">
          <BottleCarousel />
        </div>
      </div>
    </div>
  );
};

export default Review;
