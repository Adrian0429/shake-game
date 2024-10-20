"use client";
import { useState } from "react";
import Navbar from "./components/navbar";
import { Profile } from "./components/Profile";
import { Leaderboards } from "./components/Leaderboards";
import { Home } from "./components/Home";
import { Earn } from "./components/Earn";

export default function Page() {
  const [Page, setPage] = useState("Earn");

  return (
    <div className="h-[calc(100vh-4.5rem)]">
      <div>
        {Page === "Home" && <Home />}
        {Page === "Earn" && <Earn/>}
        {Page === "Leaderboards" && (
          <Leaderboards/>
        )}
        {Page === "Profile" && (
          <Profile/>
        )}
      </div>

      <Navbar Page={Page} setPage={setPage} />
    </div>
  );
}
