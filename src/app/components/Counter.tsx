"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import Header from "./Navigation/Header";
import { BsFillLightningChargeFill } from "react-icons/bs";

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
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

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

  useEffect(() => {
    const initAudioContext = async () => {
      const context = new AudioContext();
      setAudioContext(context);

      const response = await fetch("/coin.m4a");
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);
      audioBufferRef.current = audioBuffer;
    };

    initAudioContext();

    return () => {
      audioContext?.close(); // Clean up the audio context on unmount
    };
  }, []);

  const playSound = () => {
    if (audioContext && audioBufferRef.current) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContext.destination);
      source.start(0); // Play the sound immediately
    }
  };

  useEffect(() => {
    if (count > lastCount) {
      setState("shake");
      playSound();
      const timer = setTimeout(() => {
        if (energy.current < 50) {
          setState("tired");
        } else {
          setState("normal");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }

    setLastCount(count);
  }, [count, lastCount]);

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
              {state}
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
              style={{ width: `${(energy.current / 500) * 100}%` }}
            ></div>
          </div>

          <div
            className="w-[70%] my-4 h-16 bg-[#D5FF18] cursor-pointer select-none
      active:translate-y-1 active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
      active:border-b-[0px] transition-all duration-150 [box-shadow:0_1.5px_0_0_#ABC340,0_4px_0_0_#ffffff]
      rounded-full border-[1px] border-[#D5FF18]"
          >
            <span
              onClick={handleshake}
              className="flex justify-center items-center h-full text-black font-bold text-2xl"
            >
              Shake To Earn Coins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
