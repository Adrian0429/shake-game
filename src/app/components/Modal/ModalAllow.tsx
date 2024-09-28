"use client";
import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";

interface ModalAllowProps {
  username: string;
  daily_count: number;
  onAllowPermission: () => void;
  isOpen: boolean;
}

function ModalAllowComponent({ onAllowPermission, username, daily_count, isOpen }: ModalAllowProps) {
  if (!isOpen) return null;
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const playAudio = async () => {
    audioContextRef.current = new window.AudioContext();
    const response = await fetch("/bgm.mp3");
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current?.decodeAudioData(
      arrayBuffer
    );

    // Create a buffer source
    audioSourceRef.current =
      audioContextRef.current?.createBufferSource() ?? null;
    if (audioSourceRef.current && audioBuffer) {
      audioSourceRef.current.buffer = audioBuffer;
      if (audioContextRef.current) {
        audioSourceRef.current.connect(audioContextRef.current.destination);
      }
      audioSourceRef.current.loop = true;

      // Start the audio
      audioSourceRef.current.start(0);
    }
  };

  useEffect(() => {
    // Pause audio when the tab is minimized or hidden
    const handleVisibilityChange = () => {
      if (document.hidden && audioContextRef.current?.state === "running") {
        audioContextRef.current?.suspend(); // Pauses the audio
      } else if (
        !document.hidden &&
        audioContextRef.current?.state === "suspended"
      ) {
        audioContextRef.current?.resume(); // Resumes the audio
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (audioSourceRef.current) {
        audioSourceRef.current.stop(); // Stop audio when component unmounts
      }
    };
  }, []);

  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center">
      <div className="relative flex flex-col items-center mx-auto py-4 px-6 bg-[#232328] h-[240px] w-[300px] rounded-lg z-100">
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome {username}
        </h1>
        <h1 className="text-lg font-bold mt-4 text-center text-white">
          Total Daily Login:
        </h1>
        <h1 className="text-4xl font-bold text-center text-white">
          {daily_count}
        </h1>
        <button
          className="w-[80%] mt-2 h-12 bg-[#D5FF18] cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
            active:border-b-[0px] transition-all duration-150 [box-shadow:0_2px_0_0_#ABC340,0_4px_0_0_#ffffff]
            rounded-full border-[1px] border-[#D5FF18] mb-3"
          onClick={()=>{
            playAudio();
            onAllowPermission();
          }}
        >
          <span className="flex justify-center items-center h-full text-black font-bold text-2xl">
            Continue
          </span>
        </button>
      </div>
    </dialog>
  );
}

export default ModalAllowComponent;