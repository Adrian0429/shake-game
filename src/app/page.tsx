"use client";
import FooterNav from "./components/Navigation/Footer";
import Counter from "./components/Counter";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

const countries = [
  "Indonesia",
  "Singapore",
  "Malaysia",
  "Thailand",
  "Vietnam",
  "Philippines",
];

export default function Home() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
      const [selectedSize, setSelectedSize] = useState<string | null>(null);

    useEffect(() => {
      if (WebApp.initDataUnsafe.user) {
        setUserData(WebApp.initDataUnsafe.user as UserData);
      }
    }, []);
    
  return (
    <div className="relative h-screen border border-red-500">
        <Counter />
        <FooterNav/>
    </div>
  );
}
