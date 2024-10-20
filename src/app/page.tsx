"use client";
import { useState } from "react";
import Navbar from "./components/navbar";
import { Earn } from "./components/Earn";
import { Profile } from "./components/Profile";

export default function Home() {
  const [Page, setPage] = useState("Home");

  return (
    <div className="h-[calc(100vh-4.5rem)]">
      <div>
        {Page === "Home" && <Earn />}
        {Page === "Earn" && <div className="w-full h-full">Earn Content</div>}
        {Page === "Leaderboards" && (
          <div className="w-full h-full">Leaderboards Content</div>
        )}
        {Page === "Profile" && (
          <Profile/>
        )}
      </div>

      <Navbar Page={Page} setPage={setPage} />
    </div>
  );
}
