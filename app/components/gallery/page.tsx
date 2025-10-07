"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const GalleryPage = () => {
  const images = [
    ["/gallery/image 1.png", "/gallery/image 2.png", "/gallery/image 3.png"],
    ["/gallery/image 4.png", "/gallery/image 5.png", "/gallery/image 6.png"],
    ["/gallery/image 7.png", "/gallery/image 8.png", "/gallery/image 9.png"],
    ["/gallery/image 10.png", "/gallery/image 11.png", "/gallery/image 12.png"],
  ];

  // Animation variants
  const slideFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  const slideFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  const slideFromCenter = {
    visible: { y: 0, opacity: 1 },
  };

  const transition = { duration: 0.6, ease: "easeOut" };

  return (
    <div>
      {/* Gallery Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-[55px] py-2 px-2"
      >
        <p className="text-[#EB235C] text-[26.19px] font-bold text-center border-b border-black pb-1">
          GALLERY
        </p>
      </motion.div>

      {/* Gallery Images */}
      <div className="py-2 space-y-2">
        {images.map((section, idx) => {
          const layoutType = idx % 3; // 0 → layout1, 1 → layout2, 2 → layout3
          const [img1, img2, img3] = section;

          if (layoutType === 0) {
            // Big left, 2 small right
            return (
              <div key={idx} className="grid grid-cols-3 gap-2">
                <motion.div
                  variants={slideFromLeft}
                  initial="hidden"
                  animate="visible"
                  transition={transition}
                  className="col-span-2"
                >
                  <Image
                    src={img1}
                    alt=""
                    height={250}
                    width={253}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </motion.div>
                <div className="grid col-span-1 gap-2">
                  {[img2, img3].map((img, i) => (
                    <motion.div
                      key={i}
                      variants={slideFromRight}
                      initial="hidden"
                      animate="visible"
                      transition={{ ...transition }}
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
              </div>
            );
          } else if (layoutType === 1) {
            // 2 small left, big right
            return (
              <div key={idx} className="grid grid-cols-3 gap-2">
                <div className="grid col-span-1 gap-2">
                  {[img1, img2].map((img, i) => (
                    <motion.div
                      key={i}
                      variants={slideFromLeft}
                      initial="hidden"
                      animate="visible"
                      transition={{ ...transition }}
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
          } else {
            // 3 small images in a row
            return (
              <div key={idx} className="grid grid-cols-3 gap-2">
                <motion.div
                  variants={slideFromLeft}
                  initial="hidden"
                  animate="visible"
                  transition={transition}
                >
                  <Image
                    src={img1}
                    alt=""
                    height={120}
                    width={122}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </motion.div>
                <motion.div
                  variants={slideFromCenter}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...transition, delay: 0.2 }}
                >
                  <Image
                    src={img2}
                    alt=""
                    height={120}
                    width={122}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </motion.div>
                <motion.div
                  variants={slideFromRight}
                  initial="hidden"
                  animate="visible"
                  transition={{ ...transition, delay: 0.2 }}
                >
                  <Image
                    src={img3}
                    alt=""
                    height={120}
                    width={122}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </motion.div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
