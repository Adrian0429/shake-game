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
import bg from '../../public/Bg.png'
import { UserData, MeUser } from "./constant/types";
import { AiFillHome } from "react-icons/ai";
import { CgList } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import Referrals from "./components/Referral";
import Settings from "./components/Settings";
import ModalAllowComponent from "./components/Modal/ModalAllow";
import Link from "next/link";
import ModalPermission from "./components/Modal/Modal";
import AudioPlayer from "react-h5-audio-player";


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
  const [isModalOpen, setModalOpen] = useState({
    modalDaily: false,
    modalPermission: false,
  });
  const [energy, setEnergy] = useState({
    current: 5,
    max: 500,
  });
  const [increment, setIncrement] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [Page, setPage] = useState("Home");
  const [userData, setUserData] = useState<UserData>();
  const myShakeEvent = useRef<Shake | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [userDetails, setUserDetails] = useState<MeUser | null>(null);
  const previousCount = useRef<number>(count);
  const [startParam, setStartParam] = useState("");
  const [isLogin, setIsLogin] = useState(false);

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
        console.log(response.data.data.daily);
        if ((response.data.data.daily = "Daily")) {
          setModalOpen((prevState) => ({
            ...prevState,
            modalDaily: true,
          }));
        }

        setModalOpen((prevState) => ({
          ...prevState,
          modalPermission: true,
        }));

        setIsLogin(true);
      }

      setCookie(null, "token", response.data.data.token, {
        maxAge: 3 * 60 * 60,
        path: "/",
      });

      setDailyCount(response.data.data.daily_count);
      setCount(response.data.data.coin);
      setEnergy({
        current: response.data.data.energy,
        max: 500,
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
        max: 500,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const postReferral = async () => {
    try {
      const cookies = parseCookies();
      const formData = {
        referred_id: String(userData?.id),
        referrer_id: String(startParam),
        name: String(userData?.username),
        email: "",
        region: "",
      };

      const response = await axios.post(
        `https://api2.fingo.co.id/api/user/referral`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/x-www-form-urlencoded", // Send as form data
          },
        }
      );

      setIsLogin(true);
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
    WebApp.ready();
    WebApp.expand();

    if (WebApp.initDataUnsafe.user) {
      setStartParam(WebApp.initDataUnsafe.start_param || "");
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }

    if (userData?.id && !isLogin) {
      if (startParam) {
        postReferral();
      } else {
        RegisterLogin();
      }
    }

    if (count > previousCount.current && Page == "Home") {
      Update();
    }

    previousCount.current = count;
  }, [userData?.id, count, userData]);

  useEffect(() => {
    const updateIncrement = () => {
      const now = new Date();
      const hours = now.getHours();

      if ((hours >= 8 && hours < 9) || (hours >= 21 && hours < 22)) {
        setIncrement(2);
      } else {
        setIncrement(1);
      }
    };

    updateIncrement();

    const interval = setInterval(updateIncrement, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => {
        if (prevEnergy.current < 500) {
          return {
            ...prevEnergy,
            current: prevEnergy.current + 1,
          };
        }
        return prevEnergy;
      });
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [permissionGranted]);

  const checkMotionPermission = async () => {
    playSound();
    try {
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        const permissionState = await (
          DeviceMotionEvent as any
        ).requestPermission();
        if (permissionState === "granted") {
          setPermissionGranted(true);
          setupShakeEvent();

          setModalOpen((prevState) => ({
            ...prevState,
            modalPermission: false,
            modalDaily: false,
          }));
        }
      } else {
        setPermissionGranted(true);
        setupShakeEvent();
        setModalOpen((prevState) => ({
          ...prevState,
          modalPermission: false,
          modalDaily: false,
        }));
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
    // Early return if the page is not "Home"
    if (Page !== "Home") {
      return;
    }

    // Only increment the count and decrement energy if energy is greater than 0
    if (energy.current > 0) {
      setCount((prevCount) => prevCount + increment);
      setEnergy((prevEnergy) => ({
        ...prevEnergy,
        current: prevEnergy.current - 1,
      }));
    }
    // Handle the case where energy is 0
    else if (energy.current === 0) {
      alert("You have reached the maximum energy");

      // Stop the shake event listener when energy reaches 0
      if (myShakeEvent.current) {
        myShakeEvent.current.stop();
        window.removeEventListener("shake", handleShake, false);
      }
    }
  };

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  // Load the audio buffer once
  useEffect(() => {
    const initAudioContext = async () => {
      const context = new AudioContext();
      setAudioContext(context);

      const response = await fetch("/bgm.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);
      audioBufferRef.current = audioBuffer;

      // Handle visibility change inside this scope
      const handleVisibilityChange = () => {
        if (document.hidden) {
          context.suspend(); // Pause the audio when minimized or hidden
        } else {
          context.resume(); // Resume the audio when the app is back in view
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Clean up the event listener and audio context on unmount
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        context.close();
      };
    };

    initAudioContext();
  }, []); // Note: the dependency array is empty to prevent re-runs

  const playSound = () => {
    if (audioContext && audioBufferRef.current) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContext.destination);
      source.loop = true; // Enable looping if needed
      source.start(0); // Play the sound immediately
    }
  };

  return (
    <>
      <div
        className="h-[100vh]"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="text-white" onClick={playSound}>
          play
        </p>
        {Page === "Home" && (
          <Counter count={count} energy={energy} handleshake={handleShake} />
        )}
        {Page === "Tasks" && (
          <Tasks
            onTaskClear={fetchUserData}
            userId={userData?.id ?? 0}
            handleShake={handleShake}
          />
        )}
        {userData && Page === "Profiles" && (
          <Profiles onTaskClear={fetchUserData} userData={userData} />
        )}
        {Page === "Referrals" && <Referrals userId={userData?.id ?? 0} />}
        {Page === "Settings" && <Settings userId={userData?.id ?? 0} />}
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            width: "100%",
          }}
          className="fixed bottom-0 left-0 z-50 w-full h-[4.5rem] bg-transparent"
        >
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium bg-transparent">
            {Footerdata.map((item, index) => {
              const isActive = Page === item.name;
              return (
                <button
                  onClick={() => setPage(item.name)}
                  key={index}
                  className="inline-flex flex-col items-center justify-center px-5"
                >
                  <div
                    className={`${
                      isActive ? "text-[#E0FD60]" : "text-gray-400"
                    } text-2xl mb-1 group-hover:text-[#E0FD60]`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`${
                      isActive ? "text-[#E0FD60]" : "text-gray-500"
                    } text-sm group-hover:text-[#E0FD60]`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <ModalAllowComponent
          username={userData?.username ?? ""}
          daily_count={dailyCount}
          onAllowPermission={checkMotionPermission}
          isOpen={isModalOpen.modalDaily}
        />

        <ModalPermission
          username={userData?.username ?? ""}
          onAllowPermission={checkMotionPermission}
          isOpen={isModalOpen.modalPermission}
        />
      </div>
      {/* ) : (
       <div className="h-[100vh] flex justify-center items-center bg-gray-200">
         <div className="text-center">
           <h2 className="text-xl font-bold">
             This app is designed for mobile devices only.
           </h2>
           <p className="mt-2 text-gray-700">
             Please open this app on a mobile device to use its features.
           </p>
           <Link
             href={"https:t.me/shakeTongamebot"}
             className="mt-2 text-gray-700"
           >
             Click Here To Navigate
           </Link>
         </div>
       </div>
     )} */}
    </>
  );
}

