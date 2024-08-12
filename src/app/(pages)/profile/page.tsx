"use client";
import WebApp from '@twa-dev/sdk';
import React, { useEffect, useState } from 'react'

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
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
    <div>
      <ul>
        <li>ID: {userData?.id}</li>
        <li>First Name: {userData?.first_name}</li>
        <li>Last Name: {userData?.last_name || "N/A"}</li>
        <li>Username: {userData?.username || "N/A"}</li>
        <li>Language Code: {userData?.language_code}</li>
        <li>Is Premium: {userData?.is_premium ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
}