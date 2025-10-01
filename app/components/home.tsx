"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WineCard() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
    
      {/* Title */}
      <h1
        className="text-center font-montagu font-semibold absolute top-[7.5rem]"
        style={{
          color: "var(--Text-Color, #1C1826)",
          fontSize: "66.94px",
          lineHeight: "80%",
          fontStyle: "normal",
        }}
      >
        Vinea <br />
        <span className="font-extrabold">Connect</span>
      </h1>

<div className="mt-6 absolute top-1/2 transform -translate-y-[200%] right-4">
  <a
    href="#"
    className="inline-flex items-center justify-center"
 style={{
            padding: "13.333px 17.778px",
            gap: "1.111px",
            borderRadius: "55.556px",
            background: "var(--Text-Color, #1C1826)",
            color: "#FFF",
            textAlign: "center",
            fontSize: "11.111px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "90%",
            letterSpacing: "-0.333px",
          }}
  >
    Start the journey
    <img
      src="/button-image/arrow-up-right.svg"
      alt="arrow"
      className="ml-1"
      style={{ width: "12px", height: "12px" }}
    />
  </a>
</div>



      {/* Bottle image */}
      <div
        className="absolute -left-65 top-46 z-10 -rotate-11"
        style={{ width: 1087, height: 1183 }}
      >
        <Image
          src="/vinea/Rose.svg"
          alt="Blossom Rosé"
          width={1087}
          height={1183}
        />
      </div>

      {/* Bottle + Circle Background */}
      <div className="absolute -bottom-80 flex items-center justify-center w-full mt-10">
        {/* Pink arc behind bottle */}
        <div className="-rotate-15">
          <div className="relative flex items-center justify-center w-[850px] h-[850px] rounded-full bg-gradient-to-b from-[rgba(235,35,92,0)] to-[#EB235C]">
            <div className="absolute left-1/2 tranform -translate-x-1/2 top-[1.5px] w-[830px] h-[830px] rounded-full border-[28px] border-white bg-[#EB235C]">
              <div className="absolute left-1/2 tranform -translate-x-1/2  top-1/2 tranform -translate-y-1/2  w-[500px] h-[500px] rounded-full   bg-[#FFB2C8] blur-[80px]">
                {" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
