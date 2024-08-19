"use client";
import Counter from "./components/Counter";
import WebApp from "@twa-dev/sdk";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { FaTasks, FaUser } from "react-icons/fa";
import Tasks from "./components/Tasks";
import Profiles from "./components/Profiles";
import Shake from "shake.js";
import ModalAllow from "./components/Modal/ModalAllow";
import axios from "axios";

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
    name: "Profiles",
    icon: (
      <FaUser className="text-2xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
  },
];

export default function Home() {
  const [count, setCount] = useState(0);
  const [energy, setEnergy] = useState({
    current: 2000,
    max: 2000,
  });
  const [increment, setIncrement] = useState(1);
  const frenzyBar = energy.max * 0.2;
  const [frenzy, setFrenzy] = useState({
    isActive: false,
    count: 0,
  });
  const frenzyTimer = useRef<NodeJS.Timeout | null>(null);
  const frenzyDuration = 5000;
  
  const [isMobile, setIsMobile] = useState(false);
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
            router.push("/");
          }
        } else {
          setPermissionGranted(true);
          setupShakeEvent();
          router.push("/");
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

    const startFrenzyTimer = () => {
      frenzyTimer.current = setTimeout(() => {
        setFrenzy((prevFrenzy) => ({
          ...prevFrenzy,
          isActive: false,
        }));
        setIncrement(1);
        alert("Frenzy Mode Deactivated");
      }, frenzyDuration);
    };
    
    const handleShake = () => {
      if (energy.current > 0) {
        if (frenzy.count >= frenzyBar && !frenzy.isActive) {
          setFrenzy({
            isActive: true,
            count: 0,
          });

          setIncrement(2);
          alert("Frenzy Mode Activated");
          startFrenzyTimer();
        } else {
          setCount((prevCount) => prevCount + increment);
          setEnergy((prevEnergy) => ({
            ...prevEnergy,
            current: prevEnergy.current - 1,
          }));

          if (frenzy.isActive) {
            // If frenzy is active, reset the frenzy count
            setFrenzy((prevFrenzy) => ({
              ...prevFrenzy,
              count: 0,
            }));
          } else {
            // If frenzy is not active, increment the frenzy count
            setFrenzy((prevFrenzy) => ({
              ...prevFrenzy,
              count: prevFrenzy.count + increment,
            }));
          }
        }
      } else {
        alert("You have reached the maximum energy");
        if (myShakeEvent.current) {
          myShakeEvent.current.stop();
          window.removeEventListener("shake", handleShake, false);
        }
      }
    };

    const login = async () => {
      try {
        const response = await axios.post("/api/user/login", {
          tele_id: userData?.id
        });

        if (response.status === 200 && response.data.success) {
          console.log("Login successful:", response.data);
        } else {
          router.push("?modal=true");
        }

      } catch (error) {
        console.error("Login error:", error);
        router.push("?modal=true");
      }
    };
    
  useEffect(() => {
    if(!permissionGranted){
      router.push("?ModalPermission=true");
    }

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
  }, [router, permissionGranted]);
  
  // login();

  return (
    <div className="h-[calc(100vh-4.5rem)]">
      {isMobile ? (
        <>
          {Page === "Home" && (
            <Counter
              count={count}
              energy={energy}
              frenzy={frenzy}
              frenzyBar={frenzyBar}
              increment={increment}
              handleShake={handleShake}
            />
          )}
          {Page === "Tasks" && <Tasks />}
          {userData && Page === "Profiles" && <Profiles userData={userData} />}
        </>
      ) : (
        <div className="w-full h-full py-20">
          <div className="flex flex-col gap-y-4 items-center">
            <h2 className="text-H2">Change To Desktop</h2>
          </div>
        </div>
      )}

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
      <ModalAllow onAllowPermission={checkMotionPermission} />
    </div>
  );
}
