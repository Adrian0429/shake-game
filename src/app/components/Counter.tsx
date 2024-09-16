"use client";
import Header from "./Navigation/Header";
import shake from "../../../public/shakerboy.png";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiCloudLightning } from "react-icons/fi";
import { BsFillLightningChargeFill } from "react-icons/bs";

interface CounterProps {
  count: number;
  energy: { current: number; max: number };
}

type Status = "normal" | "tired" | "shake";

const Counter = ({ count, energy }: CounterProps) => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [state, setState] = useState<Status>("normal");
  const [lastCount, setLastCount] = useState<number>(count);

  const videoUrls = {
    normal: "/normal.mp4",
    tired: "/cape.mp4",
    shake: "/shake.mp4",
  };

  // Watch for count changes and set the state to "shake" if the count increases
  useEffect(() => {
    if (count > lastCount) {
      setState("shake");

      // Reset state to "normal" after 200ms if count doesn't increase
      const timer = setTimeout(() => {
        setState("normal");
      }, 200);

      return () => clearTimeout(timer); // Cleanup the timer
    }

    setLastCount(count);
  }, [count, lastCount]);

  // Watch for energy changes and set the state to "tired" if energy drops below 200
  useEffect(() => {
    if (energy.current < 200) {
      setState("tired");
    } else if (state === "tired" && energy.current >= 200) {
      setState("normal"); // Reset to "normal" if energy is restored
    }
  }, [energy, state]);

  // Update the video URL based on the current state
  useEffect(() => {
    setVideoUrl(videoUrls[state]);
  }, [state]);

  return (
    <div className="w-full h-full">
      <Header coins={count} />
      <div className="h-[calc(100vh-9rem)] mt-5">
        <div className="flex flex-col items-center py-5">
          <h1 className="text-white text-2xl">{state}</h1>
          <div className="w-[70%]">
            <Image
              className=""
              src={shake}
              alt=""
              objectFit="fit"
              height={300}
              width={300}
            />
          </div>

          <div className="flex flex-row space-x-3 bg-[#232328] rounded-full py-3 px-5 items-center">
            <BsFillLightningChargeFill className="text-[#E0FD60]" />
            <p className="text-S3 font-bold text-center text-white">
              {energy.current}/{energy.max}
            </p>
          </div>

          <div id="frenzybar" className="w-[80%] bg-gray-200 rounded-full mt-5">
            <div
              className="bg-[#E0FD60] text-xs font-medium text-brand-100 text-center p-2 leading-none rounded-full"
              style={{ width: `${(energy.current / 2000) * 100}%` }}
            ></div>
          </div>

          <div
            className="w-[80%] mt-10 h-24 bg-[#D5FF18] cursor-pointer select-none
      active:translate-y-2 active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
      active:border-b-[0px] transition-all duration-150 [box-shadow:0_2px_0_0_#ABC340,0_4px_0_0_#ffffff]
      rounded-full border-[1px] border-[#D5FF18] mb-3"
          >
            <span className="flex justify-center items-center h-full text-black font-bold text-2xl">
              Shake To Earn Coins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
