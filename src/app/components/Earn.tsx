
import React, { useEffect, useState } from 'react'
import { TbCoin, TbUserUp } from 'react-icons/tb';
import { IoCopy } from 'react-icons/io5';
import OffCanvasEarn from './Offcanvas/OffCanvasEarn';
import { MdCurrencyBitcoin } from 'react-icons/md';
import { parseCookies } from 'nookies';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MeUser } from '../constant/user';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

interface Earn {
  task_id: string;
  title: string;
  link: string | null;
  reward: number;
  cleared: boolean;
}

interface TaskListAuto {
  task_id: string;
  title: string;
  count: number;
  reward: number;
  cleared: boolean;
}

interface TasksResponse {
  data: Earn[];
  task: TaskListAuto[];
}


type Referral = {
  user_name: string;
  level: number;
  coins: number;
};

type ReferralsResponse = {
  status: boolean;
  message: string;
  data: {
    total_coins: number;
    data: Referral[];
  };
};

export const Earn = () => {
    const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
    const [referrals, setReferrals] = useState<ReferralsResponse | null>(null);
    const [userDetails, setUserDetails] = useState<MeUser | null>(null);
    const referralCode = `t.me/BlockReadersTonBot/read?startapp=${userDetails?.id}`; 
    const [tasks, setTasks] = useState<TasksResponse>({ data: [], task: [] });

      const copyReferralCode = () => {
        navigator.clipboard
          .writeText(referralCode)
          .then(() => {
            toast.success("Referral code copied to clipboard!");
          })
          .catch(() => {
            toast.error("Failed to copy referral code");
          });
      };

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

              console.log(response.data.data);
              setUserDetails(response.data.data);
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          };

      const fetchReferrals = async () => {
        try {
          const cookies = parseCookies();
          const response = await axios.get<ReferralsResponse>(
            "https://api2.fingo.co.id/api/user/getreferraldata",
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );
          setReferrals(response.data);
        } catch (error) {
          console.log(error);
        }
      };

  // const claimCoins = async () => {
  //   try {
  //     const cookies = parseCookies();
  //     const response = await axios.get(
  //       "https://api2.fingo.co.id/api/user/claimReferral",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${cookies.token}`,
  //         },
  //       }
  //     );
  //     if (response.data.status === true) {
  //       toast.success("successfully Claimed!");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user referral coins:", error);
  //   }
  // };

  const GetTasks = async () => {
    try {
      const cookies = parseCookies();
      const response = await axios.get(
        "https://api2.fingo.co.id/api/user/earn",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (response.data.status === true && response.data.data) {
        setTasks({
          data: response.data.data.data || [],
          task: response.data.data.task || [],
        });
      } else {
        setTasks({ data: [], task: [] });
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks({ data: [], task: [] }); // Set fallback in case of error
    }
  };

  
const EarnClear = async (taskId: string) => {
  try {
    const cookies = parseCookies();
    const response = await axios.post(
      "https://api2.fingo.co.id/api/user/tasks/follow/clear",
      new URLSearchParams({ task_id: taskId }), // Use URLSearchParams to format as form data
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/x-www-form-urlencoded", // Set the correct content type
        },
      }
    );

    if (response.data.status === true) {
      toast.success("Task Cleared!");
      GetTasks(); // Refresh the tasks
    }
  } catch (error) {
    console.error("Error clearing task:", error);
    toast.error("Failed to clear task.");
  }
};


  
    useEffect(() => {
      fetchUserData();  
      fetchReferrals();
      GetTasks();
    }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-4.5rem)] w-full pt-8 bg-[#17181A] overflow-y-scroll pb-[4.5rem]">
        <div className="mx-5">
          <h2 className="text-2xl font-semibold text-white">Ajak Teman</h2>
          <p className="text-md font-light text-[#A6A6A6]">
            Undang lebih banyak, dapatkan bonus lebih besar!
          </p>
        </div>

        <div className="flex flex-row justify-between mx-5 items-center bg-[#404040] rounded-xl p-4 mt-5">
          <div className="flex flex-row space-x-5">
            <div className="rounded-lg p-3 bg-[#FDFDFF] w-fit">
              <TbCoin size={32} />
            </div>

            <div className="flex flex-col text-start text-[#FDFDFF]">
              <p className="text-lg font-normal">Poin Undangan</p>
              <p className="text-md font-light">
                + {referrals?.data.total_coins || 0}
              </p>
            </div>
          </div>

          {/* <button
            onClick={() => {
              claimCoins();
            }}
            className="px-5 py-2 h-fit bg-[#FDFDFF] text-black rounded-3xl"
          >
            Claim
          </button> */}
        </div>

        <p className="my-4 mx-5 text-[#CAEB45]">cara kerja</p>

        <div className="flex flex-col space-y-8 mx-5">
          <div className="flex flex-row items-center">
            <div className="rounded-full w-12 h-12 bg-[#404040] text-white text-2xl font-light flex items-center justify-center">
              1
            </div>
            <div className="flex flex-col">
              <p className="text-[#FDFDFF] ml-3 text-xl font-light">
                Bagikan tautan undangan anda
              </p>
              <p className="text-[#A6A6A6] ml-3 font-light">
                Ajak teman, dapatkan hadiah!
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center">
            <div className="rounded-full w-12 h-12 bg-[#404040] text-2xl font-light text-white flex items-center justify-center">
              2
            </div>
            <div className="flex flex-col">
              <p className="text-[#FDFDFF] ml-3 text-xl font-light">
                Dapatkan 10% dari teman anda
              </p>
              <p className="text-[#A6A6A6] ml-3 font-light">
                + 5% dari undangan mereka!
              </p>
            </div>
          </div>
        </div>

        <p className="my-4 text-[#CAEB45] mx-5">Daftar teman anda</p>

        <div className="h-[40%] rounded-3xl bg-[#404040] px-5 py-4 space-y-5 mx-5 flex flex-col justify-between">
          <div className="w-full h-[70%] overflow-y-scroll rounded-xl space-y-5">
            {referrals &&
            referrals.data &&
            referrals.data.data &&
            referrals.data.data.length > 0 ? (
              referrals.data.data.map((friend, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center"
                >
                  <div className="flex flex-col">
                    <p className="text-[#FDFDFF] ml-3 text-xl font-light">
                      {friend.user_name}
                    </p>
                    <div className="text-[#FDFDFF] ml-3 text-md font-light flex flex-row items-center space-x-2">
                      <TbUserUp />
                      <p>{friend.level}</p>
                    </div>
                  </div>

                  <p className="text-lg font-light text-[#FDFDFF]">
                    +{friend.coins} Poin
                  </p>
                </div>
              ))
            ) : (
              <p className="text-[#FDFDFF] text-center">
                Belum ada undangan...
              </p>
            )}
          </div>
          <div className="h-[30%] flex flex-row w-full justify-between space-x-4">
            <button
              onClick={() => {
                setIsOffcanvasVisible(true);
              }}
              className="w-full rounded-3xl bg-[#FDFDFF]"
            >
              Bagikan dengan teman
            </button>
            <button
              onClick={copyReferralCode}
              className="p-4 bg-[#CAEB45] rounded-2xl"
            >
              <IoCopy size={24} />
            </button>
          </div>
        </div>

        <div className="bg-white w-full fit text-white rounded-t-3xl mt-10 px-7 pt-7 pb-[1rem]">
          <h1 className="text-xl font-medium text-black">Tugas</h1>

          <div className="hidden flex-row justify-between items-center bg-[#17181A] rounded-xl p-4 mt-5">
            <div className="flex flex-row space-x-5">
              <div className="rounded-lg p-3 h-fit bg-[#FDFDFF] w-fit">
                <MdCurrencyBitcoin size={32} color="#17181A" />
              </div>

              <div className="flex flex-col text-start text-[#FDFDFF] justify-start my-auto">
                <p className="text-md font-normal">Hubungkan TON Wallet</p>
                <p className="text-xs font-light">+1000</p>
              </div>
            </div>

            <button
              onClick={() => {
                toast.success("connected!");
              }}
              className="px-5 py-2 h-fit bg-[#FDFDFF] text-black rounded-3xl"
            >
              Klaim
            </button>
          </div>

          <div className="w-full max-h-[35vh] mt-5 flex flex-col overflow-y-scroll flex-shrink-0 space-y-5">
            {[...tasks.data, ...tasks.task]
              .sort((a, b) => Number(a.cleared) - Number(b.cleared)) // Sort uncleared first
              .map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row w-full items-center justify-between px-5 py-2 border-b"
                >
                  <div className="flex flex-col text-black">
                    <p className="text-lg font-normal">{item.title}</p>
                    <p className="text-lg font-extralight">
                      + {item.reward} GULD
                    </p>
                  </div>
                  {item.cleared ? (
                    <div className="flex items-center justify-center bg-[#CAEB45] rounded-full p-2">
                      <FaCheckCircle className="text-black" />
                    </div>
                  ) : (
                    'link' in item && item.link && (
                      <Link
                        href={item.link}
                        onClick={() => {
                          EarnClear(item.task_id);
                        }}
                        target="_blank"
                        className="px-5 py-2 bg-black text-white rounded-3xl"
                      >
                        Buka
                      </Link>
                    )
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <OffCanvasEarn
        userId={String(userDetails?.tele_id ?? 0)}
        isVisible={isOffcanvasVisible}
        onClose={() => {
          setIsOffcanvasVisible(false);
        }}
      />
    </>
  );
}

