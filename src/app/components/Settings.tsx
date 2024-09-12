"use client";
import shake from "../../../public/shakerboy.png"
import Image from "next/image";
import bg from "../../../public/logo1.png";
import Header from "./Navigation/Header";
import { FaChevronRight, FaCopy } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="w-full h-full flex flex-col items-center py-10">
      <div className="mb-5">
        <Image
          src={bg}
          width={100}
          height={100}
          alt=""
          className="w-16 h-16 rounded-full my-3"
        />
        <p className="text-center">Steve</p>
        <p className="text-center">@realsteve</p>
      </div>

      <div className="w-[90%] flex flex-col space-y-3 mt-3">
        <div className="flex flex-row justify-between">
          <p>Country</p>
          <div className="flex flex-row items-center space-x-5">
            There&apos;s no country yet
            <FaChevronRight />
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <p>Email</p>
          <div className="flex flex-row items-center space-x-5">
            No Email Yet
            <FaChevronRight />
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <p>Exchange</p>
          <div className="flex flex-row items-center space-x-5">
            There's no exchanges yet
            <FaChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
