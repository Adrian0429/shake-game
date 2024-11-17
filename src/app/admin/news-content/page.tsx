"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Task = {
  new_task_id: number;
  title: string;
  description: string;
  reward: number;
  link: string;
  code: string;
  video: string;
};

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const router = useRouter();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const cookies = parseCookies();
        if (!cookies.adminJwt) {
          router.push("/admin/login");
        }
        const response = await axios.get("https://api2.fingo.co.id/api/task", {
          headers: {
            Authorization: `Bearer ${cookies.adminJwt}`,
          },
        });
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [router]);

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col h-[calc(100vh-4.5rem)] w-full items-center py-5 ">
        <Link
          className="bg-blue-500 text-white py-4 w-[90%] rounded-xl text-center"
          href={"/admin/news-content/create"}
        >
          Create New Task
        </Link>
        <div className="w-[90%] h-[calc(100vh-10rem)] overflow-y-scroll mt-5 space-y-3">
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => (
              <Link
                href={`/admin/news-content/${task.new_task_id}`}
                key={index}
                className="flex flex-row justify-between h-16 bg-[#232328] rounded-full px-5 py-1 items-center"
              >
                <div className="flex flex-row w-full space-x-3">
                  <div className="flex flex-col text-white">
                    <p>{task.title}</p>
                    <p>+ {task.reward} Coins</p>
                  </div>
                </div>

                <button className="px-5 py-3 bg-red-500 rounded-xl">
                  Delete
                </button>
              </Link>
            ))
          ) : (
            <p className="text-black">No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
