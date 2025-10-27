"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const GalleryPage = ({ onPrevClick }: { onPrevClick?: () => void }) => {
  const images = [
    [
      "/assets/scapra/gallery/image-1.svg",
      "/assets/scapra/gallery/image-2.svg",
      "/assets/scapra/gallery/image-3.svg",
    ],
    [
      "/assets/scapra/gallery/image-4.svg",
      "/assets/scapra/gallery/image-5.svg",
      "/assets/scapra/gallery/image-6.svg",
    ],
    [
      "/assets/scapra/gallery/image-7.svg",
      "/assets/scapra/gallery/image-8.svg",
      "/assets/scapra/gallery/image-9.svg",
    ],
    [
      "/assets/scapra/gallery/image-10.svg",
      "/assets/scapra/gallery/image-11.svg",
      "/assets/scapra/gallery/image-12.svg",
    ],
    [
      "/assets/scapra/gallery/image-13.svg",
      "/assets/scapra/gallery/image-14.svg",
      "/assets/scapra/gallery/image-15.svg",
    ],
    [
      "/assets/scapra/gallery/image-16.svg",
      "/assets/scapra/gallery/image-17.svg",
      "/assets/scapra/gallery/image-18.svg",
    ],
    [
      "/assets/scapra/gallery/image-19.svg",
      "/assets/scapra/gallery/image-20.svg",
      "/assets/scapra/gallery/image-21.svg",
    ],
  ];

  const slideFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  const slideFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  const slideFromCenter = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const transition = { duration: 0.6, ease: "easeOut" };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden px-4">
      {/* Fixed Gallery Header */}
      <div className="flex flex-row w-full pt-2 pb-2 items-center justify-center border-b border-black">
        <button className="flex-shrink-0 cursor-pointer" onClick={onPrevClick}>
          <Image
            alt="Back Icon"
            height={26}
            src="/button-image/black-back.svg"
            width={26}
          />
        </button>
        <h2 className="flex-1 text-center text-[#EB235C] text-[19px] font-bold leading-tight font-montagu">
          GALLERY
        </h2>
      </div>

      {/* Scrollable Gallery Section */}
      <div
        className="absolute top-[60px] bottom-0 left-0 right-0 overflow-y-auto p-2 pb-20 space-y-2 px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {images.map((section, idx) => {
          const layoutType = idx % 3;
          const [img1, img2, img3] = section;

          // Layout 1: Big left, 2 small right
          if (layoutType === 0) {
            return (
              <div key={idx} className="grid grid-cols-3 gap-2 items-start">
                {/* Big Left Image (fixed height) */}
                <motion.div
                  animate="visible"
                  className="col-span-2 flex justify-center"
                  initial="hidden"
                  transition={transition}
                  variants={slideFromLeft}
                >
                  <div className="relative w-full h-[250px]">
                    <Image
                      fill
                      alt=""
                      className="object-cover rounded-lg"
                      src={img1}
                    />
                  </div>
                </motion.div>

                {/* Two Small Right Images (stacked, fixed heights) */}
                <div className="grid col-span-1 gap-2">
                  {[img2, img3].map((img, i) => (
                    <motion.div
                      key={i}
                      animate="visible"
                      className="col-span-2 flex justify-center"
                      initial="hidden"
                      transition={{ ...transition, delay: i * 0.1 }}
                      variants={slideFromRight}
                    >
                      <div className="relative w-full h-[120px]">
                        <Image
                          fill
                          alt=""
                          className="object-cover rounded-lg"
                          src={img}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          }

          // Layout 2: 2 small left, big right
          if (layoutType === 1) {
            return (
              <div key={idx} className="grid grid-cols-3 gap-2 items-start">
                {/* Two Small Left Images */}
                <div className="grid col-span-1 gap-2">
                  {[img1, img2].map((img, i) => (
                    <motion.div
                      key={i}
                      animate="visible"
                      className="flex justify-center"
                      initial="hidden"
                      transition={{ ...transition, delay: i * 0.1 }}
                      variants={slideFromLeft}
                    >
                      <div className="relative w-full h-[120px]">
                        <Image
                          fill
                          alt=""
                          className="object-cover rounded-lg"
                          src={img}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Big Right Image */}
                <motion.div
                  animate="visible"
                  className="col-span-2 flex justify-center"
                  initial="hidden"
                  transition={transition}
                  variants={slideFromRight}
                >
                  <div className="relative w-full h-[250px]">
                    <Image
                      fill
                      alt=""
                      className="object-cover rounded-lg"
                      src={img3}
                    />
                  </div>
                </motion.div>
              </div>
            );
          }

          // Layout 3: 3 equal images
          return (
            <div key={idx} className="grid grid-cols-3 gap-2 items-start">
              {[img1, img2, img3].map((img, i) => (
                <motion.div
                  key={i}
                  animate="visible"
                  className="flex justify-center"
                  initial="hidden"
                  transition={{ ...transition, delay: i * 0.1 }}
                  variants={
                    i === 0
                      ? slideFromLeft
                      : i === 1
                        ? slideFromCenter
                        : slideFromRight
                  }
                >
                  <div className="relative w-full h-[120px]">
                    <Image
                      fill
                      alt=""
                      className="object-cover rounded-lg"
                      src={img}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
