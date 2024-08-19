"use client";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import countries from "@/app/constant/Country";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserData = {
  telegramID: number;
}

const Register = (telegramID : UserData) => {
  const [isClient, setIsClient] = useState(false);
  const [SelectedCountry, setSelectedCountry] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;


  const login = async () => {
    try {
      const response = await axios.post("/api/user/login", {
        tele_id: telegramID,
      });

      if (response.status === 200 && response.data.success) {
        console.log("Login successful:", response.data);
      } else {
        router.push("?modal=true");
      }
    } catch (error) {
      console.error("Login error:", error);
      router.push("?modal=true");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      email: e.currentTarget.email.value,
      region: SelectedCountry,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user",
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

  return (
    <>
      <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center">
        <div className="relative flex flex-col items-center mx-auto p-8 bg-white min-h-[300px] w-[85%] rounded-lg z-100">
          <h1 className="text-xl font-bold my-4 text-center">
            Welcome To The Best Shaking Game Ever!
          </h1>
          <form className="w-full h-full">
            <div className="w-full my-3">
              <label className="text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="user@gmail.com"
              />
            </div>

            {/* Dropdown */}
            <div className="relative inline-flex flex-col w-full mt-2">
              <p className="text-sm font-medium mb-2 text-start">Region</p>
              <button
                type="button"
                className="py-3 px-2 inline-flex items-center gap-x-2 w-full text-sm font-medium rounded-lg border border-slate-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <p className="w-full ml-2 text-start">
                  {SelectedCountry || "Select Region"}
                </p>
                <FiChevronDown />
              </button>

              {isDropdownOpen && (
                <div className="absolute w-full mt-2 bg-white shadow-md rounded-lg p-1 z-50 max-h-[300px] overflow-y-auto">
                  {countries.map((country, index) => (
                    <a
                      key={index}
                      className="flex items-center my-1 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100"
                      href="#"
                      onClick={() => {
                        setSelectedCountry(country.code);
                        setIsDropdownOpen(false); // Close dropdown on selection
                      }}
                    >
                      {country.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button className="mt-5 border bg-blue-500 py-3 w-full rounded-lg text-white font-semibold">
              Confirm
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Register;
