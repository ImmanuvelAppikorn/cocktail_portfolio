"use client";
import "@/styles/globals.css";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { useViewportHeight } from "@/hooks/useViewportHeight";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Use custom hook for viewport height management
  useViewportHeight();

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" 
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={clsx(
          "text-foreground bg-background font-sans antialiased flex justify-center",
          fontSans.variable
        )}
        style={{
          height: "var(--app-height)",
          maxHeight: "var(--app-height)",
          overflow: "hidden",
          position: "fixed",
          width: "100%",
          top: 0,
          left: 0,
        }}
      >
        <div
          className="w-full max-w-[500px] flex flex-col relative mx-auto"
          style={{
            height: "var(--app-height)",
            maxHeight: "var(--app-height)",
          }}
        >
          {/* Main content area with fixed height */}
          <main
            className="flex-1 relative"
            style={{
              height: "var(--app-height)",
              maxHeight: "var(--app-height)",
              overflow: "hidden",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
