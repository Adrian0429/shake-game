import React from 'react'
import bg from '../assets/user.png'
import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';


export const Profile = () => {
  return (
    <div className="h-[calc(100vh-4.5rem)] w-full py-8 px-5">
      <div className="flex flex-col items-center w-full">
        <Image
          src={bg}
          alt="user"
          width={60}
          height={60}
          className="rounded-full"
        />
        <p className="text-lg font-semibold mt-3">@Username</p>
      </div>

      <div className="bg-[#17181A] grid grid-rows-3 text-white rounded-3xl mt-5 p-8">

        <div className="flex flex-row justify-between items-center py-4">
          <div className="flex flex-col space-y-1">
            <p className="text-md font-normal">Email</p>
            <p className="text-sm font-light">No Email Yet</p>
          </div>
          <FaChevronRight />
        </div>

        <div className="flex flex-row justify-between items-center py-4">
          <div className="flex flex-col space-y-1">
            <p className="text-md font-normal">Country</p>
            <p className="text-sm font-light">No Country Yet</p>
          </div>
          <FaChevronRight />
        </div>

        <div className="flex flex-row justify-between items-center py-4">
          <div className="flex flex-col space-y-1">
            <p className="text-md font-normal">Exchange</p>
            <p className="text-sm font-light">No Exchange Yet</p>
          </div>
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
}

