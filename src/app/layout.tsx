
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import dynamic from "next/dynamic";
import PrelineScript from "./components/PrelineScript";
import FooterNav from "./components/Navigation/Footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        {children}
        <FooterNav />
        <Modal />
      </body>
      <PrelineScript />
    </html>
  );
}
