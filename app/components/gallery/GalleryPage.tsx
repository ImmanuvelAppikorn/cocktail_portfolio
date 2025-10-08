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
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full z-20 bg-white py-2 px-2 border-b border-black"
        initial={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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
                  animate="visible"
                  className="col-span-2"
                  initial="hidden"
                  transition={transition}
                  variants={slideFromLeft}
                >
                  <div className="relative w-full h-[250px] md:h-[280px] lg:h-[320px]">
                    <Image
                      fill
                      alt=""
                      className="object-cover rounded-lg"
                      src={img1}
                    />
                  </div>
                </motion.div>

                {/* Two Small Right Images */}
                <div className="grid col-span-1 gap-2">
                  {[img2, img3].map((img, i) => (
                    <motion.div
                      key={i}
                      animate="visible"
                      className="relative h-[120px] md:h-[140px] lg:h-[160px]"
                      initial="hidden"
                      transition={{ ...transition, delay: i * 0.1 }}
                      variants={slideFromRight}
                    >
                      <Image
                        fill
                        alt=""
                        className="object-cover rounded-lg"
                        src={img}
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
                      animate="visible"
                      initial="hidden"
                      transition={{ ...transition, delay: i * 0.1 }}
                      variants={slideFromLeft}
                    >
                      <Image
                        alt=""
                        className="w-full h-auto object-cover rounded-lg"
                        height={120}
                        src={img}
                        width={122}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  animate="visible"
                  className="col-span-2"
                  initial="hidden"
                  transition={transition}
                  variants={slideFromRight}
                >
                  <Image
                    alt=""
                    className="w-full h-auto object-cover rounded-lg"
                    height={250}
                    src={img3}
                    width={253}
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
                  animate="visible"
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
                  <Image
                    alt=""
                    className="w-full h-auto object-cover rounded-lg"
                    height={120}
                    src={img}
                    width={122}
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
