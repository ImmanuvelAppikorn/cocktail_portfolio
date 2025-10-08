"use client";

import Image from "next/image";
import { useState } from "react";

import BottleCarousel from "./slide-bottle";

const ReviewPage = ({ onPrevClick }: { onPrevClick?: () => void }) => {
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
    {
      id: 2,
      user: "Immanuvel",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
    {
      id: 3,
      user: "Shanmuga",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do reprehenderit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg",
    },
    {
      id: 4,
      user: "Priya",
      rating: 5,
      time: "5 mins ago",
      comment:
        "Exercitation veniam consequat sunt nostrud amet. Dolor sit amet officia.",
      avatar: "/review-images/Ellipse5.svg",
    },
  ]);

  return (
    <div className="px-4 pt-3 h-screen relative overflow-hidden w-full max-w-[500px] mx-auto flex flex-col ">
      <div className="space-y-2">
        {/* Header */}
        <div className="flex justify-between items-center flex-shrink-0 space-y-2">
          <div className="flex items-center gap-3">
            <button onClick={onPrevClick}>
              <Image
                alt="Back Icon"
                height={20}
                src="/button-image/Icons.svg"
                width={20}
              />
            </button>
            <p className="text-[14px] font-bold">Blossom Rose</p>
          </div>

          <button className="bg-black px-3 py-1.5 rounded-md flex items-center text-white gap-2 hover:bg-gray-800 transition">
            <Image
              alt="Review Icon"
              height={20}
              src="/button-image/coffee.svg"
              width={20}
            />
            <p className="text-[10px] font-bold leading-none">Write a Review</p>
          </button>
        </div>

        {/* Rating Overview */}
        <div className="bg-[#F8F8F8] w-full rounded-xl flex items-center px-3 py-2 justify-between  flex-shrink-0">
          <Image
            alt="Forward Icon"
            height={24}
            src="/button-image/forward.svg"
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
                alt="Reviewer"
                className="rounded-full object-cover"
                height={35}
                src={`/review-images/${img}`}
                width={35}
              />
            ))}
          </div>
        </div>

        {/* Rating Bars */}
        <div className="bg-[#F8F8F8] rounded-lg p-2 flex justify-between items-start  flex-shrink-0">
          <div className="flex flex-col gap-1">
            {[5, 4, 3, 2, 1].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <p className="text-sm font-medium w-3">{num}</p>
                <Image
                  alt="Rating Bottle"
                  height={16}
                  src="/start-rating-icons/start-rating-bottle-full.svg"
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
                  alt="Full Bottle"
                  height={16}
                  src="/start-rating-icons/start-rating-bottle-full.svg"
                  width={5}
                />
              ))}
              <Image
                alt="Empty Bottle"
                height={16}
                src="/start-rating-icons/start-rating-bottle-empty.svg"
                width={5}
              />
            </div>
            <p className="text-sm font-semibold">15k Reviews</p>
          </div>
        </div>

        {/* Scrollable Reviews (40% height) */}
        <div className="space-y-3 border-gray-200 overflow-y-auto h-[25vh] pr-1 scrollbar-hide">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="border-b border-gray-300 pb-2 flex flex-col gap-1"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Image
                    alt={r.user}
                    className="rounded-full"
                    height={35}
                    src={r.avatar}
                    width={35}
                  />
                  <div>
                    <p className="font-semibold text-sm">{r.user}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Image
                            key={i}
                            alt="Rating Bottle"
                            height={14}
                            src={
                              i < r.rating
                                ? "/start-rating-icons/start-rating-bottle-full.svg"
                                : "/start-rating-icons/start-rating-bottle-empty.svg"
                            }
                            width={4}
                          />
                        ))}
                      </span>
                      <p className="text-xs text-gray-500">{r.time}</p>
                    </div>
                  </div>
                </div>

                <Image
                  alt="Options"
                  className="cursor-pointer"
                  height={16}
                  src="/button-image/setting-dots.svg"
                  width={16}
                />
              </div>

              <p className="text-xs text-gray-800">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel (fixed bottom) */}
      <div className="w-full absolute -bottom-[400px] left-1/2 transform -translate-x-1/2">
        <div className="mx-auto px-0">
          <BottleCarousel />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
