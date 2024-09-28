import React, { useEffect, useRef } from 'react';

const AudioComponent = () => {
  const audioRef = useRef(new Audio('/bgm.mp3'));
  const audioContextRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new AudioContext();

    const playAudio = () => {
      const audio = audioRef.current;
      audio.loop = true;
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
    };

    // Start playing audio
    playAudio();

    // Listen for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up the event listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audioRef.current.pause(); // Pause audio on component unmount
    };
  }, []);

  return null; // No need to render anything in this component
};

export default AudioComponent;
