import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import logo from "../../../public/ShakeNoBg.png"
import Image from "next/image";
const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Follow Instagram",
    link: "https://instagram.com/_adriankaruna/",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is the second task",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is the third task",
    completed: false,
  },
];

const Mobile = () => {
  return (
    <div className="w-full h-full py-20 ">
      <div className="flex flex-col gap-y-4 items-center">
        <h2 className="text-H2">Change To Mobile</h2>

        <Image
          className="h-auto w-[80%] mt-3 mx-auto"
          src={logo}
          alt="Shake"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Mobile;
