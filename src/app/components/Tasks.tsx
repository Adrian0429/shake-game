"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Task {
  task_id: string;
  title: string;
  link?: string;
  Users: any;
}

interface TasksProps {
  userId: number;
}

const Tasks = ({ userId }: TasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://api2.fingo.co.id/api/user/tasks?tele_id=6789952150"
        );

        console.log("API Response:", response.data); // Log the response to debug

        const fetchedTasks = response.data.data?.data || [];
        setTasks(fetchedTasks); // Set the tasks from the nested data array
        console.log("Tasks:", fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleTaskClick = async (task_Id: string) => {

     const formData = {
       task_id: task_Id,
       tele_id: String(userId), // `User_TeleId` in struct
     };

      console.log(formData);
    try {
      const response = await axios.post(
        // "https://api2.fingo.co.id/api/user/task",
        "http://127.0.0.1:8888/api/user/task",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(formData);
      console.log("Form submitted successfully", response.data);
      if (response.data.status == true) {
        alert("Task completed successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-full h-full py-20">
      <div className="flex flex-col gap-y-4 items-center">
        {userId}
        <h2 className="text-H1 dark:text-white">Daily Tasks</h2>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.task_id} className="w-[80%]">
              <h2 className="text-H3 dark:text-white text-slate-900">
                {task.title}
              </h2>
              <div className="flex flex-row justify-between items-center bg-blue-500 rounded-lg w-full px-4 h-16 mt-2">
                <p className="text-S1 dark:text-white text-slate-900">
                  {task.title}
                </p>
                {task.link && (
                  <a target="_blank" href={task.link}
                    onClick={() => handleTaskClick(task.task_id)}
                    className="text-S2 px-5 py-3 bg-blue-800 rounded-lg text-white dark:text-slate-900"
                  >
                    GO
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-S1 dark:text-white text-slate-900">
            No tasks available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
