"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for navigation
import toast from "react-hot-toast";
type Task = {
  task_id: string;
  title: string;
  count: number;
  reward: number;
};

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const cookies = parseCookies();
        const token = cookies.adminJwt;

        const response = await axios.get(
          "https://api2.fingo.co.id/api/user/tasks/referral",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched tasks:", response.data); // Log the response data
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks()
  }, [router]);

  // Function to handle task deletion
  const handleDeleteTask = async (taskId: string) => {
    try {
      const cookies = parseCookies();
      const token = cookies.adminJwt;

      const response = await axios.delete(
        `https://api2.fingo.co.id/api/user/tasks/referral/delete/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === true) {
        toast.success("Task deleted successfully!");
        setTasks(tasks.filter((task) => task.task_id !== taskId)); // Remove deleted task from state
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen p-5">
      <h1 className="text-2xl font-bold">Referral Tasks</h1>
      <Link
        href="/admin/referral/create"
        className="mt-5 bg-blue-500 text-white p-2 rounded"
      >
        Create New Task
      </Link>
      <div className="mt-5 space-y-4">
        {tasks.map((task) => (
          <div
            key={task.task_id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <h2 className="text-xl">{task.title}</h2>
              <p className="text-gray-500">
                {task.count}
              </p>
              <p className="text-lg">Reward: {task.reward} Tokens</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleDeleteTask(task.task_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
