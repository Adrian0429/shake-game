"use client";
import shake from "../../../public/shakerboy.png";
import Image from "next/image";
import bg from "../../../public/Bg.png";
import BG from "../../../public/logo1.png";
import Header from "./Navigation/Header";
import { FaCopy } from "react-icons/fa";
import { initUtils } from "@telegram-apps/sdk";
import { parseCookies } from "nookies";
import axios from "axios";
import { useEffect, useState } from "react";
import Offcanvas from "./Offcanvas";

interface props {
  userId: number;
}

interface GetReferralsData {
  user_name: string;
  referred_user: string;
  coins: number;
}

interface GetReferralsResponse {
  total_coins: number;
  data: GetReferralsData[];
}

const Referrals = ({ userId }: props) => {
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
  const [referralsResponse, setReferralsResponse] =
    useState<GetReferralsResponse>({
      total_coins: 0,
      data: [],
    });

  const toggleOffcanvas = () => {
    setIsOffcanvasVisible(!isOffcanvasVisible);
  };

  const referralCode = `t.me/shakeTongamebot/start?startapp=${userId}`;

  const handleCopy = () => {
    alert("Share Link Copied!");
    navigator.clipboard.writeText(referralCode);
  };

  const claimCoins = async () => {
    // console.log("Claiming coins...");
    try {
      const cookies = parseCookies();
      const response = await axios.get(
        "https://api2.fingo.co.id/api/user/claimReferral",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error fetching user referral coins:", error);
    }
  };
  
  useEffect(() => {
    const fetchReferralPageData = async () => {
      try {
        const cookies = parseCookies();
        const response = await axios.get(
          "https://api2.fingo.co.id/api/user/getreferraldata",
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setReferralsResponse(response.data.data);
        console.log(referralsResponse);
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchReferralPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="h-[100vh] w-full py-5"
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="h-[calc(100vh-4.5rem)] pb-16 w-full flex flex-col items-center overflow-y-scroll">
          <Image
            className="h-[20%] w-auto my-2"
            src={shake}
            alt=""
            objectFit="fit"
            height={300}
            width={300}
          />

          <div className="text-center mt-2 text-white">
            <h2 className="text-H2">Invite Friends, Get Rewards!</h2>
            <p className="text-B3">Invite More, get even more bonuses!</p>
          </div>

          <div className="my-4 rounded-lg bg-[#232328] flex flex-col w-[90%] space-y-5 py-6 justify-center items-center text-white">
            <h2>{referralsResponse.total_coins ?? 0} Shake Points</h2>
            <div
              className="w-24 h-8 bg-[#FFD518]  cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#C38A40,0_0px_0_0_#ffffff]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_5px_0_0_#C38A40,0_8px_0_0_#ffffff]
    rounded-full  border-[1px] border-[#FFD518] mb-3"
            >
              <span onClick={claimCoins} className="flex justify-center items-center h-full text-black font-bold text-base">
                Claim
              </span>
            </div>
          </div>

          <div className="w-[90%] text-center text-B3 mb-2 text-white">
            <h2>Score 10% from buddies + 5% from their referrals</h2>
          </div>

          <div className="w-[90%] text-white mt-2">
            <h1>List of your friends</h1>
            <div className="w-full h-[10rem] overflow-y-scroll">
              {/* Conditional rendering for referral data */}
              {referralsResponse.data && referralsResponse.data.length > 0 ? (
                referralsResponse.data.map((item, index) => (
                  <div
                    key={index}
                    className="flex my-3 flex-row justify-between h-16 bg-[#232328] rounded-lg px-5 py-1 items-center"
                  >
                    <div className="flex flex-row w-full space-x-3 items-center">
                      <Image
                        src={BG}
                        alt=""
                        height={30}
                        width={30}
                        className="w-[50px] h-full"
                      />
                      <p>{item.user_name}</p>
                      <p>{item.referred_user}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-white mt-3 text-xl">
                  You have no referrals yet
                </p>
              )}
            </div>

            <div className="flex flex-row mt-3 justify-between px-3">
              <div
                className="button mb-5 w-64 h-14 bg-[#D5FF18]  cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_6px_0_0_#ABC340,0_10px_0_0_#ffffff]
            rounded-full  border-[1px] border-white"
              >
                <span
                  onClick={toggleOffcanvas}
                  className="flex flex-col justify-center text-center items-center h-full text-black font-bold text-xl "
                >
                  Share With Friends
                </span>
              </div>

              <div
                className="button w-14 h-14 bg-[#D5FF18]  rounded-full cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_6px_0_0_#ABC340,0_10px_0_0_#ffffff]
            border-[1px] border-white"
              >
                <span
                  onClick={handleCopy}
                  className="flex flex-col justify-center items-center h-full text-black font-bold text-lg "
                >
                  <FaCopy />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas
        userId={userId}
        isVisible={isOffcanvasVisible}
        onClose={toggleOffcanvas}
      />
    </>
  );
};

export default Referrals;
