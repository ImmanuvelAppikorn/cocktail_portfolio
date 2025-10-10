"use client";
import "@/styles/globals.css";
import clsx from "clsx";
import { useEffect } from "react";
import { fontSans } from "@/config/fonts";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    function setAppHeight() {
      const appHeight = window.innerHeight;

      document.documentElement.style.setProperty(
        "--app-height",
        `${appHeight}px`,
      );
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
          "text-foreground bg-white antialiased flex justify-center",
          fontSans.variable,
        )}
        style={{
          height: "var(--app-height)",
          overflow: "hidden", // stop body scroll; we'll scroll the inner content instead
          backgroundColor: "white",
        }}
      >
        <div
          className="w-full max-w-[500px] flex flex-col relative"
          style={{
            height: "var(--app-height)", // fixed height equal to visible screen
          }}
        >
          {/* Scrollable content area */}
          <main className="flex-grow overflow-y-auto">{children}</main>

          {/* Fixed navigation bar */}
        </div>
      </body>
    </html>
  );
}
