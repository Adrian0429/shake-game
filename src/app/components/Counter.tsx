"use client";
import Header from './Navigation/Header';
import bg from '../../../public/BG.jpg'
import { useEffect, useState } from 'react';

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
      <div
        className="w-full h-full"
      >
        <Header coins={count}/>
        <div className={`h-[calc(100vh-9rem)] mt-5 flex items-center`}>
          <div className="w-full">
            <div className="flex flex-col text-center items-center gap-y-3 bg-brand-500/70 w-fit mx-auto p-3 rounded-lg">
              <h1 className="w-full font-bold text-H1">
                Shake to Increase Count
              </h1>
              <p className="text-S1">Shake your phone to increase the count:</p>
              <h2 className="mt-2 text-D2">{count}</h2>
            </div>
            <div className="w-[90%] mx-auto">
              <div
                id="frenzybar"
                className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-5"
              >
                <div
                  className="bg-brand-600 text-xs font-medium text-brand-100 text-center p-1 leading-none rounded-full"
                  style={{ width: `${(frenzy.count / frenzyBar) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="h-auto w-full mt-3 mx-auto">
              <video
                key={videoUrl}
                src={videoUrl}
                autoPlay
                controls
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Counter;
