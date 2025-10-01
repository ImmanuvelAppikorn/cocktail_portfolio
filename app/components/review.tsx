"use client";

import { useState } from "react";

export default function ReviewPage() {
  const [reviews] = useState([
    {
      id: 1,
      user: "Gowsialex",
      rating: 4,
      time: "2 mins ago",
      comment:
        "Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco.",
      avatar: "/review-images/Ellipse5.svg", // replace with real image
    },
  ]);

  const totalReviews = 15000;
  const averageRating = 4.0;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen p-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-centermb-4 my-4">
        <button className=" flex flex-row  justify-center items-center gap-2">
          <img
            src="/button-image/back.svg"
            alt="user"
            className="w-[24px] h-[24px] rounded-full  "
          />
          <span className="text-[16px] font-bold text-[#333333] font-axiforma">
            Vinea connect
          </span>
        </button>
        <button className="bg-black text-white text-sm px-3 py-1 rounded-md flex flex-row  justify-center items-center gap-2">
          <img
            src="/button-image/coffee.svg"
            alt="user"
            className="w-[24px] h-[24px] rounded-full  "
          />
          <span className="text-[9.8px] font-bold text-white font-axiforma">
            Write a Review
          </span>
        </button>
      </div>

      {/* Avatars & Rating */}
      <div className="flex items-center justify-between gap-3 mb-4 p-4 bg-[#F8F8F8] rounded-lg">
        <img
          src="/button-image/forward.svg"
          alt="user"
          className="w-[29px] h-[29px] rounded-full  "
        />

        <span className="text-2xl font-axiforma font-extrabold">
          {averageRating}
        </span>
        <div className="flex -space-x-2">
          <img
            src="/review-images/Ellipse2.svg"
            alt="user"
            className="w-[47px] h-[47px] rounded-full  "
          />
          <img
            src="/review-images/Ellipse3.svg"
            alt="user"
            className="w-[47px] h-[47px] rounded-full  "
          />
          <img
            src="/review-images/Ellipse4.svg"
            alt="user"
            className="w-[47px] h-[47px] rounded-full  "
          />
          <img
            src="/review-images/Ellipse5.svg"
            alt="user"
            className="w-[47px] h-[47px] rounded-full  "
          />
          <img
            src="/review-images/Group1.svg"
            alt="user"
            className="w-[47px] h-[47px] rounded-full  "
          />
        </div>
      </div>

      {/* Rating Bars */}
      <div className="bg-[#F8F8F8] p-4 rounded-lg mb-4">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center gap-1.5 mb-2">
            <span className="w-4 text-sm flex flex-row gap-1">
              {star}
              <img
                src="/start-rating-icons/start-rating-bottle-full.svg"
                alt="user"
                className="w-[5.5px] h-[17px] "
              />
              
            </span>
            <div className="flex-1 h-2  bg-[#F8F8F8] rounded">
              <div
                className={`h-2 rounded ${
                  star === 5
                    ? "bg-[#7E8FB3] w-3/4"
                    : star === 4
                      ? "bg-[#8794b0] w-1/2"
                      : star === 3
                        ? "bg-[#7E8FB3] w-1/4"
                        : star === 2
                          ? "bg-[#97a0b3] w-1/12"
                          : "bg-[#aaadb4] w-1/24"
                }`}
              ></div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-3">
          <span className="text-2xl font-bold">{averageRating}</span>
          <div className="flex items-center gap-1 text-[#7E8FB3]">
            <span className="flex flex-row gap-1.5">
              <img
                src="/start-rating-icons/start-rating-bottle-full.svg"
                alt="user"
                className="w-[5.5px] h-[17px] "
              />
              <img
                src="/start-rating-icons/start-rating-bottle-full.svg"
                alt="user"
                className="w-[5.5px] h-[17px]"
              />
              <img
                src="/start-rating-icons/start-rating-bottle-full.svg"
                alt="user"
                className="w-[5.5px] h-[17px]"
              />
              <img
                src="/start-rating-icons/start-rating-bottle-full.svg"
                alt="user"
                className="w-[5.5px] h-[17px]"
              />
              <img
                src="/start-rating-icons/start-rating-bottle-empty.svg"
                alt="user"
                className="w-[5.5px] h-[17px]"
              />
            </span>
            <span className="text-gray-600 ml-2 text-sm">
              {totalReviews.toLocaleString()} Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="py-4 border-y border-[#D9D9D9]">
        {reviews.map((r) => (
          <div key={r.id} className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <img
                src={r.avatar}
                alt={r.user}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{r.user}</p>
                <div className="flex items-center gap-2">
                  <span className="flex flex-row gap-1.5">
                    <img
                      src="/start-rating-icons/start-rating-bottle-full.svg"
                      className="w-[5.5px] h-[17px]"
                    />
                    <img
                      src="/start-rating-icons/start-rating-bottle-full.svg"
                      className="w-[5.5px] h-[17px]"
                    />
                    <img
                      src="/start-rating-icons/start-rating-bottle-full.svg"
                      className="w-[5.5px] h-[17px]"
                    />
                    <img
                      src="/start-rating-icons/start-rating-bottle-full.svg"
                      className="w-[5.5px] h-[17px]"
                    />
                    <img
                      src="/start-rating-icons/start-rating-bottle-empty.svg"
                      className="w-[5.5px] h-[17px]"
                    />
                  </span>
                  <p className="text-xs text-gray-500">{r.time}</p>
                </div>
                <p className="text-sm text-[#333333] font-normal font-axiforma mt-1">
                  {r.comment}
                </p>
              </div>
            </div>
            <img
              src="/button-image/setting-dots.svg"
              alt="menu"
              className="w-5 h-5 mt-2 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
