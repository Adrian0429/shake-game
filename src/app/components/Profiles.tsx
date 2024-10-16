"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface UserData {
  tele_id: string;
  name: string;
  email: string;
  region: string;
  energy: number;
  coins: number;
  referral_code: string;
}

interface ProfilesProps {
  userData: {
    id: number;
    username?: string;
    language_code: string;
    is_premium?: boolean;
  };
  onTaskClear: () => void;
}

const Profiles = ({ userData, onTaskClear }: ProfilesProps) => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [referralCodeInput, setReferralCodeInput] = useState<string>(""); // Add state for input value

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://api2.fingo.co.id/api/user/me",
          {
            params: { tele_id: String(userData.id) },
          }
        );

        setUserDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userData.id]);

  const referralCode = userDetails?.referral_code || "N/A"; // Use actual referral code from fetched data

  const handleCopy = () => {
    navigator.clipboard
      .writeText(referralCode)
      .then(() => {
        console.log("Referral code copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy referral code: ", err);
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      tele_id: String(userData.id),
      referral_code: referralCodeInput, // Use the state variable
    };

    try {
      const response = await axios.post(
        "https://api2.fingo.co.id/api/user/referralClaim",
        formData
      );

      console.log("Form submitted successfully", response.data);
      alert("Referral Claimed Successfully");
      onTaskClear();
      setReferralCodeInput(""); // Clear the form input
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full py-20 px-5">
      <h1 className="text-H2 w-full text-center">Profile User</h1>
      <ul className="text-S2 mt-5">
        <li>User ID: {userData?.id}</li>
        <li>Username: {userDetails?.name || userData?.username || "N/A"}</li>
        <li>Email: {userDetails?.email || "N/A"}</li>
        <li>Region: {userDetails?.region || "N/A"}</li>
      </ul>

      <h2 className="text-H3 mt-10">Referral Code</h2>
      <div className="w-full mt-2 bg-blue-500 dark:bg-slate-900/80 flex px-4 justify-between items-center rounded-md border-2 border-dashed border-blue-900 dark:border-slate-700 h-16">
        <p>{referralCode}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-blue-700 dark:bg-slate-950 px-5 py-3 rounded-md"
        >
          Copy
        </button>
      </div>

      <h2 className="text-H3 mt-4">Redeem Referral Code</h2>
      <form
        onSubmit={handleSubmit}
        className="flex mt-2 flex-row h-16 bg-blue-600 rounded-lg items-center"
      >
        <input
          type="text"
          placeholder="Enter Referral Code"
          id="referral_code"
          value={referralCodeInput} // Bind input to state variable
          onChange={(e) => setReferralCodeInput(e.target.value)} // Update state on input change
          className="w-full h-full rounded-l-lg placeholder:text-white text-white px-4 bg-blue-600"
        />
        <button
          type="submit"
          className="bg-primary rounded-r-lg px-5 h-full text-white bg-slate-900"
        >
          Redeem
        </button>
      </form>
    </div>
  );
};

export default Profiles;
