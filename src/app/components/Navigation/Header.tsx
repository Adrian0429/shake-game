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
    <div className="w-screen h-[4.5rem]">
      <div className="grid h-full grid-cols-3 mx-auto mt-5">
        <div className="">
          <div className="h-[90%] w-[90%] flex justify-center items-center mx-auto rounded-xl bg-slate-900">
            <FaBoltLightning className="text-xl text-yellow-400 mr-2" />
            <span className="text-sm font-medium">
              {curEnergy} / {maxEnergy}
            </span>
          </div>
        </div>
        <div className="">
          <div className="h-[90%] w-[90%] flex justify-center items-center mx-auto rounded-xl bg-slate-900">
            <span className="text-S1 font-medium">Normal</span>
          </div>
        </div>
        <div className="">
          <div className="h-[90%] w-[90%] flex flex-col justify-between p-1 items-center mx-auto rounded-xl bg-slate-900">
            <div className="flex flex-row">
              <FaBitcoin className="text-xl mr-2 text-yellow-400" />
              <p>per shake</p>
            </div>
            <div className="flex flex-row">
              <p>1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
