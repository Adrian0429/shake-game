"use client";
import FooterNav from "./components/Navigation/Footer";
import Counter from "./components/Counter";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import Header from "./components/Navigation/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [login, setLogin] = useState(false);
  const token = localStorage.getItem("token");
  const router = useRouter();
  

  useEffect(() => {
    if (!token) {
      router.push("?modal=true");
    }
    const isMobileDevice =
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (!isMobileDevice) {
      alert(
        "This application is designed for mobile devices. Some features may not work as expected."
      );
    } else {
      setIsMobile(true);
    }
  }, [token, router]);

  return (
    <div className="h-[calc(100vh-4.5rem)]">
      {isMobile ? (
        <Counter />
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-center">
            Please access this application on a mobile device for the best
            experience.
          </p>
        </div>
      )}
    </div>
  );
}
