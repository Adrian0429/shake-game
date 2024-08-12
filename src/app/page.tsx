"use client";
import FooterNav from "./components/Navigation/Footer";
import Counter from "./components/Counter";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import Header from "./components/Navigation/Header";



export default function Home() {

    
  return (
    <div className="relative h-[calc(100vh-4rem)]">
        <Counter />
    </div>
  );
}
