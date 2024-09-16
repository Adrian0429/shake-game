"use client";
import React, { useState } from "react";

const VideoPlayerWithLoading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true); // State to track if the video is loading

  // Handle video loading
  const handleCanPlay = () => {
    setIsLoading(false); // Hide loading screen when video is ready
  };

  return (
    <div className="video-container">
      {/* Loading screen */}
      {isLoading && (
        <div className="loading-screen">
          <p>Loading...</p>
          {/* You can replace the text with a spinner or a custom loading animation */}
        </div>
      )}

      {/* Video player */}
      <video
        src="./cape.mp4"
        controls
        autoPlay
        onCanPlay={handleCanPlay} // Event fires when the video is ready to play
        onWaiting={() => setIsLoading(true)} // Event fires if the video buffering is needed
        style={{
          display: isLoading ? "none" : "block", // Hide video while loading
        }}
        className="video-player"
      />
    </div>
  );
};

export default VideoPlayerWithLoading;
