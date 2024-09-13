"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import logo from "../../../../public/logo1.png"
import { FaBitcoin, FaTasks, FaUser } from "react-icons/fa";
import Image from "next/image";
import { SiBitcoinsv } from "react-icons/si";
import { text } from "stream/consumers";


interface HeaderProps {
  coins?: number;
  text?: string;
}

export default function Header({ coins, text }: HeaderProps) {
  const pathname = usePathname();

  return (
    <div className="w-screen h-[4.5rem] flex justify-between mx-auto mt-5 items-center space-x-5 px-5">
      <div className="flex w-[25%] justify-center items-center mx-auto">
        <Image src={logo} alt="" height={50} width={50} />
      </div>
      {coins && (
        <div className="w-full flex justify-center items-center mx-auto rounded-full bg-[#232328] py-4 px-2">
          <span className="text-S1 font-bold flex flex-row items-center space-x-3">
            <SiBitcoinsv className="text-[#E0FD60]" />
            <p className="text-S2 text-white">{coins} Shake Points</p>
          </span>
        </div>
      )}

      {text && (
        <div className="w-full flex justify-center items-center mx-auto rounded-full bg-[#232328] py-4 px-2">
          <span className="text-S1 font-bold flex flex-row items-center space-x-3">
            <p className="text-S1 text-white">{text}</p>
          </span>
        </div>
      )}
      <div className="flex w-[25%] justify-center items-center mx-auto">
        <Image src={logo} alt="" height={50} width={50} />
      </div>
    </div>
  );
}
