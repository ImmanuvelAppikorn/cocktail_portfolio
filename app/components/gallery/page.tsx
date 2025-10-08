"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const GalleryPage = ({ onPrevClick }: { onPrevClick?: () => void }) => {
  const images = [
    ["/gallery/image 1.png", "/gallery/image 2.png", "/gallery/image 3.png"],
    ["/gallery/image 4.png", "/gallery/image 5.png", "/gallery/image 6.png"],
    ["/gallery/image 7.png", "/gallery/image 8.png", "/gallery/image 9.png"],
    ["/gallery/image 10.png", "/gallery/image 11.png", "/gallery/image 12.png"],
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
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Fixed Gallery Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="top-0 left-0 w-full z-20 bg-white py-2 px-2 border-b border-black"
      >
        <p className="text-[#EB235C] text-[26.19px] font-bold text-center">
          GALLERY
        </p>
      </motion.div>

      {/* Scrollable Gallery Section */}
      <div
        className="absolute top-[60px] bottom-0 left-0 right-0 overflow-y-auto p-2 pb-20 space-y-2"
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
              <div key={idx} className="grid grid-cols-3 gap-2">
                {/* Big Left Image */}
                <motion.div
                  variants={slideFromLeft}
                  initial="hidden"
                  animate="visible"
                  transition={transition}
                  className="col-span-2"
                >
                  <div className="relative w-full h-[250px] md:h-[280px] lg:h-[320px]">
                    <Image
                      src={img1}
                      alt=""
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </motion.div>

                {/* Two Small Right Images */}
                <div className="grid col-span-1 gap-2">
                  {[img2, img3].map((img, i) => (
                    <motion.div
                      key={i}
                      variants={slideFromRight}
                      initial="hidden"
                      animate="visible"
                      transition={{ ...transition, delay: i * 0.1 }}
                      className="relative h-[120px] md:h-[140px] lg:h-[160px]"
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover rounded-lg"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          }

          // Layout 2: 2 small left, big right
          if (layoutType === 1) {
            return (
              <div key={idx} className="grid grid-cols-3 gap-2">
                <div className="grid col-span-1 gap-2">
                  {[img1, img2].map((img, i) => (
                    <motion.div
                      key={i}
                      variants={slideFromLeft}
                      initial="hidden"
                      animate="visible"
                      transition={{ ...transition, delay: i * 0.1 }}
                    >
                      <Image
                        src={img}
                        alt=""
                        height={120}
                        width={122}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  variants={slideFromRight}
                  initial="hidden"
                  animate="visible"
                  transition={transition}
                  className="col-span-2"
                >
                  <Image
                    src={img3}
                    alt=""
                    height={250}
                    width={253}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </motion.div>
              </div>
            );
          }

          // Layout 3: 3 equal images
          return (
            <div key={idx} className="grid grid-cols-3 gap-2">
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
                >
                  <Image
                    src={img}
                    alt=""
                    height={120}
                    width={122}
                    className="w-full h-auto object-cover rounded-lg"
                  />
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
