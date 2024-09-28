"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import Header from "./Navigation/Header";

interface CounterProps {
  count: number;
  energy: { current: number; max: number };
  handleshake: () => void;
}

type Status = "normal" | "tired" | "shake";

const Counter = ({ count, energy, handleshake }: CounterProps) => {
  const [gifUrl, setGifUrl] = useState<string>("");
  const [state, setState] = useState<Status>("normal");
  const [lastCount, setLastCount] = useState<number>(count);
  const [counter, setcounter] = useState(1);

  // Define the paths for your GIFs
  const gifUrls = useMemo(
    () => ({
      normal: "/normal.gif",
      tired: "/tired.gif",
      shake: "/shake.gif",
    }),
    []
  );

  // Preload GIFs
  useEffect(() => {
    Object.values(gifUrls).forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {};
    });
  }, [gifUrls]);

  // Play audio when the count increases
  const playCoinSound = () => {
    const audio = new Audio("/coin.m4a");
    audio.play();
  };

  useEffect(() => {
    if (count > lastCount) {
      setState("shake");
      playCoinSound(); // Play audio multiple times (spammed)

      const timer = setTimeout(() => {
        setState("normal");
      }, 1000);

      return () => clearTimeout(timer);
    }

    setLastCount(count);
  }, [count, lastCount]);

  // Handle energy level and state changes
  useEffect(() => {
    if (energy.current < 300) {
      setState("tired");
    } else if (state !== "tired" && energy.current >= 300) {
      setState("normal");
    }
  }, [energy, state]);

  // Update the GIF URL based on the current state
  useEffect(() => {
    setGifUrl(gifUrls[state]);
  }, [state, gifUrls]);

  return (
    <div className="w-full h-full">
      <Header coins={count} />
      <div className="h-[calc(100vh-9rem)] mt-5">
        <div className="flex flex-col items-center py-5">
          <div className="w-[80%]">
            <img src={gifUrl} alt={state} className="w-full h-auto" />
            <p className="text-white flex justify-center items-center">
              {count} : {lastCount}
            </p>
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
            className="w-[70%] my-4 h-16 bg-[#D5FF18] cursor-pointer select-none
      active:translate-y-1 active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
      active:border-b-[0px] transition-all duration-150 [box-shadow:0_1.5px_0_0_#ABC340,0_4px_0_0_#ffffff]
      rounded-full border-[1px] border-[#D5FF18]"
          >
            <span 
            // onClick={handleshake}
            className="flex justify-center items-center h-full text-black font-bold text-2xl">
              Shake To Earn Coins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
