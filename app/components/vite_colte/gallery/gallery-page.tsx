"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const GalleryPage = ({ onPrevClick }: { onPrevClick?: () => void }) => {
  const images = [

  ["/assets/vite_colte/gallery/1_rectangle.svg", "/assets/vite_colte/gallery/2_rectangle.svg", "/assets/vite_colte/gallery/3_rectangle.svg"],
  ["/assets/vite_colte/gallery/4_rectangle.svg", "/assets/vite_colte/gallery/5_rectangle.svg", "/assets/vite_colte/gallery/6_rectangle.svg"],
  ["/assets/vite_colte/gallery/7_rectangle.svg", "/assets/vite_colte/gallery/8_rectangle.svg", "/assets/vite_colte/gallery/9_rectangle.svg"],
  ["/assets/vite_colte/gallery/10_rectangle.svg", "/assets/vite_colte/gallery/11_rectangle.svg", "/assets/vite_colte/gallery/12_rectangle.svg"],
  ["/assets/vite_colte/gallery/13_rectangle.svg", "/assets/vite_colte/gallery/14_rectangle.svg", "/assets/vite_colte/gallery/15_rectangle.svg"],
  ["/assets/vite_colte/gallery/16_rectangle.svg", "/assets/vite_colte/gallery/17_rectangle.svg", "/assets/vite_colte/gallery/18_rectangle.svg"],
  ["/assets/vite_colte/gallery/19_rectangle.svg", "/assets/vite_colte/gallery/20_rectangle.svg", "/assets/vite_colte/gallery/21_rectangle.svg"],
  ["/assets/vite_colte/gallery/22_rectangle.svg", "/assets/vite_colte/gallery/23_rectangle.svg", "/assets/vite_colte/gallery/24_rectangle.svg"],
  ["/assets/vite_colte/gallery/25_rectangle.svg", "/assets/vite_colte/gallery/26_rectangle.svg", "/assets/vite_colte/gallery/27_rectangle.svg"],
  ["/assets/vite_colte/gallery/28_rectangle.svg", "/assets/vite_colte/gallery/29_rectangle.svg", "/assets/vite_colte/gallery/30_rectangle.svg"],
  ["/assets/vite_colte/gallery/31_rectangle.svg", "/assets/vite_colte/gallery/32_rectangle.svg", "/assets/vite_colte/gallery/33_rectangle.svg"],
  ["/assets/vite_colte/gallery/34_rectangle.svg", "/assets/vite_colte/gallery/35_rectangle.svg", "/assets/vite_colte/gallery/36_rectangle.svg"],
  ["/assets/vite_colte/gallery/37_rectangle.svg", "/assets/vite_colte/gallery/38_rectangle.svg", "/assets/vite_colte/gallery/39_rectangle.svg"],
  ["/assets/vite_colte/gallery/40_rectangle.svg", "/assets/vite_colte/gallery/41_rectangle.svg", "/assets/vite_colte/gallery/42_rectangle.svg"],
  ["/assets/vite_colte/gallery/43_rectangle.svg", "/assets/vite_colte/gallery/44_rectangle.svg", "/assets/vite_colte/gallery/45_rectangle.svg"],
  ["/assets/vite_colte/gallery/46_rectangle.svg", "/assets/vite_colte/gallery/47_rectangle.svg", "/assets/vite_colte/gallery/48_rectangle.svg"],
  ["/assets/vite_colte/gallery/49_rectangle.svg", "/assets/vite_colte/gallery/50_rectangle.svg"],

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
