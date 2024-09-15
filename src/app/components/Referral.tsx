"use client";
import shake from "../../../public/shakerboy.png"
import Image from "next/image";
import bg from "../../../public/logo1.png";
import Header from "./Navigation/Header";
import { FaCopy } from "react-icons/fa";
import { initUtils } from "@telegram-apps/sdk";

interface props {
  userId: number;// Add this prop
}


const Referrals = ({userId} : props) => {

  const referralCode = `t.me/shakeTongamebot/start?startapp=${userId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
  };

  const handleInviteFriend = () => {
    const utils = initUtils();
    const inviteLink = `t.me/shakeTongamebot/start?startapp=${userId}`;
    const shareText = `Join me to play this Amazing Game!`;
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
      inviteLink
    )}&text=${encodeURIComponent(shareText)}`;
    utils.openTelegramLink(fullUrl);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <Header text="Shake Project" />

      <Image
        className="w-[40%] h-auto"
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

      <div className="my-3 rounded-lg bg-[#232328] flex flex-col w-[90%] space-y-5 py-6 justify-center items-center text-white">
        <h2>2.0000 Shake Points</h2>
        <div
          className="w-24 h-8 bg-[#FFD518]  cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#C38A40,0_0px_0_0_#ffffff]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_5px_0_0_#C38A40,0_8px_0_0_#ffffff]
    rounded-full  border-[1px] border-[#FFD518] mb-3"
        >
          <span className="flex justify-center items-center h-full text-black font-bold text-base">
            Claim
          </span>
        </div>
      </div>

      <div className="w-[90%] text-center text-B3 mb-2 text-white">
        <h2>Score 10% from buddies + 5% from their referrals</h2>
        <p>Get a rewards play pass for each fren.</p>
      </div>

      <div className="w-[90%] text-white">
        <h1>List of your friends</h1>
        <div className="w-full">
          <div className="flex flex-row justify-between h-16 bg-[#232328] rounded-lg px-5 py-1 items-center">
            <div className="flex flex-row w-full space-x-3">
              <Image
                src={bg}
                alt=""
                height={30}
                width={30}
                className="w-[50px] h-full"
              />
              <div className="flex flex-col">
                <p>Complete Profile</p>
                <p>+ 1000 Coins</p>
              </div>
            </div>
            <div>
              <div
                className="w-24 h-8 bg-[#D5FF18]  cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_5px_0_0_#ABC340,0_8px_0_0_#ffffff]
    rounded-full  border-[1px] border-[#D5FF18] mb-3"
              >
                <span className="flex justify-center items-center h-full text-black font-bold text-base">
                  Claim
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] flex flex-row justify-between">
        <div
          className="button mb-5 w-64 h-16 bg-[#D5FF18]  cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_6px_0_0_#ABC340,0_10px_0_0_#ffffff]
            rounded-full  border-[1px] border-white"
        >
          <span onClick={handleInviteFriend} className="flex flex-col justify-center items-center h-full text-black font-bold text-xl ">
            Share With Friends
          </span>
        </div>

        <div
          className="button w-16 h-16 bg-[#D5FF18]  rounded-full cursor-pointer select-none
            active:translate-y-2  active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
            active:border-b-[0px]
            transition-all duration-150 [box-shadow:0_6px_0_0_#ABC340,0_10px_0_0_#ffffff]
            border-[1px] border-white"
        >
          <span onClick={handleCopy} className="flex flex-col justify-center items-center h-full text-black font-bold text-lg ">
            <FaCopy />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
