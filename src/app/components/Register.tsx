"use client";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiAlertTriangle, FiChevronDown, FiX } from "react-icons/fi";
import countries from "@/app/constant/Country";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { Telemetry } from "next/dist/telemetry/storage";

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

function Register() {
  const [isClient, setIsClient] = useState(false);
  const [SelectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  const login = async () => {
    try {
      const response = await axios.post("https://api2.fingo.co.id/api/user/login", {
        tele_id: userData?.id,
      });

      if (response.status === 200 && response.data.success) {
        console.log("Login successful:", response.data);
      } else {

      }
    } catch (error) {
      console.error("Login error:", error);
      router.push("?modal=true");
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = {
    tele_id: userData?.id, // `User_TeleId` in struct
    name: userData?.username, // `User_Name` in struct
    email: e.currentTarget.email.value, // `User_Email` in struct
    region: SelectedCountry?.name, // `User_Region` in struct
  };
  console.log(formData);
  try {
    const response = await axios.post(
      "https://api2.fingo.co.id/api/user",
      formData
    );
    
    
    console.log("Form submitted successfully", response.data);

    if (response.status === 200 && response.data.success) {
      login();
    } else {
      console.log("Error submitting form:", response.data);
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
              Welcome To The Best Shaking Game Ever !
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
                  type="email"
                  id="email"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="user@gmail.com"
                />
              </div>

              <input
                type="text"
                value={userData?.id}
                name="tele_id"
                className="hidden"
              />
              <input
                type="text"
                value={userData?.username}
                name="name"
                className="hidden"
              />
              <input
                type="text"
                value={SelectedCountry?.code}
                name="region"
                className="hidden"
              />

              {/* dropdown */}
              <div className="z-10 hs-dropdown relative inline-flex flex-col w-full mt-2">
                <p className="text-sm font-medium mb-2 text-start">Region</p>
                <button
                  id="hs-dropdown-default"
                  type="button"
                  className="hs-dropdown-toggle py-3 px-2 inline-flex items-center gap-x-2 w-full text-sm font-medium rounded-lg border border-slate-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <p className="w-full ml-2 text-start">
                    {SelectedCountry?.name || "Select Region"}
                  </p>
                  <FiChevronDown />
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] max-h-[300px] overflow-y-scroll duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg p-1 mt-2 after:h-4 after:absolute z-30 after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:start-0 before:w-full"
                  aria-labelledby="hs-dropdown-default"
                >
                  {countries.map((country, index) => (
                    <a
                      key={index}
                      className="flex items-center my-1 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      href="#"
                      onClick={() => setSelectedCountry(country)}
                    >
                      {country.name}
                    </a>
                  ))}
                  <input
                    type="text"
                    value={SelectedCountry?.code}
                    className="hidden"
                  />
                </div>
              </div>

              <button type="submit" className="mt-5 border bg-blue-500 py-3 w-full rounded-lg text-white font-semibold">
                Confirm
              </button>
            </form>
          </div>
        </dialog>
    </>
  );
}

export default Register;
