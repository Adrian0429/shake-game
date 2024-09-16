"use client";

import { useState } from "react";

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
    <div>
      <button onClick={playAudio} disabled={isPlaying}>
        {isPlaying ? "Playing..." : "Play Audio"}
      </button>
    </div>
  );
};

export default AudioComponent;
