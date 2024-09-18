"use client";

import { useState } from "react";
import Offcanvas from "../components/Offcanvas";

const AudioComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const audio = new Audio("/audio.mp3");
    audio.loop = true;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Audio playback error:", error);
      });
  };

  return (
    <>
      <div className="h-screen">
        <button
          type="button"
          className="m-1 ms-0 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-offcanvas-bottom"
          data-hs-overlay="#hs-offcanvas-bottom"
        >
          Toggle bottom offcanvas
        </button>
      </div>
      <Offcanvas userId={134123}/>
    </>
  );
};

export default AudioComponent;
