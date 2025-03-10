"use client";
import { useState } from "react";
import Navbar from "./components/navbar";
import { Profile } from "./components/Profile";
import { Leaderboards } from "./components/Leaderboards";
import { Home } from "./components/Home";
import { Earn } from "./components/Earn";



export default function Page() {
  const [Page, setPage] = useState("Beranda");

  return (
    <div className="h-[calc(100vh-4.5rem)]">
      <div>
        {Page === "Beranda" && <Home/>}
        {Page === "Earn" && <Earn />}
        {Page === "Leaderboards" && <Leaderboards />}
        {Page === "Profil" && <Profile />}
      </div>

      <Navbar Page={Page} setPage={setPage} />
    </div>
  );
}
