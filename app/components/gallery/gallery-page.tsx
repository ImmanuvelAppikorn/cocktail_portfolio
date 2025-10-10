"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const GalleryPage = ({ onPrevClick }: { onPrevClick?: () => void }) => {
  const images = [
    [
      "/gallery/new/image 1.png",
      "/gallery/new/image 2.png",
      "/gallery/new/image 3.png",
    ],
    [
      "/gallery/new/image 4.png",
      "/gallery/new/image 5.png",
      "/gallery/new/image 6.png",
    ],
    [
      "/gallery/new/image 7.png",
      "/gallery/new/image 8.png",
      "/gallery/new/image 9.png",
    ],
    [
      "/gallery/new/image 10.png",
      "/gallery/new/image 11.png",
      "/gallery/new/image 12.png",
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
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="top-0 left-0 w-full z-20 bg-white py-2 border-b border-black"
      >
        <p className="text-[#EB235C] text-[26.19px] font-bold text-center font-montagu ">
          GALLERY
        </p>
      </motion.div>

      {/* Scrollable Gallery Section */}
      <div
        className="absolute top-[60px] bottom-0 left-0 right-0 overflow-y-auto p-2 pb-20 space-y-2 px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
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
                  variants={slideFromLeft}
                  initial="hidden"
                  animate="visible"
                  transition={transition}
                  className="col-span-2 flex justify-center"
                >
                  <div className="relative w-full h-[250px]">
                    <Image
                      src={img1}
                      alt=""
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </motion.div>

                {/* Two Small Right Images (stacked, fixed heights) */}
                <div className="grid col-span-1 gap-2">
                  {[img2, img3].map((img, i) => (
                    <motion.div
                      key={i}
                      variants={slideFromRight}
                      initial="hidden"
                      animate="visible"
                      transition={{ ...transition, delay: i * 0.1 }}
                      className="col-span-2 flex justify-center"
                    >
                      <div className="relative w-full h-[120px]">
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover rounded-lg"
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
                      variants={slideFromLeft}
                      initial="hidden"
                      animate="visible"
                      transition={{ ...transition, delay: i * 0.1 }}
                      className="flex justify-center"
                    >
                      <div className="relative w-full h-[120px]">
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Big Right Image */}
                <motion.div
                  variants={slideFromRight}
                  initial="hidden"
                  animate="visible"
                  transition={transition}
                  className="col-span-2 flex justify-center"
                >
                  <div className="relative w-full h-[250px]">
                    <Image
                      src={img3}
                      alt=""
                      fill
                      className="object-cover rounded-lg"
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
                  variants={
                    i === 0
                      ? slideFromLeft
                      : i === 1
                        ? slideFromCenter
                        : slideFromRight
                  }
                  initial="hidden"
                  animate="visible"
                  transition={{ ...transition, delay: i * 0.1 }}
                  className="flex justify-center"
                >
                  <div className="relative w-full h-[120px]">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover rounded-lg"
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
