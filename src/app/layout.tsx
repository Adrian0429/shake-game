import type { Metadata } from "next";
import { Inter, Bubblegum_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import dynamic from "next/dynamic";
import PrelineScript from "./components/PrelineScript";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const bubblegumSans = Bubblegum_Sans({
  weight: "400",
  subsets: ["latin"],
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
      <body className={bubblegumSans.className}>{children}</body>
      <PrelineScript />
      <ToastContainer
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </html>
  );
}
