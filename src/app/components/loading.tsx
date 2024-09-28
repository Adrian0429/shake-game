"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import bg from "../../../public/logo1.png";
import Image from "next/image";
import Header from "./Navigation/Header";
import { parseCookies } from "nookies";
import { FaCheckCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useRouter } from "next/navigation";


interface TasksProps {
}

const Loading = () => {
  return (
    <div className="w-full h-full py-5">
      <div className="flex h-[calc(100vh-4.5rem)] items-center justify-center">
        <h1>Loading ... </h1>
      </div>
    </div>
  );
};

export default Loading;
