"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { FaBitcoin, FaTasks, FaUser } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";


interface HeaderProps {
  maxEnergy: number;
  curEnergy: number;
}

export default function Header({ maxEnergy, curEnergy }: HeaderProps) {
  const pathname = usePathname();

  return (
    <div className="w-screen h-[4rem]">
      <div className="grid h-full grid-cols-3 mx-auto">
        <div className="border flex justify-center items-center">
          <FaBoltLightning className="text-xl text-yellow-400 mr-2" />
          <span className="text-sm font-medium">
            {curEnergy} / {maxEnergy}
          </span>
        </div>
        <div className="border p-3">
          <button className="border rounded-lg w-full h-full bg-blue-500 ">
            Normal
          </button>
        </div>
        <div className="border flex flex-col justify-center items-center">
          <div className="flex flex-row">
            <FaBitcoin className="text-2xl mr-2 text-yellow-400" />
            <p>per shake</p>
          </div>
          <div className="flex flex-row">
            <p>1</p>
            <FaBitcoin className="text-2xl ml-2 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
