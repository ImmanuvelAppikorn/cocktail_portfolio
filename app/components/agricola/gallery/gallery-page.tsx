"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GalleryPage = ({ onPrevClick }: { onPrevClick?: () => void }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const images = [
    [
      "/assets/agricola/gallery/0_rectangle.svg",
      "/assets/agricola/gallery/1_rectangle.svg",
      "/assets/agricola/gallery/2_rectangle.svg",
    ],
    [
      "/assets/agricola/gallery/5_rectangle.svg",
      "/assets/agricola/gallery/4_rectangle.svg",
      "/assets/agricola/gallery/3_rectangle.svg",
    ],
    [
      "/assets/agricola/gallery/6_rectangle.svg",
      "/assets/agricola/gallery/7_rectangle.svg",
      "/assets/agricola/gallery/8_rectangle.svg",
    ],
    [
      "/assets/agricola/gallery/9_rectangle.svg",
      "/assets/agricola/gallery/10_rectangle.svg",
      "/assets/agricola/gallery/11_rectangle.svg",
    ],
    [
      "/assets/agricola/gallery/12_rectangle.svg",
      "/assets/agricola/gallery/13_rectangle.svg",
      "/assets/agricola/gallery/14_rectangle.svg",
    ],
    [
      "/assets/agricola/gallery/15_rectangle.svg",
      "/assets/agricola/gallery/16_rectangle.svg",
      "/assets/agricola/gallery/17_rectangle.svg",
    ],
    [
      "/assets/agricola/gallery/18_rectangle.svg",
      "/assets/agricola/gallery/19_rectangle.svg",
      "/assets/agricola/gallery/20_rectangle.svg",
    ],
  ];

  const flatImages = images.flat();

  const handleImageClick = (sectionIdx: number, imgIdx: number) => {
    const flatIndex = sectionIdx * 3 + imgIdx;
    setSelectedImageIndex(flatIndex);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < flatImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) handleNext(); // Swiped left
    if (touchStart - touchEnd < -75) handlePrev(); // Swiped right
  };

  // Mouse drag handlers for desktop
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) setDragEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      if (dragStart - dragEnd > 75) handleNext(); // Drag left
      if (dragStart - dragEnd < -75) handlePrev(); // Drag right
      setIsDragging(false);
    }
  };

  // Animation Variants
  const slideFromLeft = { hidden: { x: -100, opacity: 0 }, visible: { x: 0, opacity: 1 } };
  const slideFromRight = { hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } };
  const slideFromCenter = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
  const transition = { duration: 0.6, ease: "easeOut" };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden px-4 ">
      {/* Header */}
      <div className="flex flex-row w-full pt-2 pb-2 items-center justify-center border-b border-black">
        <button className="flex-shrink-0 cursor-pointer" onClick={onPrevClick}>
          <Image alt="Back Icon" height={26} src="/button-image/black-back.svg" width={26} />
        </button>
        <h2 className="flex-1 text-center text-[#443A3B] text-[19px] font-bold leading-tight font-montagu">
          GALLERY
        </h2>
      </div>

{/* Scrollable Gallery Section */}
      <div
        className="absolute top-[60px] bottom-0 left-0 right-0 overflow-y-auto p-2 pb-20 space-y-2 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {images.map((section, idx) => {
          const layoutType = idx % 3;
          const [img1, img2, img3] = section;

          // Layout 1: Big left, 2 small right
          if (layoutType === 0) {
            return (
              <div key={idx} className="grid grid-cols-3 gap-2 items-start">
                <motion.div
                  animate="visible"
                  className="col-span-2 flex justify-center cursor-pointer"
                  initial="hidden"
                  transition={transition}
                  variants={slideFromLeft}
                  onClick={() => handleImageClick(idx, 0)}
                >
                  <div className="relative w-full h-[250px]">
                    <Image fill alt="" className="object-cover  object-top rounded-lg" src={img1} />
                  </div>
                </motion.div>

                <div className="grid col-span-1 gap-2">
                  {[img2, img3].map((img, i) => (
                    <motion.div
                      key={i}
                      animate="visible"
                      className="col-span-2 flex justify-center cursor-pointer"
                      initial="hidden"
                      transition={{ ...transition, delay: i * 0.1 }}
                      variants={slideFromRight}
                      onClick={() => handleImageClick(idx, i + 1)}
                    >
                      <div className="relative w-full h-[120px]">
                        <Image fill alt="" className="object-cover  object-top rounded-lg" src={img} />
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
                <div className="grid col-span-1 gap-2">
                  {[img1, img2].map((img, i) => (
                    <motion.div
                      key={i}
                      animate="visible"
                      className="flex justify-center cursor-pointer"
                      initial="hidden"
                      transition={{ ...transition, delay: i * 0.1 }}
                      variants={slideFromLeft}
                      onClick={() => handleImageClick(idx, i)}
                    >
                      <div className="relative w-full h-[120px]">
                        <Image fill alt="" className="object-cover object-top rounded-lg" src={img} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  animate="visible"
                  className="col-span-2 flex justify-center cursor-pointer"
                  initial="hidden"
                  transition={transition}
                  variants={slideFromRight}
                  onClick={() => handleImageClick(idx, 2)}
                >
                  <div className="relative w-full h-[250px]">
                    <Image fill alt="" className=" object-cover  object-top rounded-lg" src={img3} />
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
                  className="flex justify-center cursor-pointer"
                  initial="hidden"
                  transition={{ ...transition, delay: i * 0.1 }}
                  variants={i === 0 ? slideFromLeft : i === 1 ? slideFromCenter : slideFromRight}
                  onClick={() => handleImageClick(idx, i)}
                >
                  <div className="relative w-full h-[120px]">
                    <Image fill alt="" className=" object-cover  object-top rounded-lg" src={img} />
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Fullscreen Image Viewer */}
{/* Fullscreen Image Viewer */}
<AnimatePresence>
  {selectedImageIndex !== null && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black z-50 flex items-center justify-center"
      style={{ height: "100%" }}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 text-white text-3xl w-10 h-10 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition"
      >
          <Image src={"/button-image/close-circle-line.svg"} alt="previous" width={35} height={35}/>
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
        {selectedImageIndex + 1} / {flatImages.length}
      </div>

      {/* Previous Button */}
      {selectedImageIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4  text-white text-4xl bg-black/50 hover:bg-black/70 transition rounded-full w-12 h-12 flex items-center justify-center z-50"
        >
          <Image src={"/button-image/arrow-left-s-line.svg"} alt="previous" width={32} height={32}/>
        </button>
      )}

      {/* Next Button */}
      {selectedImageIndex < flatImages.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4  text-white text-4xl bg-black/50 hover:bg-black/70 transition rounded-full w-12 h-12 flex items-center justify-center z-50"
        >
           <Image src={"/button-image/arrow-right-s-line.svg"} alt="previous" width={32} height={32}/>
        </button>
      )}

      {/* Main Image with drag/swipe support */}
      <motion.div
        key={selectedImageIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full flex items-center justify-center p-4 cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDragStart={(e) => e.preventDefault()} // prevent default image drag
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center">
          <Image
            fill
            alt=""
            draggable={false}
            className="object-contain select-none pointer-events-none"
            src={flatImages[selectedImageIndex]}
          />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


    </div>
  );
};

export default GalleryPage;
