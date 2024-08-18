"use client";
import FooterNav from "./components/Navigation/Footer";
import Counter from "./components/Counter";
import WebApp from "@twa-dev/sdk";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Navigation/Header";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { FaTasks, FaUser } from "react-icons/fa";
import Tasks from "./components/Tasks";
import Profiles from "./components/Profiles";
import Shake from "shake.js";

interface UserData {
  id: number;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

const Footerdata = [
  {
    name: "Home",
    icon: (
      <HiHome className="text-2xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
  },
  {
    name: "Tasks",
    icon: (
      <FaTasks className="text-2xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
  },
  {
    name: "Profile",
    icon: (
      <FaUser className="text-2xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
  },
];

export default function Home() {
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const token = localStorage.getItem("token");
  const router = useRouter();
  const [Page, setPage] = useState("Home");
  const [userData, setUserData] = useState<UserData | null>(null);
  const myShakeEvent = useRef<Shake | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

    const checkMotionPermission = async () => {
      try {
        if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
          const permissionState = await (DeviceMotionEvent as any).requestPermission();
          if (permissionState === "granted") {
            setPermissionGranted(true);
            setupShakeEvent();
          }
        } else {
          setPermissionGranted(true);
          setupShakeEvent();
        }
      } catch (error) {
        console.error("Error requesting DeviceMotionEvent permission:", error);
      }
    };

    const setupShakeEvent = () => {
      myShakeEvent.current = new Shake({ threshold: 10, timeout: 150 });
      myShakeEvent.current.start();

      window.addEventListener("shake", handleShake, false);
    };

    const handleShake = () => {
      setCount((prev) => prev + 1); 
    }

    


  useEffect(() => {

    // if (!token) {
    //   router.push("?modal=true");
    // }

    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
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
      {!permissionGranted && (
        <button
          className="bg-slate-500 w-[50%] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={checkMotionPermission}
        >
          Allow Device Motion
        </button>
      )}

      {count}
      {Page === "Home" && <Counter />}
      {Page === "Tasks" && <Tasks />}
      {userData && Page === "Profiles" && <Profiles userData={userData} />}

      <div className="fixed bottom-0 left-0 z-50 w-full h-[4.5rem] bg-white border-t rounded-t-2xl border-gray-200 dark:bg-slate-900 dark:border-gray-900">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          {Footerdata.map((item, index) => {
            const isActive = Page === item.name;
            return (
              <button
                onClick={() => setPage(item.name)}
                key={index}
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <div
                  className={`${
                    isActive
                      ? "text-blue-600 dark:text-blue-500"
                      : "text-gray-500 dark:text-gray-400"
                  } text-2xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500`}
                >
                  {item.icon}
                </div>
                <span
                  className={`${
                    isActive
                      ? "text-blue-600 dark:text-blue-500"
                      : "text-gray-500 dark:text-gray-400"
                  } text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
