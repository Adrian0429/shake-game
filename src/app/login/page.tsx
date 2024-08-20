"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import countries from "@/app/constant/Country";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import Link from "next/link";

interface Country {
  name: string;
  code: string;
}

interface UserData {
  id: number;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

function Page() {
  const [isClient, setIsClient] = useState(false);
  const [SelectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      tele_id: e.currentTarget.tele_id.value, // `User_TeleId` in struct
    };

    console.log("Submitting form with data:", formData);

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

      console.log("Form submitted successfully", response.data);
      if (response.data.status === true) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center">
        <div className="relative flex flex-col items-center mx-auto p-8 bg-white min-h-[300px] w-[85%] rounded-lg z-100">
          <h1 className="text-xl font-bold my-4 text-center">
            LOGIN To The Best Shaking Game Ever!
          </h1>
          <form onSubmit={handleSubmit} className="w-full h-full">
            <div className="w-full my-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium mb-2">Email</label>
                <span className="block mb-2 text-sm text-red-500">
                  Optional
                </span>
              </div>
              <input
                type="text"
                id="tele_id"
                required={true}
                value={userData?.id}
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              />
            </div>

            <div className="w-full my-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium mb-2">Email</label>
              </div>
              <input
                type="text"
                id="name"
                required={true}
                value={userData?.username}
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              />
            </div>

            <button
              type="submit"
              className="mt-5 border bg-blue-500 py-3 w-full rounded-lg text-white font-semibold"
            >
              Confirm
            </button>

            <Link href={"/register"} className="mt-2 text-sm text-blue-500">
              Register?
            </Link>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Page;
