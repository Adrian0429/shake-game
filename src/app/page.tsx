"use client";
import FooterNav from "./components/Navigation/Footer";
import Counter from "./components/Counter";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import Header from "./components/Navigation/Header";



export default function Home() {

    
  return (
    <div className="relative border border-red-600 items-center">
        <Counter />
    </div>
  );
}
