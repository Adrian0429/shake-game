"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import bg from "../../../public/logo1.png";
import Image from "next/image";
import Header from "./Navigation/Header";
import { parseCookies } from "nookies";

interface Task {
  task_id: string;
  title: string;
  link?: string;
  reward: number;
  Users: any;
}

interface TasksProps {
  userId: number;
  onTaskClear: () => void; // Add this prop
}

const Tasks = ({ userId, onTaskClear }: TasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to fetch tasks
  const refreshTasks = useCallback(async () => {
    const cookies = parseCookies();
    try {
      const response = await axios.get(
        "https://api2.fingo.co.id/api/user/tasks",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
          }
        }
      );

      console.log("API Response:", response.data); // Log the response to debug

      const fetchedTasks = response.data.data?.data || [];
      setTasks(fetchedTasks); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [userId]);

  // Fetch tasks on component mount and when userId changes
  useEffect(() => {
    refreshTasks();
  }, [userId, refreshTasks]);

  const clearTask = async (task_Id: string) => {
    const formData = new FormData(); 
    formData.append("task_id", task_Id); 

    const cookies = parseCookies();
    try {
      const response = await axios.post(
        "https://api2.fingo.co.id/api/user/task",
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form submitted successfully", response.data);
      if (response.data.status === true) {
        refreshTasks();
        onTaskClear();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <Header text="Shake Project" />
      <div className="flex flex-col items-center mt-5">
        <h2 className="text-H2 text-white">Do The Task</h2>
        <p className="mt-2 text-B2 text-white">
          Complete your task, Claim your rewards!
        </p>

        <div className="w-[90%] h-[60vh] overflow-y-scroll mt-10 space-y-3">
          {tasks.map((task) => (
            <div
              key={task.task_id}
              className="flex flex-row justify-between h-16 bg-[#232328] rounded-full px-5 py-1 items-center"
            >
              <div className="flex flex-row w-full space-x-3">
                <Image
                  src={bg}
                  alt=""
                  height={30}
                  width={30}
                  className="w-[50px] h-full"
                />
                <div className="flex flex-col text-white">
                  <p>{task.title}</p>
                  <p>+ {task.reward} Coins</p>
                </div>
              </div>
              <div>
                <div
                  className="w-24 h-8 bg-[#D5FF18]  cursor-pointer select-none
                active:translate-y-2  active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
                active:border-b-[0px]
                transition-all duration-150 [box-shadow:0_5px_0_0_#ABC340,0_8px_0_0_#ffffff]
                rounded-full  border-[1px] border-[#D5FF18] mb-3"
                >
                  <Link
                    onClick={() => clearTask(task.task_id)}
                    href={""}
                    className="flex justify-center items-center h-full text-black font-bold text-base"
                  >
                    Claim
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
