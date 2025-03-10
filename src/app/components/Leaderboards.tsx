import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

type LeaderboardData = {
  position: number;
  user_name: string;
  coins: number;
};

type LeaderboardsResponse = {
  status: boolean;
  message: string;
  data: {
    total_coins: number;
    data_user: {
      position: number;
      user_name: string;
      coins: number;
    };
    data: LeaderboardData[];
  };
};

export const Leaderboards = () => {
  const [leaderboards, setLeaderboards] = useState<LeaderboardsResponse | null>(
    null
  );
  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const cookies = parseCookies(); 
        const response = await axios.get<LeaderboardsResponse>(
          "https://api2.fingo.co.id/api/user/leaderboards", 
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setLeaderboards(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLeaderboards();
  }, []);

  return (
    <>
      <div className="h-[calc(100vh-4.5rem)] w-full py-8 px-5 bg-white">
        <div className="relative w-full h-[25%]">
          <div className="absolute top-0 left-0 w-full h-24 bg-[#CAEB45] z-10 rounded-2xl px-5 py-4 space-y-3">
            <h2 className="text-xl font-semibold">Peringkat Anda</h2>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-5">
                <p>{leaderboards?.data.data_user.position}</p>
                <p>{leaderboards?.data.data_user.user_name}</p>
              </div>
              <p>{leaderboards?.data.data_user.coins} GULD</p>
            </div>
          </div>

          <div className="absolute top-14 left-0 h-24 w-full bg-black z-0 rounded-2xl flex px-5 py-4 justify-center items-end">
            <p className="font-light text-lg text-white w-full text-start">
              <span className="font-semibold text-xl text-white">
                {leaderboards?.data.total_coins}
              </span>{"  "}
              Total Guld Score
            </p>
          </div>
        </div>

        <div className="h-[75%] mt-3 overflow-y-scroll space-y-3 py-2">
          {leaderboards?.data.data.map((item) => (
            <div
              key={item.position}
              className={`flex flex-row justify-between items-center px-5 py-5 rounded-lg ${
                item.position <= 3 ? "bg-[#F3F3F3]" : ""
              }`}
            >
              <div className="flex flex-row space-x-5 text-lg font-normal">
                <p>{item.position}</p>
                <p>{item.user_name}</p>
              </div>
              <p className="font-light">{item.coins} GULD SCORE</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
