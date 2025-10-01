import Image from "next/image";
import React from "react";

const FourthPage = () => {
  return (
    <>
      {/* Main Div */}
      <div className="px-6 pt-13 block sm:hidden space-y-2">
        {/* Vinea Connect */}
        <div className="flex justify-between items-center">
          <div className="p-2 flex justify-between items-center w-full">
            <div className="flex justify-center items-center gap-3">
              <Image
                src={"/button-image/Icons.svg"}
                alt=""
                height={20}
                width={20}
                className=""
              />
              <p className="text-[16px] leading-[100%] font-bold">
                Vinea connect
              </p>
            </div>
            {/* Black Container */}
            <div className="bg-black w-[121.85106658935547px] h-[33px] rounded-[5.62px] flex justify-center items-center text-white">
              <Image
                src={"/button-image/coffee.svg"}
                alt={""}
                height={22}
                width={22}
                className=""
              />
              <p className="text-[9.83px] font-bold leading-[100%]">
                Write a Review
              </p>
            </div>
          </div>
        </div>
        {/* Photo Container */}
        <div className="bg-[#F8F8F8] w-full rounded-[19.12px] flex items-center p-2">
          <div className="flex justify-between items-center w-full">
            <Image
              src={"/button-image/forward.svg"}
              alt={""}
              height={28.682926177978516}
              width={28.682926177978516}
            />
            <p className="text-[23.9px] leading-[23.9px] font-extrabold">4.0</p>
            <div className="flex items-center justify-center">
              <div className="flex flex-row -space-x-4 items-center">
                <Image
                  src={"/review-images/Ellipse 2.svg"}
                  alt={""}
                  height={48.8}
                  width={47.8}
                />
                <Image
                  src={"/review-images/Ellipse 3.svg"}
                  alt={""}
                  height={48.8}
                  width={47.8}
                />
                <Image
                  src={"/review-images/Ellipse 4.svg"}
                  alt={""}
                  height={48.8}
                  width={47.8}
                />
                <Image
                  src={"/review-images/Ellipse 5.svg"}
                  alt={""}
                  height={48.8}
                  width={47.8}
                />
                <Image
                  src={"/review-images/Group 1.svg"}
                  alt={""}
                  height={48.8}
                  width={47.8}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rating Container */}
        <div className="bg-[#F8F8F8] rounded-[8px]">
          <div className="flex justify-between items-center p-2">
            {/* Left */}
            <div className="flex flex-col items-start space-y-2">
              {/* 5 */}
              <div className="flex flex-row justify-center items-center gap-1">
                <p className="text-[14px] font-medium leading-[100%] tracking-[-1%]">
                  5
                </p>
                <Image
                  src={"/start-rating-icons/start-rating-bottle-full.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
                <div className="bg-[#7E8FB3] rounded-[4px] w-[151px] h-[6px]"></div>
              </div>
              {/* 4 */}
              <div className="flex flex-row justify-center items-center gap-1">
                <p className="text-[14px] font-medium leading-[100%] tracking-[-1%]">
                  4
                </p>
                <Image
                  src={"/start-rating-icons/start-rating-bottle-full.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
                <div className="bg-[#7E8FB3] rounded-[4px] w-[106px] h-[6px]"></div>
              </div>
              {/* 3 */}
              <div className="flex flex-row justify-center items-center gap-1">
                <p className="text-[14px] font-medium leading-[100%] tracking-[-1%]">
                  3
                </p>
                <Image
                  src={"/start-rating-icons/start-rating-bottle-full.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
                <div className="bg-[#7E8FB3] rounded-[4px] w-[60px] h-[6px]"></div>
              </div>
              {/* 2 */}
              <div className="flex flex-row justify-center items-center gap-1">
                <p className="text-[14px] font-medium leading-[100%] tracking-[-1%]">
                  2
                </p>
                <Image
                  src={"/start-rating-icons/start-rating-bottle-full.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
                <div className="bg-[#7E8FB3] rounded-[4px] w-[19px] h-[6px]"></div>
              </div>
              {/* 1 */}
              <div className="flex flex-row justify-center items-center gap-1">
                <p className="text-[14px] font-medium leading-[100%] tracking-[-1%]">
                  1
                </p>
                <Image
                  src={"/start-rating-icons/start-rating-bottle-full.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
                <div className="bg-[#7E8FB3] rounded-[4px] w-[6px] h-[6px]"></div>
              </div>
            </div>
            {/* Right */}
            <div className="flex flex-col items-end space-y-2">
              {/* Rating Text */}
              <p className="text-[40px] font-bold leading-[100%] tracking-[-1%]">
                4.0
              </p>
              {/* Bottle Image */}
              <div className="flex flex-row gap-1">
                <Image
                  src={"/start-rating-icons/start-rating-bottle-full.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
                <Image
                  src={"/start-rating-icons/start-rating-bottle-full.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
                <Image
                  src={"/start-rating-icons/start-rating-bottle-full.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
                <Image
                  src={"/start-rating-icons/start-rating-bottle-full.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
                <Image
                  src={"/start-rating-icons/start-rating-bottle-empty.svg"}
                  alt={""}
                  height={16.5700626373291}
                  width={5.025126934051514}
                />
              </div>
              <p className="text-[14px] font-semibold leading-[100%] tracking-[-1%]">
                15k
              </p>
              <p className="text-[14px] font-semibold leading-[100%] tracking-[-1%]">
                Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Commment Container */}
        <div className="space-y-3">
          {/* Border Line */}
          <div className="border-1 bg-[#D9D9D9] w-[335px]"></div>
          {/* Comment Section */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3">
              {/* First Column */}
              <Image
                src={"/comment-section/profile.png"}
                alt={""}
                height={38}
                width={40}
              />
              {/* Second Column */}
              <div className="flex flex-col">
                <p>Gowsialex</p>
                <div className="flex flex-row gap-2">
                  <Image
                    src={"/start-rating-icons/start-rating-bottle-full.svg"}
                    alt={""}
                    height={16.5700626373291}
                    width={5.025126934051514}
                  />
                  <Image
                    src={"/start-rating-icons/start-rating-bottle-full.svg"}
                    alt={""}
                    height={16.5700626373291}
                    width={5.025126934051514}
                  />
                  <Image
                    src={"/start-rating-icons/start-rating-bottle-full.svg"}
                    alt={""}
                    height={16.5700626373291}
                    width={5.025126934051514}
                  />
                  <Image
                    src={"/start-rating-icons/start-rating-bottle-full.svg"}
                    alt={""}
                    height={16.5700626373291}
                    width={5.025126934051514}
                  />
                  <Image
                    src={"/start-rating-icons/start-rating-bottle-empty.svg"}
                    alt={""}
                    height={16.5700626373291}
                    width={5.025126934051514}
                  />
                  <p className="text-[14px] font-medium leading-[100%] tracking-[-1%]">
                    2 mins ago
                  </p>
                </div>
              </div>
            </div>
            {/* Third Column */}
            <div className="flex justify-end">
              <button className="p-2 flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-700"
                >
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-row">
            <p className="text-[13px] font-normal leading-[148%] tracking-[-1%] pr-25">
              Consequat velit qui adipisicing sunt do rependerit ad laborum
              tempor ullamco.
            </p>
          </div>
          {/* Border Line */}
          <div className="border-1 bg-[#D9D9D9] w-[335px]"></div>
        </div>

        {/* Bottle Image Section  */}
        <div className="relative overflow-hidden">
          <div className="absolute h-[595px] w-[595px] bg-gradient-to-r from-blue-500 to-green-500"></div>
        </div>
      </div>
    </>
  );
};

export default FourthPage;
