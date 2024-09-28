import React, { useEffect, useRef } from "react";

const AudioComponent: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if we are in the browser environment
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/bgm.mp3"); // Create Audio instance in the browser

      const playAudio = () => {
        const audio = audioRef.current;
        if (audio) {
          audio.loop = true;
          audio.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          audioRef.current?.pause();
        } else {
          audioRef.current?.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      };

      // Start playing audio
      playAudio();

      // Listen for visibility change
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Clean up the event listener and pause audio on unmount
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        audioRef.current?.pause(); // Pause audio on component unmount
        audioRef.current = null; // Clean up the audio reference
      };
    }
  }, []);

  return null; // No need to render anything in this component
};

export default AudioComponent;
