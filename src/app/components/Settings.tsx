"use client";
import shake from "../../../public/shakerboy.png"
import Image from "next/image";
import bg from "../../../public/logo1.png";
import Header from "./Navigation/Header";
import { FaChevronRight, FaCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import ModalForm from "./Modal/ModalForm";

interface UserData {
  tele_id: string;
  name: string;
  email: string;
  region: string;
  energy: number;
  coins: number;
  referral_code: string;
  exchange: string;
  daily_count:string;
  regions:string;
}

interface props {
  userId: number;
}


const Settings = ({userId}: props) => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleModalSubmit = () => {
    setIsOpen(false);
  };
  
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

  useEffect(() => {

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center py-10">
        <div className="h-[calc(100vh-4.5rem)]  w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center h-[50%]">
            <div className="flex flex-col items-center justify-center mb-5 text-white">
              <Image
                src={bg}
                width={100}
                height={100}
                alt=""
                className="w-16 h-16 rounded-full my-3"
              />
              <p
                className="text-center text-white text-3xl"
              >
                {userDetails?.name ?? "Adrian"}
              </p>
            </div>

            <div className="w-[90%] flex flex-col space-y-5 mt-3 text-xl">
              <div className="flex flex-row justify-between">
                <p className="text-white">Country</p>
                <div className="flex flex-row items-center space-x-5 text-white">
                  {userDetails?.region
                    ? userDetails.region
                    : "There's no country yet"}
                </div>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-white">Email</p>
                <div className="flex flex-row items-center space-x-5 text-white">
                  {userDetails?.email
                    ? userDetails.email
                    : "There's no email yet"}
                </div>
              </div>

              <div className="flex flex-row justify-between">
                <p className="text-white">Exchange</p>
                <div className="flex flex-row items-center space-x-5 text-white">
                  There&apos;s no exchanges yet
                </div>
              </div>
            </div>

            {(!userDetails?.email || !userDetails?.regions) && (
              <div
                onClick={() => setIsOpen(true)}
                className="w-[80%] my-8 h-12 bg-[#D84A4D] rounded-3xl flex items-center justify-center"
              >
                <h1 className="text-white text-lg">Click to Fill In your Email and Region!</h1>
              </div>
            )}
          </div>

          <div className="flex h-full w-full items-center justify-center">
            <h1 className="text-white text-3xl">
              Daily Login : {userDetails?.daily_count ?? 0}
            </h1>
          </div>
        </div>
      </div>
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleModalSubmit}
        close={handleModalSubmit}
      />
    </>
  );
};

export default Settings;
