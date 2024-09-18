"use client";
import Counter from "./components/Counter";
import WebApp from "@twa-dev/sdk";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HiHome, HiOutlineUsers } from "react-icons/hi";
import Tasks from "./components/Tasks";
import Profiles from "./components/Profiles";
import Shake from "shake.js";
import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import NormalVids from "./components/Normal";
import ShakeVids from "./components/Shake";
import CapeVids from "./components/Cape";
import bg from '../../public/Bg.png'
import { UserData, MeUser } from "./constant/types";
import { AiFillHome } from "react-icons/ai";
import { CgList } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import Referrals from "./components/Referral";
import Settings from "./components/Settings";
import ModalAllowComponent from "./components/Modal/ModalAllow";
import { PostReferral } from "./utils/api";
import { cookies } from "next/headers";
import Link from "next/link";

// // Provide default values for all properties
// const defaultUserData: UserData = {
//   id: 6789952150, // Default ID value
//   username: "drianksz", // Default username value (empty string)
//   language_code: "", // Default language code (e.g., 'en' for English)
//   is_premium: false, // Default premium status (false)
// };

const Footerdata = [
  {
    name: "Home",
    icon: <AiFillHome className="text-2xl mb-1 group-hover:text-[#E0FD60]" />,
  },
  {
    name: "Tasks",
    icon: <CgList className="text-2xl mb-1 group-hover:text-[#E0FD60]" />,
  },
  {
    name: "Referrals",
    icon: (
      <HiOutlineUsers className="text-2xl mb-1 group-hover:text-[#E0FD60]" />
    ),
  },
  {
    name: "Settings",
    icon: (
      <IoSettingsOutline className="text-2xl mb-1 group-hover:text-[#E0FD60]" />
    ),
  },
];

export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [energy, setEnergy] = useState({
    current: 0,
    max: 2000,
  });
  const [increment, setIncrement] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [Page, setPage] = useState("Home");
  const [userData, setUserData] = useState<UserData>();
  const myShakeEvent = useRef<Shake | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [userDetails, setUserDetails] = useState<MeUser | null>(null);
  const [VideoComponent, setVideoComponent] = useState(() => NormalVids);
  const previousCount = useRef<number>(count);
  const [startParam, setStartParam] = useState("");
  const [isLogin, setIsLogin] = useState(false);

   const playAudio = () => {
     const audio = new Audio("/audio.mp3");
     audio.loop = true;
     audio
       .play()
       .catch((error) => console.error("Audio playback error:", error));
   };

  const RegisterLogin = async () => {
    const formData = {
      tele_id: String(userData?.id),
      name: String(userData?.username),
      email: "",
      region: "",
    };

    try {
      const response = await axios.post(
        "https://api2.fingo.co.id/api/user",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login Success", response.data);

      if (response.data.status == true) {
        setModalOpen(true);
        setIsLogin(true);
        playAudio();
      }

      setCookie(null, "token", response.data.data.token, {
        maxAge: 3 * 60 * 60,
        path: "/",
      });

      setDailyCount(response.data.data.daily_count);
      setCount(response.data.data.coin);
      setEnergy({
        current: response.data.data.energy,
        max: 2000,
      });
    } catch (error) {
      // alert((error as any).response?.data?.message || "An error occurred");
      console.error("Error Login:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const cookies = parseCookies();
      const response = await axios.get("https://api2.fingo.co.id/api/user/me", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      console.log("Success Get User Data");
      setUserDetails(response.data.data);
      setDailyCount(response.data.data.daily_count);
      setCount(response.data.data.coins);
      setEnergy({
        current: response.data.data.energy,
        max: 2000,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const postReferral = async () => {
    try {
      const cookies = parseCookies();

      const formData = new URLSearchParams();
      formData.append("referrer_id", startParam); // `startParam` is your referrer ID

      const response = await axios.post(
        `https://api2.fingo.co.id/api/user/referralClaim`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/x-www-form-urlencoded", // Send as form data
          },
        }
      );
      fetchUserData();
      console.log("Referral Response:", response.data); // Log the response to debug
    } catch (error) {
      console.error("Error Referral user:", error);
    }
  };

  const Update = async () => {
    const cookies = parseCookies();
    const formData = {
      coins: count,
      energy: energy.current,
    };

    try {
      const response = await axios.post(
        "https://api2.fingo.co.id/api/user/updateEnergy",
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status == true) {
        console.log("update submitted successfully", response.data);
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setStartParam(WebApp.initDataUnsafe.start_param || "");
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }

    if (userData?.id && !isLogin) {
      RegisterLogin();
    }

    if (startParam) {
      postReferral();
    }

    if (count > previousCount.current) {
      Update();
    }

    previousCount.current = count;

  }, [userData?.id, count, userData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => {
        if (prevEnergy.current < 2000) {
          return {
            ...prevEnergy,
            current: prevEnergy.current + 1,
          };
        }
        return prevEnergy;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [energy.current]);

  useEffect(() => {
    const isMobileDevice =
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (!isMobileDevice) {
      console.log(
        "This application is designed for mobile devices. Some features may not work as expected."
      );
    } else {
      setIsMobile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, permissionGranted]);

  const checkMotionPermission = async () => {
    playAudio()
    setModalOpen(false);
    try {
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        const permissionState = await (
          DeviceMotionEvent as any
        ).requestPermission();
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

  const handleShake = () => {
    // console.log(count);
    // console.log(energy.current);
    if (energy.current > 0) {
      // setVideoComponent(() => ShakeVids);
      setCount((prevCount) => prevCount + increment);
      setEnergy((prevEnergy) => ({
        ...prevEnergy,
        current: prevEnergy.current - 1,
      }));
    } else {
      // setVideoComponent(() => CapeVids);
      alert("You have reached the maximum energy");
      if (myShakeEvent.current) {
        myShakeEvent.current.stop();
        window.removeEventListener("shake", handleShake, false);
      }
    }
  };

return (
  <>
    {isMobile ? (
      <div
        className="h-[100vh]"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {Page === "Home" && <Counter count={count} energy={energy} />}
        {Page === "Tasks" && (
          <Tasks onTaskClear={fetchUserData} userId={userData?.id ?? 0} />
        )}
        {userData && Page === "Profiles" && (
          <Profiles onTaskClear={fetchUserData} userData={userData} />
        )}
        {Page === "Referrals" && <Referrals userId={userData?.id ?? 0} />}
        {Page === "Settings" && <Settings userId={userData?.id ?? 0} />}

        <ModalAllowComponent
          username={userData?.username ?? ""}
          daily_count={dailyCount}
          onAllowPermission={checkMotionPermission}
          isOpen={isModalOpen}
        />
      </div>
    ) : (
      <div className="h-[100vh] flex justify-center items-center bg-gray-200">
        <div className="text-center">
          <h2 className="text-xl font-bold">
            This app is designed for mobile devices only.
          </h2>
          <p className="mt-2 text-gray-700">
            Please open this app on a mobile device to use its features.
          </p>
          <Link
            href={"https://t.me/shakeTongamebot"}
            className="mt-2 text-gray-700"
          >
            Click Here To Navigate
          </Link>
        </div>
      </div>
    )}
  </>
);
}

