"use client";

import React from "react";
import Image from "next/image";

interface MoreDetailsProps {
  onPrevClick: () => void;
}

const MoreDetails = ({ onPrevClick }: MoreDetailsProps) => {
  return (
    <div
      className="pt-2 px-4 flex flex-col items-center max-h-screen max-w-[500px] mx-auto overflow-hidden"
      style={{ touchAction: "none", overscrollBehavior: "none" }}
    >
      {/* Title */}

      <div className="flex flex-row w-full pt-2 pb-2 items-center justify-center border-b border-black">
        <button onClick={onPrevClick} className="flex-shrink-0">
          <Image
            src="/button-image/black-back.svg"
            alt="Back Icon"
            height={28}
            width={28}
          />
        </button>
        <h2 className="flex-1 text-center text-[#EB235C] text-[24px] font-bold leading-tight font-montagu">
          CRIMSON RESERVE
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="w-full pl-2 mt-1 overflow-y-scroll no-scrollbar">
        <p className="text-[16px] text-[#EB235C] font-extrabold tracking-[2px] w-full pb-0 mt-6 font-montagu pl-2">
          About The Wine
        </p>

        <p className="text-[12px] w-full font-axiforma tracking-[1px] font-medium mt-1 leading-7  pl-4 pr-2 pt-2 text-justify">
          Lorem ipsum dolor sit amet consectetur. Sit sapien vulputate egestas
          nunc quis. Tortor aenean nisl nullam purus donec dolor sit. Vestibulum
          vestibulum vel ut libero volutpat magna gravida. Malesuada feugiat
          amet ultrices elit vulputate eu. Sed leo a lectus enim faucibus
          adipiscing ipsum.
          <br /> Suspendisse tempus tempor ut laoreet cursus. Cras nulla arcu
          leo sagittis amet tincidunt neque. Malesuada et tellus scelerisque
          ipsum eu ornare lorem tempus rutrum.
          <br /> Aliquam id sit gravida vulputate semper. Cras suscipit in
          elementum ipsum. Senectus integer id ut sagittis lectus. Tempus arcu
          nibh posuere lacus augue. Malesuada pellentesque phasellus proin
          vestibulum. Vestibulum proin sed tempor imperdiet tempus urna.
          Sagittis sed gravida massa dolor ultrices dictum convallis fermentum
          amet. Dignissim volutpat non arcu tincidunt. Laoreet leo urna non eget
          tincidunt. Lectus mus adipiscing sollicitudin in.
          <br /> Arcu nisl at tincidunt augue in. Nulla mauris pretium imperdiet
          amet sagittis at vestibulum venenatis. Diam ut viverra nullam dapibus
          pretium sit sollicitudin pharetra a. Consequat placerat faucibus sed
          arcu ipsum pretium dignissim. Et id auctor mauris sed. Lorem ipsum
          dolor sit amet consectetur. Sit sapien vulputate egestas nunc quis.
          Tortor aenean nisl nullam purus donec dolor sit. Vestibulum vestibulum
          vel ut libero volutpat magna gravida. Malesuada feugiat amet ultrices
          elit vulputate eu. Sed leo a lectus enim faucibus adipiscing ipsum.
          Suspendisse tempus tempor ut laoreet cursus. Cras nulla arcu leo
          sagittis amet tincidunt neque. Malesuada et tellus scelerisque ipsum
          eu ornare lorem tempus rutrum. Aliquam id sit gravida vulputate
          semper. Cras suscipit in elementum ipsum. Senectus integer id ut
          sagittis lectus. Tempus arcu nibh posuere lacus augue. Malesuada
          pellentesque phasellus proin vestibulum.
          <br /> Vestibulum proin sed tempor imperdiet tempus urna. Sagittis sed
          gravida massa dolor ultrices dictum convallis fermentum amet.
          Dignissim volutpat non arcu tincidunt. Laoreet leo urna non eget
          tincidunt. Lectus mus adipiscing sollicitudin in. Arcu nisl at
          tincidunt augue in. Nulla mauris pretium imperdiet amet sagittis at
          vestibulum venenatis. Diam ut viverra nullam dapibus pretium sit
          sollicitudin pharetra a. Consequat placerat faucibus sed arcu ipsum
          pretium dignissim. Et id auctor mauris sed.
        </p>
      </div>
    </div>
  );
};

export default MoreDetails;
