"use client"
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { FaTasks, FaUser } from 'react-icons/fa';

const Footerdata = [
  {
    name: "Home",
    icon: (
      <HiHome className="text-2xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    link: "/",
  },
  {
    name: "Tasks",
    icon: (
      <FaTasks className="text-2xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    link: "/tasks",
  },
  {
    name: "Profile",
    icon: (
      <FaUser className="text-2xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
    ),
    link: "/profile",
  },
];

export default function FooterNav() {
    const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-[4rem] bg-white border-t border-gray-200 dark:bg-black dark:border-gray-900">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        {Footerdata.map((item, index) => {
          const isActive = pathname === item.link;

          return (
            <Link
              href={item.link}
              key={index}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <div
                className={`${
                  isActive
                    ? "text-blue-600 dark:text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                } text-2xl mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-500`}
              >
                {item.icon}
              </div>
              <span
                className={`${
                  isActive
                    ? "text-blue-600 dark:text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                } text-sm group-hover:text-blue-600 dark:group-hover:text-blue-500`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
