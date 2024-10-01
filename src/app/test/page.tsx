"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full py-5">
      <div className="flex h-[calc(100vh-4.5rem)] items-center justify-center">
        <h1 className="animate-bounce">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
