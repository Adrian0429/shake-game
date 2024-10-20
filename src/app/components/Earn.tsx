import React, { useState } from 'react'
import Offcanvas from './Offcanvas/OffCanvas';
import { TbCoin } from 'react-icons/tb';
import { IoCopy } from 'react-icons/io5';
import { FaUserGroup } from 'react-icons/fa6';
import OffCanvasEarn from './Offcanvas/OffCanvasEarn';

const friends = [
    { name: "Alice", points: 200, referrals: 5 },
    { name: "Bob", points: 150, referrals: 5 },
    { name: "Charlie", points: 300, referrals: 5 },
    { name: "David", points: 250, referrals: 5 },
    { name: "Eve", points: 100, referrals: 5 },
];

export const Earn = () => {
    const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);

  return (
    <>
      <div className="h-[calc(100vh-4.5rem)] w-full py-8 px-5 bg-[#17181A]">


        <h2 className="text-2xl font-semibold text-white">Refer a friend</h2>
        <p className="text-md font-light text-[#A6A6A6]">
          Invite More, get even more bonuses!
        </p>

        <div className="flex flex-row justify-between items-center bg-[#404040] rounded-xl p-4 mt-5">
          <div className="flex flex-row space-x-5">
            <div className="rounded-lg p-3 bg-[#FDFDFF] w-fit">
              <TbCoin size={32} />
            </div>

            <div className="flex flex-col text-start text-[#FDFDFF]">
              <p className="text-lg font-normal">Referral Points</p>
              <p className="text-md font-light">+1000</p>
            </div>
          </div>

          <button
            onClick={() => {
              alert("dapet coy");
            }}
            className="px-5 py-2 h-fit bg-[#FDFDFF] text-black rounded-3xl"
          >
            Claim
          </button>
        </div>

        <p className="my-4 text-[#CAEB45]">how it works</p>

        <div className="flex flex-col space-y-8">
          <div className="flex flex-row items-center">
            <div className="rounded-full w-12 h-12 bg-[#404040] text-white text-2xl font-light flex items-center justify-center">
              1
            </div>
            <div className="flex flex-col">
              <p className="text-[#FDFDFF] ml-3 text-xl font-light">
                Share your invitation link
              </p>
              <p className="text-[#A6A6A6] ml-3 font-light">
                Invite friends get rewards!
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center">
            <div className="rounded-full w-12 h-12 bg-[#404040] text-2xl font-light text-white flex items-center justify-center">
              2
            </div>
            <div className="flex flex-col">
              <p className="text-[#FDFDFF] ml-3 text-xl font-light">
                Score 10% from buddies
              </p>
              <p className="text-[#A6A6A6] ml-3 font-light">
                + 5% from their referrals
              </p>
            </div>
          </div>
        </div>

        <p className="my-4 text-[#CAEB45]">list of your friends</p>

        <div className="w-full h-[35%] rounded-3xl bg-[#404040] px-5 py-4 space-y-5">
          <div className="w-full h-[70%] overflow-y-scroll rounded-xl space-y-5">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center"
              >
                <div className="flex flex-col">
                  <p className="text-[#FDFDFF] ml-3 text-xl font-light">
                    {friend.name}
                  </p>
                  <div className="text-[#FDFDFF] ml-3 text-md font-light flex flex-row items-center space-x-2">
                    <FaUserGroup />
                    <p>+{friend.referrals}</p>
                  </div>
                </div>

                <p className="text-lg font-light text-[#FDFDFF]">
                  +{friend.points} Points
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full justify-between space-x-4">
            <button
              onClick={() => {
                setIsOffcanvasVisible(true);
              }}
              className="w-full rounded-3xl bg-[#FDFDFF]"
            >
              Share with friends
            </button>
            <button className="p-4 bg-[#CAEB45] rounded-2xl">
              <IoCopy size={24} />
            </button>
          </div>
        </div>
      </div>

      <OffCanvasEarn
        userId={123123}
        isVisible={isOffcanvasVisible}
        onClose={() => {
          setIsOffcanvasVisible(false);
        }}
      />
    </>
  );
}

