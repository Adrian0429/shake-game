"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import OffCanvasTask from "@/app/components/offcanvas/OffCanvasTask";
import { LuYoutube } from "react-icons/lu";
import { parseCookies } from "nookies";
import bg from '../../../public/Bg.png'

type Task = {
  id: number;
  title: string;
  description: string;
  reward: number;
  link: string;
  code: string;
  video: string;
};

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const cookies = parseCookies();
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
  }, []);

  const toggleOffcanvas = (task:Task) => {
    setSelectedTask(task);
    setIsOffcanvasVisible(!isOffcanvasVisible);
  };

  return (
    <div
      className="flex h-screen w-screen"
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
      }}
    >
      <div className="flex flex-col h-[calc(100vh-4.5rem)] w-full items-center">
        <div className="w-[90%] h-[calc(100vh-10rem)] overflow-y-scroll mt-5 space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-row justify-between h-16 bg-[#232328] rounded-full px-5 py-1 items-center"
            >
              <div className="flex flex-row w-full space-x-3">
                <div className="flex flex-col text-white">
                  <p>{task.title}</p>
                  <p>+ {task.reward} Coins</p>
                </div>
              </div>

              <div
                onClick={() => toggleOffcanvas(task)}
                className="w-24 h-8 bg-[#D5FF18] cursor-pointer select-none
                  active:translate-y-2  active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
                  active:border-b-[0px]
                  transition-all duration-150 [box-shadow:0_5px_0_0_#ABC340,0_8px_0_0_#ffffff]
                  rounded-full  border-[1px] border-[#D5FF18] mb-3"
              >
                <LuYoutube className="w-full h-full text-black" />
              </div>
              {selectedTask && (
                <OffCanvasTask
                  userId={123123}
                  task={selectedTask}
                  isVisible={isOffcanvasVisible}
                  onClose={() => setIsOffcanvasVisible(false)} // Ensure the canvas can be closed
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
