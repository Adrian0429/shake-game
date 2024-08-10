"use client";
import Head from "next/head";
import Counter from "./components/Counter";
import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiChevronDown } from "react-icons/fi";

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
    <div>
      <main>
        <Link href="?modal=true">
          <button>Open Modal</button>
        </Link>

        {userData ? (
          <>
            <h1 className="text-2xl font-bold mb-4">User Data</h1>
            <ul>
              <li>ID: {userData.id}</li>
              <li>First Name: {userData.first_name}</li>
              <li>Last Name: {userData.last_name || "N/A"}</li>
              <li>Username: {userData.username || "N/A"}</li>
              <li>Language Code: {userData.language_code}</li>
              <li>Is Premium: {userData.is_premium ? "Yes" : "No"}</li>
            </ul>
          </>
        ) : (
          <div>Loading...</div>
        )}
        <Counter />

        <div className="hs-dropdown relative inline-flex justify-center items-center">
          <button
            id="hs-dropdown-default"
            type="button"
            className="hs-dropdown-toggle py-2 px-2 inline-flex items-center gap-x-2 min-w-[70%] text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            <p className="w-full text-center text-B3">
              {selectedSize || "Select Region"}
            </p>
            <FiChevronDown />
          </button>

          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg p-1 mt-2 after:h-4 after:absolute z-50 after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:start-0 before:w-full"
            aria-labelledby="hs-dropdown-default"
          >
            {countries.map((country, index) => (
              <a
                key={index}
                className="flex items-center my-1 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                href="#"
                onClick={() => setSelectedSize(country)}
              >
                {country}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
