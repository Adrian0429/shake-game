import React, { useEffect, useState } from 'react'
import bg from '../assets/user.png'
import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';
import OffCanvasEmail from './Offcanvas/OffCanvasEmail';
import OffCanvasRegion from './Offcanvas/OffCanvasRegion';
import axios from 'axios';
import { parseCookies } from 'nookies';
import OffCanvasExchange from './Offcanvas/OffCanvasExchange';

interface UserData {
  tele_id: string;
  name: string;
  email: string;
  region: string;
  energy: number;
  coins: number;
  referral_code: string;
  exchange: string;
}

export const Profile = () => {
      const [isOffcanvasEmailVisible, setIsOffcanvasEmailVisible] = useState(false);
      const [isOffcanvasRegionVisible, setIsOffcanvasRegionVisible] = useState(false);
      const [isOffcanvasEchangeVisible, setIsOffcanvasEchangeVisible] =
        useState(false);
      const [userDetails, setUserDetails] = useState<UserData | null>(null);

      const fetchUserData = async () => {
        try {
          const cookies = parseCookies();
          const response = await axios.get(
            "https://api2.fingo.co.id/api/user/me",
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );

          setUserDetails(response.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
    useEffect(() => {

      fetchUserData();
    }, []);

  return (
    <>
      <div className="h-[calc(100vh-4.5rem)] w-full py-8 px-5 bg-white">
        <div className="flex flex-col items-center w-full">
          <Image
            src={bg}
            alt="user"
            width={60}
            height={60}
            className="rounded-full"
          />
          <p className="text-xl font-semibold mt-3">{userDetails?.name}</p>
        </div>

        <div className="bg-[#17181A] grid grid-rows-3 text-white rounded-3xl mt-5 p-8">
          <button
            onClick={() => {
              if (!userDetails?.region) {
                setIsOffcanvasEmailVisible(true);
              }
            }}
            className="flex flex-row justify-between items-center py-4"
          >
            <div className="flex flex-col space-y-1 text-start">
              <p className="text-md font-normal">Email</p>
              <p className="text-sm font-light">
                {userDetails?.email || "No Email Yet"}
              </p>
            </div>
            {userDetails?.email ? null : <FaChevronRight />}
          </button>

          <button
            onClick={() => {
              if (!userDetails?.region) {
                setIsOffcanvasRegionVisible(true);
              }
            }}
            className="flex flex-row justify-between items-center py-4"
          >
            <div className="flex flex-col space-y-1 text-start">
              <p className="text-md font-normal">Country</p>
              <p className="text-sm font-light">
                {userDetails?.region || "No Country Yet"}
              </p>
            </div>
            {userDetails?.email ? null : <FaChevronRight />}
          </button>

          <button
            className="flex flex-row justify-between items-center py-4"
            onClick={() => {
              if (!userDetails?.exchange) {
                setIsOffcanvasEchangeVisible(true);
              }
            }}
          >
            <div className="flex flex-col space-y-1 text-start">
              <p className="text-md font-normal">Exchange</p>
              <p className="text-sm font-light">
                {userDetails?.exchange || "No Exchange Yet"}
              </p>
            </div>
            {userDetails?.exchange ? null : <FaChevronRight />}
          </button>
        </div>
      </div>

      <OffCanvasEmail
        onSuccess={() => {
          fetchUserData();
          setIsOffcanvasEmailVisible(false);
        }}
        isVisible={isOffcanvasEmailVisible}
        onClose={() => setIsOffcanvasEmailVisible(false)}
      />
      <OffCanvasRegion
        onSuccess={() => {
          fetchUserData();
          setIsOffcanvasRegionVisible(false);
        }}
        isVisible={isOffcanvasRegionVisible}
        onClose={() => setIsOffcanvasRegionVisible(false)}
      />
      <OffCanvasExchange
        onSuccess={() => {
          fetchUserData();
          setIsOffcanvasEchangeVisible(false);
        }}
        isVisible={isOffcanvasEchangeVisible}
        onClose={() => setIsOffcanvasEchangeVisible(false)}
      />
    </>
  );
}

