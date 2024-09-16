"use client";
import shake from "../../../public/shakerboy.png"
import Image from "next/image";
import bg from "../../../public/logo1.png";
import Header from "./Navigation/Header";
import { FaChevronRight, FaCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";

interface UserData {
  tele_id: string;
  name: string;
  email: string;
  region: string;
  energy: number;
  coins: number;
  referral_code: string;
}

interface props {
  userId: number;
}


const Settings = ({userId}: props) => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const cookies = parseCookies();
      try {
        const response = await axios.get(
          "https://api2.fingo.co.id/api/user/me",
          {
            params: { tele_id: String(userId) },
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        console.log("Success Get User Data", response.data);
        setUserDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className="w-full h-full flex flex-col items-center py-10">
      <div className="h-[calc(100vh-4.5rem)]  w-full flex flex-col items-center">
        <div className="mb-5 text-white">
          <Image
            src={bg}
            width={100}
            height={100}
            alt=""
            className="w-16 h-16 rounded-full my-3"
          />
          <p className="text-center text-white">{userDetails?.name}</p>
          {/* <p className="text-center">@realsteve</p> */}
        </div>

        <div className="w-[90%] flex flex-col space-y-3 mt-3">
          <div className="flex flex-row justify-between">
            <p className="text-white">Country</p>
            <div className="flex flex-row items-center space-x-5 text-white">
              There&apos;s no country yet
              <FaChevronRight />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-white">Email</p>
            <div className="flex flex-row items-center space-x-5 text-white">
              No Email Yet
              <FaChevronRight />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-white">Exchange</p>
            <div className="flex flex-row items-center space-x-5 text-white">
              There&apos;s no exchanges yet
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
