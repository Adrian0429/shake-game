import { Manrope } from "next/font/google"; // Import Manrope from @next/font/google
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TON Project",
  description: "Earn by doing task!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
