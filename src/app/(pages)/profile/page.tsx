"use client";
import WebApp from '@twa-dev/sdk';
import React, { useEffect, useState } from 'react'

interface UserData {
  id: number;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}
export default function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      if (WebApp.initDataUnsafe.user) {
        setUserData(WebApp.initDataUnsafe.user as UserData);
      }
    }, []);

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full border p-4">
      <h1 className="text-H2 w-full text-center">Profile User</h1>
      <ul className="text-S2 mt-5">
        <li>User ID: {userData?.id}</li>
        <li>Username: {userData?.username || "N/A"}</li>
        <li>Language Code: {userData?.language_code}</li>
      </ul>

      <h2 className="text-H3 mt-10">Referral Code</h2>
      <div className="w-full mt-2 bg-slate-900/80 flex px-4 justify-between items-center rounded-md border-2 border-dashed border-slate-700 h-16">
        <p>PPHOOHK</p>
        <button className="bg-slate-950 px-5 py-3 rounded-md">Copy</button>
      </div>

      <h2 className="text-H3 mt-10">Redeem Referral Code</h2>
      <div className="flex mt-2 flex-row h-16 bg-white rounded-lg items-center">
        <input type="text" className="w-full h-full rounded-l-lg text-black px-4" />
        <button className="bg-primary text-black rounded-r-lg px-5 h-full">Redeem</button>
      </div>
    </div>
  );
}