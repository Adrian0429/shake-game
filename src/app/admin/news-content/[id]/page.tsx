"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { parseCookies } from "nookies";
import Link from "next/link";
import { LuYoutube } from "react-icons/lu";
import toast from "react-hot-toast";

// Define the Task type
type Task = {
  new_task_id: number;
  title: string;
  description: string;
  reward: number;
  link: string;
  code: string;
  video: string;
  category: string;
  created_at: string;
  updated_at: string;
  DeletedAt: string | null;
};

export default function DataPage() {
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams(); 

  const DeleteTask = async () => {
    try {
      const cookies = parseCookies();
      await axios.delete(
        `https://api2.fingo.co.id/api/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.adminJwt}`, // Use a public env variable here
          },
        }
      );
        toast.success("Task deleted successfully");
        window.location.href = "/admin/news-content";
        fetchTaskData();
    } catch (err) {
      console.error("Error fetching task data:", err);
      setError("Failed to fetch task data");
    }
  };

    const fetchTaskData = async () => {
      try {
        const cookies = parseCookies();
        const response = await axios.get(
          `https://api2.fingo.co.id/api/task/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.adminJwt}`, // Use a public env variable here
            },
          }
        );
        setTask(response.data.data);
      } catch (err) {
        console.error("Error fetching task data:", err);
        setError("Failed to fetch task data");
      }
    };
  useEffect(() => {
    fetchTaskData();
  }, [task]);

  if (error) {
    return (
      <div className="flex w-full justify-center p-5">
        <h1>{error}</h1>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex w-full justify-center p-5">
        <h1>Loading...</h1>
      </div>
    );
  }

  // Render the task details
  return (
    <div className="flex flex-col h-screen items-center bg-gray-800 space-y-6 py-6 px-5 shadow-lg">
      <h1 className="font-bold text-3xl text-white text-center">
        {task?.title || "Task Title"}
      </h1>

      <div className="text-center text-white">
        <div
          className="rich-text-content list-disc list-inside text-justify text-white mt-5 font-thin w-full"
          dangerouslySetInnerHTML={{
            __html: task?.description || "",
          }}
        />
        <p className="text-lg font-semibold text-green-400">
          + {task?.reward || 0} Tokens
        </p>
      </div>

      {task?.link && (
        <div className="w-full mb-4">
          <img
            alt={task.title}
            src={task.link}
            className="w-full h-48 rounded-xl object-cover shadow-md"
          />
        </div>
      )}

      {task?.video && (
        <div className="flex flex-col justify-center w-full mt-5">
          <p className="text-center text-white font-semibold mb-2">
            Watch Video
          </p>
          <Link
            target="_blank"
            href={task.video}
            className="w-full h-48 flex items-center justify-center bg-red-600 rounded-xl shadow-lg"
          >
            <LuYoutube className="text-white text-5xl" />
          </Link>
        </div>
      )}

      <div className="text-center text-white mt-5">
        <p className="text-sm font-thin">
          Category: {task?.category || "General"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Created: {new Date(task?.created_at).toLocaleDateString() || "N/A"}
        </p>
      </div>

      <button
        onClick={DeleteTask}
        className="w-full bg-red-600 text-white rounded-lg py-3 mt-5"
      >
        delete
      </button>
    </div>
  );
}
