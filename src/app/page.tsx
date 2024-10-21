"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { Profile } from "./components/Profile";
import { Leaderboards } from "./components/Leaderboards";
import { Home } from "./components/Home";
import { Earn } from "./components/Earn";
import WebApp from "@twa-dev/sdk";
import { MeUser, UserData } from "./constant/user";
import axios from "axios";
import { setCookie } from "nookies";

const defaultUserData: UserData = {
  id: 6789952150,
  username: "drianksz",
  language_code: "",
  is_premium: false,
};


export default function Page() {
  const [Page, setPage] = useState("Home");
  const [userData, setUserData] = useState<UserData>(defaultUserData);  
  const [userDetails, setUserDetails] = useState<MeUser | null>(null);


   const RegisterLogin = async () => {
     const formData = {
       tele_id: String(userData?.id),
       name: String(userData?.username),
       email: "",
       region: "",
     };

     try {
       const response = await axios.post(
         "https://api2.fingo.co.id/api/user",
         formData,
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );

       console.log(response.data.data);
       setUserDetails(response.data.data);
       setCookie(null, "token", response.data.data.token, {
         maxAge: 3 * 60 * 60,
         path: "/",
       });

       if (response.data.status == true) {
        //  console.log(response.data.data.daily_status);
        //  if (response.data.data.daily_status == false) {
        //    setModalOpen((prevState) => ({
        //      ...prevState,
        //      modalDaily: true,
        //    }));
        //  } else if (response.data.data.daily_status == true) {
        //    setModalOpen((prevState) => ({
        //      ...prevState,
        //      modalPermission: true,
        //    }));
        //  }

        //  setDailyCount(response.data.data.daily_count);
        //  setCount(response.data.data.coin);
        //  setIsLogin(true);
       }
     } catch (error) {
       console.error("Error Login:", error);
     }
   };


     useEffect(() => {
       WebApp.ready();
       WebApp.expand();

       if (WebApp.initDataUnsafe.user) {
        //  setStartParam(WebApp.initDataUnsafe.start_param || "");
         setUserData(WebApp.initDataUnsafe.user as UserData);
         console.log(userData)
         RegisterLogin();
       }

       // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [userData?.id, userData]);



  return (
    <div className="h-[calc(100vh-4.5rem)]">
      <div>
        {Page === "Home" && <Home userDetails={userDetails} />}
        {Page === "Earn" && <Earn />}
        {Page === "Leaderboards" && <Leaderboards />}
        {Page === "Profile" && <Profile />}
      </div>

      <Navbar Page={Page} setPage={setPage} />
    </div>
  );
}
