import { useEffect, useRef } from "react";

const BackgroundAudio = () => {
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);

  useEffect(() => {
    // Initialize the AudioContext
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Fetch and decode audio
    const playAudio = async () => {
      const response = await fetch(
        "/bgm.mp3"
      );
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(
        arrayBuffer
      );

      // Create a buffer source
      audioSourceRef.current = audioContextRef.current.createBufferSource();
      audioSourceRef.current.buffer = audioBuffer;
      audioSourceRef.current.connect(audioContextRef.current.destination);
      audioSourceRef.current.loop = false; // Set to true if you want the audio to loop

      // Start the audio
      audioSourceRef.current.start(0);
    };

    playAudio();

    // Pause audio when the tab is minimized or hidden
    const handleVisibilityChange = () => {
      if (document.hidden && audioContextRef.current.state === "running") {
        audioContextRef.current.suspend(); // Pauses the audio
      } else if (
        !document.hidden &&
        audioContextRef.current.state === "suspended"
      ) {
        audioContextRef.current.resume(); // Resumes the audio
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

  return null; // Since we don't need to render anything
};

export default BackgroundAudio;
