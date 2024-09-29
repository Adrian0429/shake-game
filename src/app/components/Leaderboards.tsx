"use client";
import shake from "../../../public/shakerboy.png";
import Image from "next/image";
import bg from "../../../public/logo1.png";
import Header from "./Navigation/Header";
import { FaChevronRight, FaCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";

type LeaderboardsData = {
    user_name: string;
    coins: number;
}

type Leaderboards = {
    data : LeaderboardsData[];
}


const Leaderboards = () => {
  const [leaderboards, setLeaderboards] = useState<Leaderboards | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const cookies = parseCookies();
      try {
        const response = await axios.get(
          "https://api2.fingo.co.id/api/user/leaderboards",
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        console.log("Success Get User Data", response.data);
        setLeaderboards(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center py-10">
      <div className="h-[calc(100vh-4.5rem)]  w-full flex flex-col items-center">
        <div className="text-white h-[15%] text-center">
          <h1 className="text-white text-3xl">Leaderboards</h1>
          <p className="text-white">
            Our Current Top Gainer of Shake Project !
          </p>
        </div>

        <div className="w-[90%] h-[80%] overflow-y-scroll flex flex-col space-y-5">
          {leaderboards?.data.map((leaderboard, index) => (
            <div
              key={index}
              className="flex flex-row justify-between h-16 bg-[#232328] rounded-lg px-5 py-1 items-center"
            >
              <div className="flex flex-row w-full justify-between items-center">
                <h1 className="text-white text-xl">{leaderboard.user_name}</h1>
                <p className="text-white text-lg">
                  <span className="text-yellow-400">{leaderboard.coins}{" "}</span>
                 Coins
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
