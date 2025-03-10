"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import { HiMiniTrophy } from "react-icons/hi2";
import { RiHome5Fill } from "react-icons/ri";
import { TbCoinFilled } from "react-icons/tb";

// Footer data with icons
const Footerdata = [
  {
    name: "Beranda",
    icon: <RiHome5Fill className="text-2xl mb-1 group-hover:text-black" />,
  },
  {
    name: "Earn",
    icon: <TbCoinFilled className="text-2xl mb-1 group-hover:text-black" />,
  },
  {
    name: "Leaderboards",
    icon: <HiMiniTrophy className="text-2xl mb-1 group-hover:text-black" />,
  },
  {
    name: "Profile",
    icon: <FaUser className="text-2xl mb-1 group-hover:text-black" />,
  },
];


export const Navbar = ({
  Page,
  setPage,
}: {
  Page: string;
  setPage: (name: string) => void;
}) => {
  return (
    <div className="fixed bottom-0 left-0 z-30 w-full h-[4.5rem] bg-white">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium bg-transparent">
        {Footerdata.map((item, index) => {
          const isActive = Page === item.name; // Check if the current page is active
          return (
            <button
              onClick={() => setPage(item.name)} // Update the page when clicked
              key={index}
              className="inline-flex flex-col items-center justify-center px-5"
            >
              <div
                className={`${
                  isActive ? "text-black" : "text-gray-400"
                } text-2xl mb-1 group-hover:text-black`}
              >
                {item.icon}
              </div>
              <span
                className={`${
                  isActive ? "text-black" : "text-gray-500"
                } text-sm group-hover:text-black`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
