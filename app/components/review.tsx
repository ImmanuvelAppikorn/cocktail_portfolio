"use client";

import Image from "next/image";
import { useState } from "react";
import BottleCarousel from "./slide-bottle";

const Review = () => {
  const [reviews] = useState([
    {
      id: 1,
      user: "Gowsialex",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
  ]);

  return (
    <div className="px-6 pt-[52px] block sm:hidden space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-3">
            <Image
              src="/button-image/Icons.svg"
              alt="Back Icon"
              height={20}
              width={20}
            />
            <p className="text-[16px] font-bold">Vinea connect</p>
          </div>

          {/* Write a Review button */}
          <div className="bg-black px-3 py-2 rounded-md flex items-center text-white gap-2">
            <Image
              src="/button-image/coffee.svg"
              alt="Review Icon"
              height={20}
              width={20}
            />
            <p className="text-[10px] font-bold leading-none">Write a Review</p>
          </div>
        </div>
      </div>

      {/* Rating Overview */}
      <div className="bg-[#F8F8F8] w-full rounded-xl flex items-center p-3 justify-between">
        <Image
          src="/button-image/forward.svg"
          alt="Forward Icon"
          height={28}
          width={28}
        />
        <p className="text-2xl font-extrabold">4.0</p>
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
              height={48}
              width={48}
              className="rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Rating Bars */}
      <div className="bg-[#F8F8F8] rounded-lg p-3 flex justify-between items-start">
        {/* Left Bars */}
        <div className="flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((num, i) => (
            <div key={i} className="flex items-center gap-2">
              <p className="text-sm font-medium">{num}</p>
              <Image
                src="/start-rating-icons/start-rating-bottle-full.svg"
                alt="Rating Bottle"
                height={16}
                width={5}
              />
              <div
                className={`h-[6px] rounded bg-[#7E8FB3]`}
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

        {/* Right Side */}
        <div className="flex flex-col items-end space-y-2">
          <p className="text-4xl font-bold">4.0</p>
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
        <div className="py-4 border-y border-[#D9D9D9] w-[85%] space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="flex justify-between items-start">
              <div className="flex flex-col gap-3">

                <div className="flex flex-row items-center gap-3 ">
                  <Image
                    src={r.avatar}
                    alt={r.user}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">{r.user}</p>
                    <div className="flex items-center gap-2">
                      <span className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Image
                            key={i}
                            src={
                              i < r.rating
                                ? "/start-rating-icons/start-rating-bottle-full.svg"
                                : "/start-rating-icons/start-rating-bottle-empty.svg"
                            }
                            alt="Rating Bottle"
                            width={6}
                            height={16}
                          />
                        ))}
                      </span>
                      <p className="text-xs text-gray-500">{r.time}</p>
                    </div>
                  </div>
                  </div>

                  <p className="text-sm text-gray-800 mt-1">{r.comment}</p>
                
              </div>
            </div>
          ))}
        </div>
        <Image
          src="/button-image/setting-dots.svg"
          alt="Options"
          width={20}
          height={20}
          className="cursor-pointer mt-5"
        />
      </div>
      <div className="w-full absolute bottom-0 left-0 right-0">
      <BottleCarousel />

      </div>
    </div>
  );
};

export default Review;
