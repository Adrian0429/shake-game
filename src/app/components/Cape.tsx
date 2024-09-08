import React from "react";

const CapeVids = () => {
  return (
    <div className="h-auto w-full mt-3 mx-auto">
      <video
        preload="auto"
        autoPlay // Automatically play the video
        loop // Loop the video indefinitely
        playsInline // Ensures the video plays inline on mobile devices (prevents full-screen mode)
        style={{
          width: "100%", // Adjust the width to fit the container
          height: "auto", // Maintain aspect ratio
          display: "block", // Remove any unwanted spacing
          
        }}
      >
        <source src="/cape.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CapeVids;