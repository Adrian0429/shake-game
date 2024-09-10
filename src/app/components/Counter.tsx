"use client";
import Header from './Navigation/Header';
import shake from '../../../public/shakerboy.png'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiCloudLightning } from 'react-icons/fi';
import { BsFillLightningChargeFill } from 'react-icons/bs';

interface CounterProps {
    count: number;
    energy: { current: number; max: number };
    frenzy: { isActive: boolean; count: number };
    frenzyBar: number;
    increment: number;
    // VideoComponent: React.FC;
}


const Counter = ({
    count,
    energy,
    frenzy,
    frenzyBar,
}: CounterProps) => {
  const [videoUrl, setVideoUrl] = useState("");

  // Define your video URLs for each status
  const videoUrls = {
    normal: "/normal.mp4",
    tired: "/cape.mp4",
    shake: "/shake.mp4",
  };

    const preloadVideos = () => {
      // Create hidden video elements to preload videos
      Object.values(videoUrls).forEach((url) => {
        const video = document.createElement("video");
        video.src = url;
        video.preload = "auto";
        video.load();
      });
    };

    
    return (
      <div className="w-full h-full">
        <Header coins={count + 1} />
        <div className="h-[calc(100vh-9rem)] mt-5">
          <div className="flex flex-col items-center py-5">
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
              <p className="text-S3 font-bold text-center dark:text-gray-200">
                {2000}/{energy.max}
              </p>
            </div>

            <div
              id="frenzybar"
              className="w-[80%] bg-gray-200 rounded-full dark:bg-gray-700 mt-5"
            >
              <div
                className="bg-[#E0FD60] text-xs font-medium text-brand-100 text-center p-2 leading-none rounded-full"
                style={{ width: `${(energy.current / 2000) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Counter;
