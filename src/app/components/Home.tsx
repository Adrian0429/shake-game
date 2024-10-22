/* eslint-disable */
"use client";
import React, { useEffect, useState } from 'react'
import bg from '../assets/bg.png'
import Offcanvas from './Offcanvas/OffCanvas';
import { MeUser, UserData } from '../constant/user';
import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';
import WebApp from '@twa-dev/sdk';


type Task = {
  id: number;
  title: string;
  description: string;
  reward: number;
  link: string;
  code: string;
  video: string;
  category: string;
};

const defaultUserData: UserData = {
  id: 6789952150,
  username: "drianksz",
  language_code: "",
  is_premium: false,
};



// const data = [
//     {
//         name: "Home",
//         rewards: 150,
//     },
//     {
//         name: "Earn",
//         rewards: 150,
//     },
//     {
//         name: "Leaderboards",
//         rewards: 150,
//     },
//     {
//         name: "Profile",
//         rewards: 150,
//     },
//     {
//         name: "Home",
//         rewards: 150,
//     },
//     {
//         name: "Earn",
//         rewards: 150,
//     },
//     {
//         name: "Leaderboards",
//         rewards: 150,
//     },
//     {
//         name: "Profile",
//         rewards: 150,
//     }
// ];
export const Home = () => {
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [userDetails, setUserDetails] = useState<MeUser | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

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

      console.log("User Details:", response.data.data);
      setUserDetails(response.data.data);
      setCookie(null, "token", response.data.data.token, {
        maxAge: 3 * 60 * 60,
        path: "/",
      });

      if (response.data.status === true) {
        fetchTasks(); // Fetch tasks after successful login
      }
    } catch (error) {
      console.error("Error Login:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const cookies = parseCookies();
      const response = await axios.get(
        "https://api2.fingo.co.id/api/task/user",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      setTasks(response.data.data); // Set tasks state with fetched data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

 useEffect(() => {
    if (typeof window !== "undefined" && WebApp.initDataUnsafe?.user) {
   WebApp.ready();
   WebApp.expand();
    // setStartParam(WebApp.initDataUnsafe.start_param || "");
   setUserData(WebApp.initDataUnsafe.user as UserData);
   console.log(userData);
    if(userData.id) {
   RegisterLogin();
    }

    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [userData?.id, userData]);

  // useEffect(() => {
  //   if (tasks.length > 0) {
  //     console.log("Updated tasks:", tasks);
  //   }
  // }, [tasks]);

  return (
    <div
      className="h-[calc(100vh-4.5rem)] w-full py-8 px-5"
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="h-[25%] flex flex-col justify-center space-y-5">
        <h3 className="text-lg font-light">Total Coins</h3>
        <div className="flex flex-row items-center space-x-5">
          <p className="text-5xl font-bold">{userDetails?.coin}</p>
          <p className="text-xl font-thin">Tokens</p>
        </div>
      </div>

      <div className="h-[15%] w-[90%] bg-black rounded-2xl mx-auto grid grid-cols-3 py-5 mt-6 items-center text-white text-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-thin">Rewards</p>
          <p className="text-xl font-medium">{userDetails?.user_rewards}</p>
        </div>

        <div className="border-x flex flex-col items-center justify-center">
          <p className="text-sm font-thin">Earn</p>
          <p className="text-xl font-medium">{userDetails?.user_earn}</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-thin">Invites</p>
          <p className="text-xl font-medium">{userDetails?.user_ref}</p>
        </div>
      </div>

      <div className="h-[45%] mt-5 overflow-y-scroll">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex flex-row w-full items-center justify-between px-5 py-2 border-b "
          >
            <div className="flex flex-col">
              <p className="text-lg font-normal">{task.title}</p>
              <p className="text-lg font-extralight">{task.reward}</p>
            </div>
            <button
              className="px-5 py-2 bg-black text-white rounded-3xl"
              onClick={() => {
                setIsOffcanvasVisible(true);
              }}
            >
              Open
            </button>
          </div>
        ))}
      </div>

      <Offcanvas
        isVisible={isOffcanvasVisible}
        onClose={() => {
          setIsOffcanvasVisible(false);
        }}
      />
    </div>
  );
};
