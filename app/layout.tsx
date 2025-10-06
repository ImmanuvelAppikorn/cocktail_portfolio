import "@/styles/globals.css";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import NavigationBar from "./components/navigation_bar/page";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/logo/logo.svg",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-[100dvh] text-foreground bg-background font-sans antialiased flex justify-center",
          fontSans.variable
        )}
      >
        <div className="w-full max-w-[500px] flex flex-col min-h-[100dvh] relative">
          <main className="flex-grow">{children}</main>

          {/* Floating bottom navigation */}
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[500px] z-30 shadow-xl rounded-full p-3 flex justify-around">
            <NavigationBar />
          </div>
        </div>
      </body>
    </html>
  );
}
