import React from 'react'
import bg from '../../../public/bg.png'
const data = [
    {
        name: "Home",
        rewards: 150,
    },
    {
        name: "Earn",
        rewards: 150,
    },
    {
        name: "Leaderboards",
        rewards: 150,
    },
    {
        name: "Profile",
        rewards: 150,
    },
    {
        name: "Home",
        rewards: 150,
    },
    {
        name: "Earn",
        rewards: 150,
    },
    {
        name: "Leaderboards",
        rewards: 150,
    },
    {
        name: "Profile",
        rewards: 150,
    }
];

export const Earn = () => {
  return (
    <div
      className="h-[calc(100vh-4.5rem)] w-full border border-red-800 py-8 px-5"
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="h-[25%] flex flex-col justify-center space-y-5">
        <h3 className="text-lg font-light">Total Coins</h3>
        <div className="flex flex-row items-center space-x-5">
          <p className="text-5xl font-bold">1,823,343</p>
          <p className="text-xl font-thin">Tokens</p>
        </div>
      </div>

      <div className="h-[15%] w-[90%] bg-black rounded-2xl mx-auto grid grid-cols-3 py-8 items-center text-white text-center">
        <div className="flex flex-col ">
          <p className="text-sm font-thin">Rewards</p>
          <p className="text-xl font-medium">+ 10,000</p>
        </div>

        <div className="border-x flex flex-col">
          <p className="text-sm font-thin">Rewards</p>
          <p className="text-xl font-medium">+ 10,000</p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-thin">Invites</p>
          <p className="text-xl font-medium">+ 100</p>
        </div>
      </div>

      <div className="w-full flex flex-row overflow-x-scroll space-x-5 mt-3">
        {data.map((item, index) => (
          <button
            key={index}
            className="flex items-center justify-center px-5 py-2 border rounded-3xl bg-[#CAEB45]"
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="h-[50%] mt-5 overflow-y-scroll">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-row w-full items-center justify-between px-5 py-2 border-b "
          >
            <div className='flex flex-col'>
                <p className='text-lg font-normal'>{item.name}</p>
                <p className='text-lg font-extralight'>{item.rewards}</p>
            </div>
            <button className='px-5 py-2 bg-black text-white rounded-3xl'>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}

