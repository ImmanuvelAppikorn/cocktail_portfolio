"use client";
import "@/styles/globals.css";
import clsx from "clsx";
import { useEffect } from "react";
import { fontSans } from "@/config/fonts";
import NavigationBar from "./components/navigation_bar/page";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function setAppHeight() {
      document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
    }

    setAppHeight();
    window.addEventListener("resize", setAppHeight);

    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-[var(--app-height)] text-foreground bg-background font-sans antialiased flex justify-center",
          fontSans.variable
        )}
      >
        <div className="w-full max-w-[500px] flex flex-col min-h-[var(--app-height)] relative">
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
