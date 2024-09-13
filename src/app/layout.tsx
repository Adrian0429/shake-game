
import type { Metadata } from "next";
import { Inter, Bubblegum_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import dynamic from "next/dynamic";
import PrelineScript from "./components/PrelineScript";

const bubblegumSans = Bubblegum_Sans({
  weight: "400",
  subsets: ["latin"],
});

const Modal = dynamic(() => import("../app/components/Modal/Modal"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "ShakeItShakeIt",
  description: "Shake TON Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={bubblegumSans.className}>
        {children}
      </body>
      <PrelineScript />
    </html>
  );
}
