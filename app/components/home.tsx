"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WineCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-xs text-center relative">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 leading-snug">
          Vinea <br /> <span className="font-extrabold">Connect</span>
        </h1>

        {/* Bottle + Circle Background */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative mt-8 flex justify-center"
        >
          {/* Pink arc behind bottle */}
          <div className="absolute -top-10 w-64 h-64 rounded-full border-4 border-pink-400/70" />
          
          {/* Bottle image */}
          <Image
            src="/wine-bottle.png"   // replace with your bottle image
            alt="Blossom Rosé"
            width={240}
            height={480}
            className="relative z-10"
          />
        </motion.div>

        {/* Wine Label */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-900">BLOSSOM ROSÉ</h2>
          <p className="text-gray-600 tracking-wide text-sm">VINTAGE ROSÉ</p>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <a
            href="#"
            className="inline-flex items-center gap-1 bg-black text-white px-4 py-2 rounded-full text-sm shadow hover:bg-gray-800 transition"
          >
            Start the journey
            <span className="text-lg">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
