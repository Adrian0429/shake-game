/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import bg from "../assets/bg.png";
import { MeUser, Task, UserData } from "../constant/user";
import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import WebApp from "@twa-dev/sdk";
import { FormProvider, useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";
import Link from "next/link";
import { LuYoutube } from "react-icons/lu";
import ModalDaily from "./Modals/ModalDaily";

type ClearRequest = {
  task_id: string;
  code: string;
};

  const defaultUserData: UserData = {
    id: 6789952150,
    username: "AnaknyaRudyJudy",
    language_code: "",
    is_premium: false,
  };

export const Home = () => {
  const [userData, setUserData] = useState<UserData>();
  const [userDetails, setUserDetails] = useState<MeUser | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Daily");
  const filters = ["Daily", "Weekly", "Monthly"];
  const currentTask = tasks && tasks.length > 0 ? tasks[currentIndex] : null;
  const [modalOpen, setModalOpen] = useState(false);
  const [startParam, setStartParam] = useState("");

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      tasks && prevIndex === tasks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      tasks && prevIndex === 0 ? tasks.length - 1 : prevIndex - 1
    );
  };

  const daily = () => {
    console.log("tutup");
    setModalOpen(false);
    update();
    fetchUserData();
  }

  
  const update = async () => {
    const cookies = parseCookies();

    try {
      await axios.post(
        "https://api2.fingo.co.id/api/user/daily",
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      toast.success("Daily Login !");
    } catch (error) {
      console.error("Error daily:", error);
    }
  };
  
  const RegisterLogin = async () => {
    const formData = {
      tele_id: String(userData?.id),
      name: String(userData?.username),
      email: "",
      region: "",
    };

    try {
      const response = await axios.post(
        "https://api2.fingo.co.id/api/user",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchTasks();
      setUserDetails(response.data.data);
      setCookie(null, "token", response.data.data.token, {
        maxAge: 3 * 60 * 60,
        path: "/",
      });
    } catch (error) {
      console.error("Error Login:", error);
    }
  };


  const postReferral = async () => {
    try {
      const cookies = parseCookies();
      const formData = {
        referred_id: String(userData?.id),
        referrer_id: String(startParam),
        name: String(userData?.username),
        email: "",
        region: "",
      };

      const response = await axios.post(
        `https://api2.fingo.co.id/api/user/referral`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      

      RegisterLogin();
    } catch (error) {
      RegisterLogin();
    }
  };

  const changeFilter = async (filter: string) => {
    console.log("changing filter to:", filter);
    setActiveFilter(filter);
  };

  useEffect(() => {
    const fetchFilteredTasks = async () => {
      try {
        const cookies = parseCookies();
        const response = await axios.get(
          `https://api2.fingo.co.id/api/task/user/${activeFilter}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        setTasks(response.data.data || []);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchFilteredTasks();
  }, [activeFilter]); 

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
          // console.log("user details", userDetails);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
  const fetchTasks = async () => {
    try {
      const cookies = parseCookies();
      const response = await axios.get(
        `https://api2.fingo.co.id/api/task/user/${activeFilter}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setTasks(response.data.data || []);
      console.log("tasks", tasks);
      console.log("current index", currentIndex);
      console.log("current task", currentTask);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  useEffect(() => {
    if (typeof window !== "undefined") {
      WebApp.ready();
      WebApp.expand();
      setUserData(WebApp.initDataUnsafe.user as UserData);
      setStartParam(WebApp.initDataUnsafe.start_param || "");
      if(userData?.id){
        if(startParam){
          postReferral();
        }
        else{
          RegisterLogin();
        }
      }

    }
  }, [userData?.id, userData]);

  useEffect(() => {
    if (userDetails && userDetails.daily_status === false) {
      setModalOpen(true);
    }
  }, [userDetails]);

  const methods = useForm<ClearRequest>({
    mode: "onChange",
  });

  const { handleSubmit, register, reset } = methods;

  const onSubmit = async (data: ClearRequest) => {
    reset();
    try {
      const cookies = parseCookies();
      const response = await axios.post(
        `https://api2.fingo.co.id/api/task/clear`,
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (response.data.status === true) {
        toast.success("successfully completed task!");
        fetchTasks();
        fetchUserData();
        setCurrentIndex(0);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Something went wrong");
      } else {
        console.log("Unexpected error:", error);
        toast.error("Unexpected error occurred");
      }
    }
  };

  return (
    <div
      className="h-[calc(100vh-4.5rem)] w-full py-8"
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="h-[25%] flex flex-col px-5 items-start">
        <div className="mt-auto">
          {/* <Image
            src={AppLogo}
            alt="app logo"
            className="h-16 w-16"
            height={200}
            width={200}
            priority
          /> */}
          <h3 className="text-lg font-light mt-4">Total Coins</h3>
          <div className="flex flex-row items-center space-x-5">
            <p className="text-5xl font-bold">{userDetails?.coins}</p>
            <p className="text-xl font-thin">Tokens</p>
          </div>
        </div>
      </div>

      <div className="h-[15%] w-[90%] bg-black rounded-2xl mx-auto grid grid-cols-3 py-5 mt-6 items-center text-white text-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-thin">Rewards</p>
          <p className="text-xl font-medium">{userDetails?.user_rewards}</p>
        </div>

        <div className="border-x flex flex-col items-center justify-center">
          <p className="text-sm font-thin">Earn</p>
          <p className="text-xl font-medium">{userDetails?.user_earn}</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-thin">Invites</p>
          <p className="text-xl font-medium">{userDetails?.user_ref}</p>
        </div>
      </div>

      <div className="flex w-full flex-col mt-5 overflow-x-scroll space-y-5">
        <div className="flex w-full justify-around px-2 font-medium">
          {/* button filter */}
          {filters.map((filter) => (
            <button
              key={filter}
              className={`border border-black rounded-3xl px-7 py-3 ${
                activeFilter === filter ? "bg-[#CAEB45] text-black" : ""
              }`}
              onClick={() => changeFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="w-full">
          {currentTask ? (
            <div className="py-5 bg-[#1F1F1E] rounded-t-lg flex flex-row justify-between items-center pb-[6rem]">
              <FaChevronLeft
                onClick={prevSlide}
                className="h-full w-fit px-2"
                size={26}
                color="white"
              />
              <div className="w-full">
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-center bg-[#404040] space-y-5 py-5 rounded-2xl mt-3"
                  >
                    <p className="text-center font-bold text-xl w-full text-white">
                      Enter your answer
                    </p>

                    <div className="relative w-[90%] rounded-lg ">
                      <input
                        type="text"
                        id="code"
                        className="block w-full p-4 text-sm text-gray-900 rounded-3xl bg-[#FDFDFF]"
                        placeholder="Enter code"
                        {...register("code", { required: true })}
                      />

                      <input
                        type="hidden"
                        value={currentTask?.id || ""}
                        {...register("task_id")}
                      />

                      <button
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        className="text-black absolute end-2.5 bottom-2 bg-[#CAEB45] font-medium rounded-3xl text-sm px-4 py-2"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </FormProvider>
                <div className="flex flex-col items-center justify-center bg-[#404040] space-y-5 py-5 px-5 rounded-2xl mt-3">
                  {currentTask && currentTask.link && (
                    <div className="w-full">
                      <img
                        alt={currentTask.title}
                        src={currentTask.link}
                        className="w-full h-48 rounded-xl object-cover"
                      />
                    </div>
                  )}

                  {currentTask && currentTask.video && (
                    <div className="flex flex-col justify-center mt-5 w-full">
                      <p className="text-white text-center text-B2 font-semibold">
                        Click to watch the video
                      </p>
                      <Link
                        target="blank"
                        href={currentTask.video}
                        className="h-48 w-full bg-red-500 rounded-xl"
                      >
                        <LuYoutube className="w-full h-full text-white" />
                      </Link>
                    </div>
                  )}

                  <p className="text-md w-full text-green-500 font-normal">
                    + {currentTask?.reward} Tokens
                  </p>
                  <h1 className="w-full font-bold text-2xl text-white">
                    {currentTask?.title}
                  </h1>
                  <div
                    className="rich-text-content list-disc list-inside text-justify text-white mt-5 font-thin w-full"
                    dangerouslySetInnerHTML={{
                      __html: currentTask?.description || "",
                    }}
                  />
                </div>
              </div>
              <FaChevronRight
                onClick={nextSlide}
                className="h-full w-fit px-2"
                size={26}
                color="white"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-[#404040] space-y-5 py-5 px-5 mx-5 rounded-2xl mt-3">
              <p className="text-center font-bold text-xl text-white">
                No task available
              </p>
            </div>
          )}
        </div>
      </div>
      <ModalDaily
        username={userData?.username || ""}
        daily_count={userDetails?.daily_count || 0}
        isOpen={modalOpen}
        onClose={() => {
          daily();
        }}
      />
    </div>
  );
};
